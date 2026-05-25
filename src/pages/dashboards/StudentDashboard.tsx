import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { Calendar, BookOpen, Trophy, Zap, Star, TrendingUp, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Flame, Brain } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_STUDENT_STATS, MOCK_HOMEWORK, MOCK_NOTICES, MOCK_REWARDS } from '../../lib/mockData';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import clsx from 'clsx';

const priorityColor: Record<string, string> = {
  high: 'danger', medium: 'warning', low: 'success'
};

// Junior dashboard component
function JuniorDashboard({ user }: { user: { full_name: string; grade?: number } }) {
  const navigate = useNavigate();
  const navItems = [
    { icon: '📚', label: 'Homework', path: '/homework', color: 'from-sky-400 to-sky-500' },
    { icon: '📅', label: 'Timetable', path: '/timetable', color: 'from-emerald-400 to-emerald-500' },
    { icon: '🧠', label: 'Quiz Time!', path: '/quiz', color: 'from-amber-400 to-amber-500' },
    { icon: '🏆', label: 'My Rewards', path: '/rewards', color: 'from-rose-400 to-rose-500' },
    { icon: '⭐', label: 'Leaderboard', path: '/leaderboard', color: 'from-violet-400 to-violet-500' },
    { icon: '📢', label: 'Notices', path: '/notices', color: 'from-cyan-400 to-cyan-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl gradient-kids p-6 text-white"
      >
        <div className="relative z-10">
          <div className="text-5xl mb-2">🌟</div>
          <h1 className="text-3xl font-bold">Hey {user.full_name.split(' ')[0]}! 👋</h1>
          <p className="text-white/80 mt-1 text-lg">Ready to learn something awesome today?</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Flame size={18} /> <span className="font-bold">5 Day Streak! 🔥</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Star size={18} /> <span className="font-bold">Class {user.grade}</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-8 -top-8 text-[120px] opacity-20">🎒</div>
      </motion.div>

      {/* Big Icon Nav */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {navItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(item.path)}
            className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-white shadow-md flex flex-col items-center gap-3`}
          >
            <span className="text-5xl">{item.icon}</span>
            <span className="font-bold text-lg">{item.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Today's Homework */}
      <Card>
        <h3 className="text-lg font-bold text-slate-800 mb-4">📖 Today's Homework</h3>
        <div className="space-y-3">
          {MOCK_HOMEWORK.slice(0, 3).map(hw => (
            <div key={hw.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <span className="text-2xl">{hw.status === 'submitted' ? '✅' : '📝'}</span>
              <div className="flex-1">
                <p className="font-semibold text-slate-700">{hw.title}</p>
                <p className="text-sm text-slate-500">{hw.subject} • Due {hw.due_date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Star rewards */}
      <Card>
        <h3 className="text-lg font-bold text-slate-800 mb-4">⭐ My Stars</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-amber-500">47</div>
            <p className="text-sm text-slate-500 mt-1">Total Stars</p>
          </div>
          <div className="flex-1 grid grid-cols-5 gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className={clsx('text-3xl text-center', i < 4 ? 'opacity-100' : 'opacity-30')}
              >⭐</motion.div>
            ))}
          </div>
        </div>
        <div className="mt-4 bg-amber-50 rounded-xl p-3 text-sm text-amber-700 font-medium">
          🎯 Get 3 more stars to unlock a new badge!
        </div>
      </Card>
    </div>
  );
}

// Senior dashboard component
function SeniorDashboard({ user }: { user: { full_name: string; grade?: number } }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Good Morning, {user.full_name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 mt-1">Class {user.grade} • Academic Year 2025-26</p>
        </div>
        <button
          onClick={() => navigate('/quiz')}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-sm font-semibold hover:bg-amber-100 transition-colors"
        >
          <Flame size={16} /> 14-Day Streak!
        </button>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Attendance" value="92%" icon={<Calendar size={20} />} change="This month" gradient="gradient-primary" delay={0} />
        <StatCard title="Homework Done" value="85%" icon={<BookOpen size={20} />} change="+5% this week" gradient="gradient-success" delay={0.1} />
        <StatCard title="Quiz Avg." value="78%" icon={<Brain size={20} />} change="+8% vs last week" gradient="gradient-warning" delay={0.2} />
        <StatCard title="Class Rank" value="#5" icon={<Trophy size={20} />} change="of 40 students" changeType="neutral" gradient="gradient-danger" delay={0.3} />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quiz Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Quiz Performance (Last 5 Weeks)</h3>
            <Badge variant="success">Improving ↑</Badge>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MOCK_STUDENT_STATS.quiz_performance}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="score" stroke="#0ea5e9" fill="url(#scoreGrad)" strokeWidth={2.5} dot={{ fill: '#0ea5e9', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Subject Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
        >
          <h3 className="font-bold text-slate-800 mb-4">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={MOCK_STUDENT_STATS.subject_scores}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <Radar name="Score" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Homework */}
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Pending Homework</h3>
            <button onClick={() => navigate('/homework')} className="text-sm text-sky-500 font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {MOCK_HOMEWORK.filter(h => h.status === 'pending').slice(0, 4).map(hw => (
              <div key={hw.id} className="flex items-start gap-3">
                <div className={clsx('w-2 h-2 rounded-full mt-2 flex-shrink-0', hw.priority === 'high' ? 'bg-red-500' : hw.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500')} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{hw.title}</p>
                  <p className="text-xs text-slate-400">{hw.subject} • {hw.due_date}</p>
                </div>
                <Badge variant={priorityColor[hw.priority] as any} size="sm">{hw.priority}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Notices */}
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Latest Notices</h3>
            <button onClick={() => navigate('/notices')} className="text-sm text-sky-500 font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {MOCK_NOTICES.slice(0, 3).map(n => (
              <div key={n.id} className="p-3 bg-slate-50 rounded-xl">
                {n.is_pinned && <Badge variant="danger" size="sm" className="mb-1.5">📌 Pinned</Badge>}
                <p className="text-sm font-semibold text-slate-700">{n.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{n.content}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Rewards */}
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Recent Badges</h3>
            <button onClick={() => navigate('/rewards')} className="text-sm text-sky-500 font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {MOCK_REWARDS.slice(0, 4).map(r => (
              <div key={r.id} className="flex items-center gap-3">
                <span className="text-2xl">{r.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{r.title}</p>
                  <p className="text-xs text-slate-400">{r.points} pts • {r.earned_at}</p>
                </div>
                <span className={clsx('w-6 h-6 rounded-full border-2 flex-shrink-0', {
                  'bg-yellow-400 border-yellow-500': r.badge_type === 'gold',
                  'bg-gray-300 border-gray-400': r.badge_type === 'silver',
                  'bg-amber-700 border-amber-800': r.badge_type === 'bronze',
                  'bg-sky-300 border-sky-500': r.badge_type === 'platinum',
                  'bg-cyan-400 border-cyan-600': r.badge_type === 'diamond',
                })} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Assistant Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center">
            <Brain size={24} className="text-sky-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">AI Study Assistant</h3>
            <p className="text-slate-400 text-sm">Get personalized help with your studies, quizzes, and more</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/quiz')}
          className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl transition-colors text-sm flex-shrink-0"
        >
          Ask AI →
        </button>
      </motion.div>
    </div>
  );
}

export function StudentDashboard() {
  const { user } = useAuth();
  const isJunior = (user?.grade || 10) <= 5;

  if (isJunior) {
    return <JuniorDashboard user={user!} />;
  }
  return <SeniorDashboard user={user!} />;
}
