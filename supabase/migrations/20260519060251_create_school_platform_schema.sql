/*
  # Smart School Management Platform - Core Schema

  Creates all tables for the school management platform including students, teachers,
  attendance, homework, timetable, quizzes, rewards, activities, events, and notifications.

  Security: RLS enabled on all tables with role-based access.
*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Classes
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  grade integer NOT NULL,
  section text NOT NULL DEFAULT 'A',
  academic_year text NOT NULL DEFAULT '2025-26',
  is_junior boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "classes_select" ON classes FOR SELECT TO authenticated USING (true);

-- Subjects
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL,
  class_id uuid REFERENCES classes(id),
  teacher_id uuid,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subjects_select" ON subjects FOR SELECT TO authenticated USING (true);

-- User Profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('student', 'teacher', 'parent', 'admin')),
  full_name text NOT NULL,
  email text,
  phone text,
  avatar_url text,
  roll_number text UNIQUE,
  class_id uuid REFERENCES classes(id),
  student_id uuid,
  grade integer,
  section text,
  date_of_birth date,
  address text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_own_select" ON user_profiles FOR SELECT TO authenticated USING (auth.uid() = auth_user_id);
CREATE POLICY "profiles_own_update" ON user_profiles FOR UPDATE TO authenticated USING (auth.uid() = auth_user_id) WITH CHECK (auth.uid() = auth_user_id);
CREATE POLICY "profiles_admin_select" ON user_profiles FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role = 'admin'));
CREATE POLICY "profiles_teacher_select" ON user_profiles FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role = 'teacher'));
CREATE POLICY "profiles_parent_student_select" ON user_profiles FOR SELECT TO authenticated USING (role = 'student' AND EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role = 'parent' AND u.student_id = id));
CREATE POLICY "profiles_insert" ON user_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = auth_user_id);

-- Attendance
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES user_profiles(id),
  class_id uuid REFERENCES classes(id),
  date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'excused')),
  marked_by uuid REFERENCES user_profiles(id),
  notes text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "attendance_student_select" ON attendance FOR SELECT TO authenticated USING (student_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "attendance_parent_select" ON attendance FOR SELECT TO authenticated USING (student_id IN (SELECT p.student_id FROM user_profiles p WHERE p.auth_user_id = auth.uid() AND p.role = 'parent' AND p.student_id IS NOT NULL));
CREATE POLICY "attendance_teacher_all" ON attendance FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('teacher', 'admin'))) WITH CHECK (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('teacher', 'admin')));

-- Homework
CREATE TABLE IF NOT EXISTS homework (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject_id uuid REFERENCES subjects(id),
  class_id uuid REFERENCES classes(id),
  assigned_by uuid REFERENCES user_profiles(id),
  due_date date NOT NULL,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  attachments jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
CREATE POLICY "homework_student_select" ON homework FOR SELECT TO authenticated USING (class_id IN (SELECT u.class_id FROM user_profiles u WHERE u.auth_user_id = auth.uid()) OR EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('teacher', 'admin')));
CREATE POLICY "homework_teacher_insert" ON homework FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('teacher', 'admin')));
CREATE POLICY "homework_teacher_update" ON homework FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('teacher', 'admin'))) WITH CHECK (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('teacher', 'admin')));

-- Timetable
CREATE TABLE IF NOT EXISTS timetable (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES classes(id),
  subject_id uuid REFERENCES subjects(id),
  teacher_id uuid REFERENCES user_profiles(id),
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
  start_time time NOT NULL,
  end_time time NOT NULL,
  room text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE timetable ENABLE ROW LEVEL SECURITY;
CREATE POLICY "timetable_select" ON timetable FOR SELECT TO authenticated USING (true);

-- Notices
CREATE TABLE IF NOT EXISTS notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text DEFAULT 'general' CHECK (category IN ('general', 'academic', 'event', 'holiday', 'urgent', 'sports')),
  target_audience text[] DEFAULT ARRAY['all'],
  published_by uuid REFERENCES user_profiles(id),
  is_pinned boolean DEFAULT false,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notices_select" ON notices FOR SELECT TO authenticated USING (true);
CREATE POLICY "notices_insert" ON notices FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('teacher', 'admin')));

-- Quizzes
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  difficulty text DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  grade_min integer DEFAULT 1,
  grade_max integer DEFAULT 12,
  questions jsonb NOT NULL DEFAULT '[]',
  points_per_question integer DEFAULT 10,
  time_limit_seconds integer DEFAULT 300,
  is_active boolean DEFAULT true,
  scheduled_date date,
  created_by uuid REFERENCES user_profiles(id),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "quizzes_select" ON quizzes FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "quizzes_admin_all" ON quizzes FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('admin', 'teacher'))) WITH CHECK (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('admin', 'teacher')));

-- Quiz Attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id),
  student_id uuid REFERENCES user_profiles(id),
  score integer DEFAULT 0,
  total_questions integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  time_taken_seconds integer DEFAULT 0,
  answers jsonb DEFAULT '[]',
  completed_at timestamptz DEFAULT now()
);
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "attempts_student_select" ON quiz_attempts FOR SELECT TO authenticated USING (student_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "attempts_student_insert" ON quiz_attempts FOR INSERT TO authenticated WITH CHECK (student_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "attempts_teacher_select" ON quiz_attempts FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('teacher', 'admin')));

-- Student Streaks
CREATE TABLE IF NOT EXISTS student_streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES user_profiles(id) UNIQUE,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_quiz_date date,
  total_quizzes integer DEFAULT 0,
  total_points integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE student_streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "streaks_select" ON student_streaks FOR SELECT TO authenticated USING (true);
CREATE POLICY "streaks_insert" ON student_streaks FOR INSERT TO authenticated WITH CHECK (student_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "streaks_update" ON student_streaks FOR UPDATE TO authenticated USING (student_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid())) WITH CHECK (student_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()));

-- Rewards
CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES user_profiles(id),
  title text NOT NULL,
  description text,
  badge_type text DEFAULT 'bronze' CHECK (badge_type IN ('bronze', 'silver', 'gold', 'platinum', 'diamond')),
  icon text DEFAULT '🏆',
  points integer DEFAULT 0,
  category text DEFAULT 'academic',
  earned_at timestamptz DEFAULT now()
);
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rewards_select" ON rewards FOR SELECT TO authenticated USING (true);
CREATE POLICY "rewards_insert" ON rewards FOR INSERT TO authenticated WITH CHECK (true);

-- Activities
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text DEFAULT 'sports' CHECK (category IN ('sports', 'arts', 'science', 'cultural', 'literary', 'social')),
  event_date date,
  registration_deadline date,
  max_participants integer,
  class_filter text[] DEFAULT ARRAY['all'],
  created_by uuid REFERENCES user_profiles(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "activities_select" ON activities FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "activities_admin_all" ON activities FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('admin', 'teacher'))) WITH CHECK (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('admin', 'teacher')));

-- Activity Participation
CREATE TABLE IF NOT EXISTS activity_participation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id uuid REFERENCES activities(id),
  student_id uuid REFERENCES user_profiles(id),
  status text DEFAULT 'registered' CHECK (status IN ('registered', 'participated', 'won', 'runner_up')),
  points_earned integer DEFAULT 0,
  registered_at timestamptz DEFAULT now()
);
ALTER TABLE activity_participation ENABLE ROW LEVEL SECURITY;
CREATE POLICY "participation_student_select" ON activity_participation FOR SELECT TO authenticated USING (student_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "participation_student_insert" ON activity_participation FOR INSERT TO authenticated WITH CHECK (student_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "participation_teacher_all" ON activity_participation FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('teacher', 'admin'))) WITH CHECK (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('teacher', 'admin')));

-- Events
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_type text DEFAULT 'school' CHECK (event_type IN ('school', 'sports', 'cultural', 'academic', 'holiday')),
  start_date date NOT NULL,
  end_date date,
  location text,
  created_by uuid REFERENCES user_profiles(id),
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events_select" ON events FOR SELECT TO authenticated USING (is_public = true);
CREATE POLICY "events_admin_all" ON events FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('admin', 'teacher'))) WITH CHECK (EXISTS (SELECT 1 FROM user_profiles u WHERE u.auth_user_id = auth.uid() AND u.role IN ('admin', 'teacher')));

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id),
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'alert', 'quiz', 'reward')),
  is_read boolean DEFAULT false,
  action_url text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications_select" ON notifications FOR SELECT TO authenticated USING (user_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "notifications_update" ON notifications FOR UPDATE TO authenticated USING (user_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid())) WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "notifications_insert" ON notifications FOR INSERT TO authenticated WITH CHECK (true);

-- Seed: Demo Classes
INSERT INTO classes (name, grade, section, is_junior) VALUES
  ('Class 1A', 1, 'A', true),
  ('Class 2B', 2, 'B', true),
  ('Class 3A', 3, 'A', true),
  ('Class 4B', 4, 'B', true),
  ('Class 5A', 5, 'A', true),
  ('Class 6B', 6, 'B', false),
  ('Class 7A', 7, 'A', false),
  ('Class 8B', 8, 'B', false),
  ('Class 9A', 9, 'A', false),
  ('Class 10B', 10, 'B', false),
  ('Class 11A (Science)', 11, 'A', false),
  ('Class 12B (Commerce)', 12, 'B', false)
ON CONFLICT DO NOTHING;
