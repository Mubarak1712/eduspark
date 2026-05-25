import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { Calendar, BookOpen, Trophy, Bell, TrendingUp, MessageCircle, TriangleAlert as AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_STUDENT_STATS, MOCK_HOMEWORK, MOCK_NOTICES, MOCK_ATTENDANCE } from '../../lib/mockData';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import clsx from 'clsx';

const studentInfo = {
  name: 'Arjun Sharma',
  rollNumber: 'STU001',
  class: '10A',
  grade: 10,
  avatar: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=100',
  teacher: 'Mrs. Kavitha Reddy',
  overallGrade: 'A',
};

export function ParentDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-slate-800">Parent Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome, {user?.full_name}</p>
      </motion.div>

      {/* Student Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-5">
          <img
            src={studentInfo.avatar}
            alt={studentInfo.name}
            className="w-20 h-20 rounded-2xl object-cover border-4 border-white/30 shadow-lg"
          />
          <div>
            <p className="text-emerald-200 text-sm font-medium mb-1">Your Child</p>
            <h2 className="text-2xl font-bold">{studentInfo.name}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Class {studentInfo.class}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Roll: {studentInfo.rollNumber}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">Grade {studentInfo.overallGrade}</span>
            </div>
          </div>
          <div className="ml-auto hidden sm:flex flex-col items-end gap-2">
            <p className="text-emerald-200 text-xs">Class Teacher</p>
            <p className="font-semibold">{studentInfo.teacher}</p>
            <button className="flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors">
              <MessageCircle size={14} /> Message Teacher
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Attendance" value="92%" icon={<Calendar size={20} />} change="This month" gradient="gradient-primary" delay={0} />
        <StatCard title="Homework Done" value="85%" icon={<BookOpen size={20} />} change="17/20 tasks" changeType="neutral" gradient="gradient-success" delay={0.1} />
        <StatCard title="Quiz Avg." value="78%" icon={<TrendingUp size={20} />} change="+8% this week" gradient="gradient-warning" delay={0.2} />
        <StatCard title="Total Points" value="1,720" icon={<Trophy size={20} />} change="Class Rank #5" changeType="neutral" gradient="gradient-danger" delay={0.3} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-slate-800 mb-4">Monthly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MOCK_STUDENT_STATS.monthly_attendance}>
              <defs>
                <linearGradient id="attendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[70, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="percentage" stroke="#10b981" fill="url(#attendGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-bold text-slate-800 mb-4">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MOCK_STUDENT_STATS.subject_scores}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Attendance */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-slate-800 mb-4">Recent Attendance (10 days)</h3>
          <div className="grid grid-cols-5 gap-2">
            {MOCK_ATTENDANCE.map((a) => (
              <div key={a.date} className="flex flex-col items-center gap-1">
                <div className={clsx(
                  'w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold',
                  a.status === 'present' ? 'bg-emerald-500' :
                  a.status === 'absent' ? 'bg-red-500' :
                  a.status === 'late' ? 'bg-amber-500' : 'bg-sky-400'
                )}>
                  {a.status === 'present' ? '✓' : a.status === 'absent' ? '✗' : a.status === 'late' ? 'L' : 'E'}
                </div>
                <p className="text-xs text-slate-500 text-center">{a.date.slice(5)}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs">
            {[['✓ Present', 'bg-emerald-500'], ['✗ Absent', 'bg-red-500'], ['L Late', 'bg-amber-500'], ['E Excused', 'bg-sky-400']].map(([l, c]) => (
              <div key={l} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded ${c}`} />
                <span className="text-slate-500">{l}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Homework Status */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Upcoming Homework</h3>
            {MOCK_HOMEWORK.filter(h => h.status === 'pending').length > 0 && (
              <Badge variant="warning">
                <AlertTriangle size={11} className="mr-1" />
                {MOCK_HOMEWORK.filter(h => h.status === 'pending').length} Pending
              </Badge>
            )}
          </div>
          <div className="space-y-3">
            {MOCK_HOMEWORK.map(hw => (
              <div key={hw.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-slate-700">{hw.title}</p>
                  <p className="text-xs text-slate-400">{hw.subject} • Due {hw.due_date}</p>
                </div>
                <Badge variant={hw.status === 'submitted' ? 'success' : hw.priority === 'high' ? 'danger' : 'warning'}>
                  {hw.status === 'submitted' ? '✓ Done' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Notices */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Bell size={18} className="text-sky-500" />
          <h3 className="font-bold text-slate-800">School Notices</h3>
        </div>
        <div className="space-y-3">
          {MOCK_NOTICES.map(n => (
            <div key={n.id} className={clsx('p-4 rounded-xl border', n.is_pinned ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200')}>
              <div className="flex items-center gap-2 mb-1">
                {n.is_pinned && <span className="text-amber-500 text-xs font-bold">📌 PINNED</span>}
                <Badge variant={n.category === 'urgent' ? 'danger' : n.category === 'academic' ? 'primary' : n.category === 'holiday' ? 'success' : 'gray'} size="sm">
                  {n.category}
                </Badge>
              </div>
              <p className="font-semibold text-slate-800">{n.title}</p>
              <p className="text-sm text-slate-500 mt-1">{n.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
