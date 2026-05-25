// Mock data for demo purposes
export const MOCK_USERS = {
  student: {
    id: 'student-1',
    auth_user_id: 'auth-student-1',
    role: 'student' as const,
    full_name: 'Arjun Sharma',
    roll_number: 'STU001',
    grade: 10,
    section: 'A',
    class_id: 'class-9',
    email: 'arjun@school.edu',
    avatar_url: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  juniorStudent: {
    id: 'student-2',
    auth_user_id: 'auth-student-2',
    role: 'student' as const,
    full_name: 'Priya Patel',
    roll_number: 'STU002',
    grade: 4,
    section: 'B',
    class_id: 'class-4',
    email: 'priya@school.edu',
    avatar_url: 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  teacher: {
    id: 'teacher-1',
    auth_user_id: 'auth-teacher-1',
    role: 'teacher' as const,
    full_name: 'Mrs. Kavitha Reddy',
    email: 'kavitha@school.edu',
    avatar_url: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  parent: {
    id: 'parent-1',
    auth_user_id: 'auth-parent-1',
    role: 'parent' as const,
    full_name: 'Mr. Rajesh Sharma',
    student_id: 'student-1',
    email: 'rajesh@gmail.com',
    avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  admin: {
    id: 'admin-1',
    auth_user_id: 'auth-admin-1',
    role: 'admin' as const,
    full_name: 'Dr. Suresh Kumar',
    email: 'admin@school.edu',
    avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
};

export const MOCK_ATTENDANCE = [
  { date: '2026-05-19', status: 'present' },
  { date: '2026-05-16', status: 'present' },
  { date: '2026-05-15', status: 'absent' },
  { date: '2026-05-14', status: 'present' },
  { date: '2026-05-13', status: 'present' },
  { date: '2026-05-12', status: 'late' },
  { date: '2026-05-09', status: 'present' },
  { date: '2026-05-08', status: 'present' },
  { date: '2026-05-07', status: 'present' },
  { date: '2026-05-06', status: 'excused' },
];

export const MOCK_HOMEWORK = [
  { id: 'hw1', title: 'Chapter 5: Quadratic Equations', subject: 'Mathematics', due_date: '2026-05-21', priority: 'high', status: 'pending' },
  { id: 'hw2', title: 'Essay on Climate Change', subject: 'English', due_date: '2026-05-22', priority: 'medium', status: 'submitted' },
  { id: 'hw3', title: 'Newton\'s Laws Problems', subject: 'Physics', due_date: '2026-05-20', priority: 'high', status: 'pending' },
  { id: 'hw4', title: 'Draw Cell Diagram', subject: 'Biology', due_date: '2026-05-23', priority: 'low', status: 'submitted' },
  { id: 'hw5', title: 'Map of India Rivers', subject: 'Geography', due_date: '2026-05-24', priority: 'medium', status: 'pending' },
];

export const MOCK_TIMETABLE = [
  { day: 'Monday', periods: [
    { time: '8:00–8:45', subject: 'Mathematics', teacher: 'Mr. Gupta', room: 'R-101' },
    { time: '8:45–9:30', subject: 'English', teacher: 'Mrs. Singh', room: 'R-101' },
    { time: '9:30–10:15', subject: 'Physics', teacher: 'Dr. Nair', room: 'Lab-2' },
    { time: '10:15–10:30', subject: 'Break', teacher: '', room: '' },
    { time: '10:30–11:15', subject: 'Chemistry', teacher: 'Mrs. Reddy', room: 'Lab-1' },
    { time: '11:15–12:00', subject: 'History', teacher: 'Mr. Iyer', room: 'R-101' },
    { time: '12:00–12:45', subject: 'Lunch', teacher: '', room: '' },
    { time: '12:45–1:30', subject: 'Biology', teacher: 'Ms. Sharma', room: 'R-202' },
    { time: '1:30–2:15', subject: 'Computer', teacher: 'Mr. Patel', room: 'Lab-3' },
  ]},
  { day: 'Tuesday', periods: [
    { time: '8:00–8:45', subject: 'Physics', teacher: 'Dr. Nair', room: 'Lab-2' },
    { time: '8:45–9:30', subject: 'Mathematics', teacher: 'Mr. Gupta', room: 'R-101' },
    { time: '9:30–10:15', subject: 'English', teacher: 'Mrs. Singh', room: 'R-101' },
    { time: '10:15–10:30', subject: 'Break', teacher: '', room: '' },
    { time: '10:30–11:15', subject: 'History', teacher: 'Mr. Iyer', room: 'R-101' },
    { time: '11:15–12:00', subject: 'Biology', teacher: 'Ms. Sharma', room: 'R-202' },
    { time: '12:00–12:45', subject: 'Lunch', teacher: '', room: '' },
    { time: '12:45–1:30', subject: 'Chemistry', teacher: 'Mrs. Reddy', room: 'Lab-1' },
    { time: '1:30–2:15', subject: 'P.E.', teacher: 'Mr. Joshi', room: 'Ground' },
  ]},
];

export const MOCK_NOTICES = [
  { id: 'n1', title: 'Annual Sports Day 2026', content: 'Annual Sports Day will be held on June 10th. All students must participate. Registration open till May 30th.', category: 'sports', is_pinned: true, created_at: '2026-05-18' },
  { id: 'n2', title: 'Term Exam Schedule Released', content: 'Term 2 examinations will begin from June 15th. Timetable available in the admin office and school website.', category: 'academic', is_pinned: true, created_at: '2026-05-17' },
  { id: 'n3', title: 'Holiday Notice: Eid', content: 'School will remain closed on June 7th on account of Eid al-Adha. Classes resume June 9th.', category: 'holiday', is_pinned: false, created_at: '2026-05-16' },
  { id: 'n4', title: 'New Library Books Arrived', content: 'The school library has received 500+ new books across all subjects. Students can borrow from May 20th.', category: 'general', is_pinned: false, created_at: '2026-05-15' },
  { id: 'n5', title: 'Parent-Teacher Meeting', content: 'PTM scheduled for May 31st from 9 AM to 1 PM. All parents are requested to attend.', category: 'event', is_pinned: false, created_at: '2026-05-14' },
];

export const MOCK_QUIZZES = [
  {
    id: 'q1',
    title: 'Daily GK Quiz #42',
    category: 'General Knowledge',
    difficulty: 'medium',
    questions: [
      { id: 1, question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1 },
      { id: 2, question: 'Who wrote the play "Romeo and Juliet"?', options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'], correct: 1 },
      { id: 3, question: 'What is the chemical symbol for Gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correct: 2 },
      { id: 4, question: 'Which country is the largest by area?', options: ['China', 'USA', 'Canada', 'Russia'], correct: 3 },
      { id: 5, question: 'What is the speed of light (approx)?', options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10⁴ m/s', '3×10¹⁰ m/s'], correct: 0 },
    ],
    points_per_question: 10,
    time_limit_seconds: 300,
  },
  {
    id: 'q2',
    title: 'Science Special #15',
    category: 'Science',
    difficulty: 'hard',
    questions: [
      { id: 1, question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], correct: 2 },
      { id: 2, question: 'What does DNA stand for?', options: ['Deoxyribonucleic Acid', 'Dynamic Nuclear Acid', 'Double Nucleic Acid', 'Deoxyribose Nuclear Acid'], correct: 0 },
      { id: 3, question: 'What is the atomic number of Carbon?', options: ['6', '8', '12', '14'], correct: 0 },
    ],
    points_per_question: 15,
    time_limit_seconds: 180,
  },
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Riya Mehta', class: '10A', points: 1850, streak: 21, avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=60', badge: 'diamond' },
  { rank: 2, name: 'Arjun Sharma', class: '10A', points: 1720, streak: 14, avatar: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=60', badge: 'platinum' },
  { rank: 3, name: 'Sneha Kapoor', class: '9B', points: 1640, streak: 12, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60', badge: 'gold' },
  { rank: 4, name: 'Dev Joshi', class: '11A', points: 1520, streak: 9, avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=60', badge: 'gold' },
  { rank: 5, name: 'Ananya Singh', class: '10B', points: 1380, streak: 7, avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=60', badge: 'silver' },
  { rank: 6, name: 'Kabir Nair', class: '11B', points: 1290, streak: 5, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60', badge: 'silver' },
  { rank: 7, name: 'Pooja Verma', class: '9A', points: 1150, streak: 4, avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=60', badge: 'bronze' },
  { rank: 8, name: 'Aditya Kumar', class: '12A', points: 1050, streak: 3, avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60', badge: 'bronze' },
];

export const MOCK_REWARDS = [
  { id: 'r1', title: 'Quiz Champion', description: 'Scored 100% in 5 consecutive quizzes', badge_type: 'gold', icon: '🏆', points: 200, category: 'academic', earned_at: '2026-05-15' },
  { id: 'r2', title: 'Streak Master', description: 'Maintained a 14-day quiz streak', badge_type: 'platinum', icon: '🔥', points: 350, category: 'quiz', earned_at: '2026-05-12' },
  { id: 'r3', title: 'Perfect Attendance', description: 'Full month attendance - April 2026', badge_type: 'silver', icon: '⭐', points: 150, category: 'attendance', earned_at: '2026-05-01' },
  { id: 'r4', title: 'Science Star', description: 'Topped the Science Quiz', badge_type: 'gold', icon: '🔬', points: 100, category: 'academic', earned_at: '2026-04-20' },
  { id: 'r5', title: 'Sports Achiever', description: '1st place in District Athletics', badge_type: 'diamond', icon: '🏃', points: 500, category: 'sports', earned_at: '2026-04-15' },
  { id: 'r6', title: 'Helping Hand', description: 'Participated in 3 community activities', badge_type: 'bronze', icon: '🤝', points: 75, category: 'social', earned_at: '2026-04-10' },
];

export const MOCK_ACTIVITIES = [
  { id: 'a1', title: 'Annual Science Fair', description: 'Present your science projects and experiments', category: 'science', event_date: '2026-06-05', registration_deadline: '2026-05-28', max_participants: 100, participants: 67 },
  { id: 'a2', title: 'Inter-School Debate', description: 'State-level debate competition on current affairs', category: 'literary', event_date: '2026-06-12', registration_deadline: '2026-05-25', max_participants: 30, participants: 18 },
  { id: 'a3', title: 'Dance & Music Festival', description: 'Annual cultural extravaganza', category: 'cultural', event_date: '2026-06-20', registration_deadline: '2026-06-10', max_participants: 200, participants: 89 },
  { id: 'a4', title: 'Basketball Tournament', description: 'Inter-class basketball championship', category: 'sports', event_date: '2026-06-08', registration_deadline: '2026-05-30', max_participants: 80, participants: 52 },
  { id: 'a5', title: 'Painting Competition', description: 'Theme: India of My Dreams', category: 'arts', event_date: '2026-06-15', registration_deadline: '2026-06-05', max_participants: 50, participants: 31 },
  { id: 'a6', title: 'Green Earth Drive', description: 'Tree plantation and environment awareness', category: 'social', event_date: '2026-06-05', registration_deadline: '2026-05-31', max_participants: 500, participants: 234 },
];

export const MOCK_EVENTS = [
  { id: 'e1', title: 'Annual Sports Day', event_type: 'sports', start_date: '2026-06-10', location: 'School Ground', description: 'Grand Annual Sports Event' },
  { id: 'e2', title: 'Science Exhibition', event_type: 'academic', start_date: '2026-06-05', location: 'School Hall', description: 'Student Science Projects' },
  { id: 'e3', title: 'Summer Vacation Begins', event_type: 'holiday', start_date: '2026-06-25', end_date: '2026-07-10', location: '', description: 'Summer holidays' },
  { id: 'e4', title: 'Cultural Fest', event_type: 'cultural', start_date: '2026-06-20', location: 'Auditorium', description: 'Annual cultural program' },
  { id: 'e5', title: 'Term 2 Exams Begin', event_type: 'academic', start_date: '2026-06-15', end_date: '2026-06-22', location: 'Classrooms', description: 'Final term examinations' },
];

export const MOCK_STUDENT_STATS = {
  attendance_percentage: 92,
  homework_completion: 85,
  quiz_score_avg: 78,
  rank_in_class: 5,
  total_students: 40,
  total_points: 1720,
  current_streak: 14,
  activities_participated: 4,
  monthly_attendance: [
    { month: 'Jan', percentage: 95 }, { month: 'Feb', percentage: 88 },
    { month: 'Mar', percentage: 92 }, { month: 'Apr', percentage: 97 },
    { month: 'May', percentage: 90 },
  ],
  quiz_performance: [
    { week: 'W1', score: 65 }, { week: 'W2', score: 72 },
    { week: 'W3', score: 78 }, { week: 'W4', score: 85 },
    { week: 'W5', score: 90 },
  ],
  subject_scores: [
    { subject: 'Math', score: 88 }, { subject: 'Science', score: 92 },
    { subject: 'English', score: 75 }, { subject: 'History', score: 82 },
    { subject: 'Computer', score: 95 },
  ],
};

export const DEMO_CREDENTIALS = [
  { role: 'Admin', id: 'admin@school.edu', password: 'admin123', label: 'Admin Login' },
  { role: 'Teacher', id: 'teacher@school.edu', password: 'teacher123', label: 'Teacher Login' },
  { role: 'Student', id: 'STU001', password: 'student123', label: 'Student/Parent (Roll: STU001)' },
];
