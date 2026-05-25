import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, GraduationCap, TrendingUp, Calendar, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Plus, Bell, ChartBar as BarChart3, School } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

const enrollmentData = [
  { month: 'Jan', students: 980 }, { month: 'Feb', students: 995 },
  { month: 'Mar', students: 1010 }, { month: 'Apr', students: 1025 },
  { month: 'May', students: 1050 },
];

const classAttendance = [
  { class: 'Class 1-3', avg: 96 }, { class: 'Class 4-6', avg: 93 },
  { class: 'Class 7-9', avg: 88 }, { class: 'Class 10-12', avg: 85 },
];

const genderSplit = [
  { name: 'Boys', value: 54, color: '#0ea5e9' },
  { name: 'Girls', value: 46, color: '#f472b6' },
];

const recentAlerts = [
  { id: 1, type: 'warning', message: '12 students have < 75% attendance this week', time: '10 min ago' },
  { id: 2, type: 'info', message: 'Annual Sports Day registration closes in 5 days', time: '1h ago' },
  { id: 3, type: 'success', message: 'Term 2 exam schedule successfully published', time: '3h ago' },
  { id: 4, type: 'warning', message: '3 teachers absent today — classes reassigned', time: '5h ago' },
];

const topTeachers = [
  { name: 'Mrs. Kavitha Reddy', subject: 'Mathematics', rating: 4.9, students: 45, avatar: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=60' },
  { name: 'Dr. Pradeep Nair', subject: 'Physics', rating: 4.8, students: 38, avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60' },
  { name: 'Ms. Anita Singh', subject: 'English', rating: 4.7, students: 42, avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=60' },
  { name: 'Mr. Suresh Iyer', subject: 'History', rating: 4.6, students: 35, avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60' },
];

const alertColors = {
  warning: 'bg-amber-100 text-amber-600 border-amber-200',
  info: 'bg-sky-100 text-sky-600 border-sky-200',
  success: 'bg-emerald-100 text-emerald-600 border-emerald-200',
};

const alertIcons = { warning: '⚠️', info: 'ℹ️', success: '✅' };

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, {user?.full_name} • EduSpark School</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-semibold hover:bg-sky-600 transition-colors">
            <Plus size={16} /> Add Student
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors">
            <Bell size={16} /> Send Notice
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="1,050" icon={<GraduationCap size={20} />} change="+25 this month" gradient="gradient-primary" delay={0} />
        <StatCard title="Total Teachers" value="68" icon={<Users size={20} />} change="All active" changeType="neutral" gradient="gradient-success" delay={0.1} />
        <StatCard title="School Attendance" value="91%" icon={<Calendar size={20} />} change="+1% vs last week" gradient="gradient-warning" delay={0.2} />
        <StatCard title="Avg. Academic Score" value="79%" icon={<TrendingUp size={20} />} change="+3% this term" gradient="gradient-danger" delay={0.3} />
      </div>

      {/* More Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Quizzes', value: '8', icon: '🧠', color: 'sky' },
          { label: 'Upcoming Events', value: '5', icon: '📅', color: 'emerald' },
          { label: 'Open Notices', value: '12', icon: '📢', color: 'amber' },
          { label: 'Active Activities', value: '6', icon: '⚽', color: 'rose' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className={`bg-${s.color}-50 border border-${s.color}-100 rounded-2xl p-4 flex items-center gap-3`}
          >
            <span className="text-3xl">{s.icon}</span>
            <div>
              <p className="text-2xl font-bold text-slate-800">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-4">Student Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={enrollmentData}>
              <defs>
                <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="students" stroke="#0ea5e9" fill="url(#enrollGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-bold text-slate-800 mb-4">Gender Distribution</h3>
          <div className="flex justify-center">
            <PieChart width={180} height={180}>
              <Pie data={genderSplit} cx={90} cy={90} innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {genderSplit.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            {genderSplit.map(g => (
              <div key={g.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ background: g.color }} />
                <span className="text-slate-600">{g.name}: <strong>{g.value}%</strong></span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Attendance by Grade */}
        <Card>
          <h3 className="font-bold text-slate-800 mb-4">Attendance by Grade Group</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={classAttendance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 12 }} domain={[75, 100]} />
              <YAxis dataKey="class" type="category" tick={{ fontSize: 12 }} width={80} />
              <Tooltip />
              <Bar dataKey="avg" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Alerts */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-amber-500" />
            <h3 className="font-bold text-slate-800">Recent Alerts</h3>
          </div>
          <div className="space-y-3">
            {recentAlerts.map(a => (
              <div key={a.id} className={`flex items-start gap-3 p-3 rounded-xl border ${alertColors[a.type as keyof typeof alertColors]}`}>
                <span className="text-base flex-shrink-0">{alertIcons[a.type as keyof typeof alertIcons]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{a.message}</p>
                  <p className="text-xs opacity-70 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Teachers */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">Top Performing Teachers</h3>
          <button className="text-sm text-sky-500 font-medium hover:underline">View all</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topTeachers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-xl object-cover mb-3" />
              <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.subject}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-amber-400 text-sm">★</span>
                <span className="font-bold text-slate-800 text-sm">{t.rating}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{t.students} students</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
