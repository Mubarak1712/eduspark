import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { Users, BookOpen, Calendar, CircleCheck as CheckCircle, Clock, TrendingUp, Plus, CircleAlert as AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

const classPerformance = [
  { class: '10A', avg: 82 }, { class: '10B', avg: 75 }, { class: '9A', avg: 88 },
  { class: '9B', avg: 71 }, { class: '11A', avg: 79 },
];

const attendanceTrend = [
  { day: 'Mon', present: 36 }, { day: 'Tue', present: 38 }, { day: 'Wed', present: 34 },
  { day: 'Thu', present: 39 }, { day: 'Fri', present: 35 },
];

const hwStatus = [
  { name: 'Submitted', value: 68, color: '#10b981' },
  { name: 'Pending', value: 22, color: '#f59e0b' },
  { name: 'Overdue', value: 10, color: '#ef4444' },
];

const recentStudents = [
  { name: 'Arjun Sharma', class: '10A', attendance: 92, quiz: 88, status: 'good', avatar: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=60' },
  { name: 'Riya Mehta', class: '10A', attendance: 98, quiz: 95, status: 'excellent', avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=60' },
  { name: 'Rahul Gupta', class: '10B', attendance: 72, quiz: 60, status: 'needs-attention', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=60' },
  { name: 'Sneha Kapoor', class: '9B', attendance: 96, quiz: 90, status: 'excellent', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60' },
];

const statusBadge: Record<string, { variant: any; label: string }> = {
  excellent: { variant: 'success', label: 'Excellent' },
  good: { variant: 'primary', label: 'Good' },
  'needs-attention': { variant: 'danger', label: 'Needs Attention' },
};

export function TeacherDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome, {user?.full_name} 👩‍🏫</h1>
          <p className="text-slate-500 mt-1">Class Teacher • Mathematics & Science</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-semibold hover:bg-sky-600 transition-colors">
            <Plus size={16} /> Add Homework
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition-colors">
            <Calendar size={16} /> Mark Attendance
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="My Students" value="187" icon={<Users size={20} />} change="5 classes" changeType="neutral" gradient="gradient-primary" delay={0} />
        <StatCard title="Today's Attendance" value="94%" icon={<Calendar size={20} />} change="+2% vs yesterday" gradient="gradient-success" delay={0.1} />
        <StatCard title="Assignments" value="12" icon={<BookOpen size={20} />} change="3 due this week" changeType="neutral" gradient="gradient-warning" delay={0.2} />
        <StatCard title="Avg. Quiz Score" value="79%" icon={<TrendingUp size={20} />} change="+5% this month" gradient="gradient-danger" delay={0.3} />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-4">Class Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={classPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="class" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="avg" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-bold text-slate-800 mb-4">Homework Status</h3>
          <div className="flex justify-center">
            <PieChart width={180} height={180}>
              <Pie data={hwStatus} cx={90} cy={90} innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {hwStatus.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div className="space-y-2 mt-2">
            {hwStatus.map(s => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                  <span className="text-slate-600">{s.name}</span>
                </div>
                <span className="font-semibold text-slate-800">{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Attendance Trend + Student Table */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-bold text-slate-800 mb-4">This Week Attendance</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[30, 40]} />
              <Tooltip />
              <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Student Overview</h3>
            <button className="text-sm text-sky-500 font-medium hover:underline">View all students</button>
          </div>
          <div className="space-y-3">
            {recentStudents.map(s => (
              <div key={s.name} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{s.name}</p>
                  <p className="text-xs text-slate-500">{s.class}</p>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-slate-800">{s.attendance}%</div>
                    <div className="text-xs text-slate-400">Attend.</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-800">{s.quiz}%</div>
                    <div className="text-xs text-slate-400">Quiz</div>
                  </div>
                </div>
                <Badge variant={statusBadge[s.status].variant}>{statusBadge[s.status].label}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Post Notice', icon: '📢', color: 'sky' },
            { label: 'Create Quiz', icon: '🧠', color: 'amber' },
            { label: 'Schedule Event', icon: '📅', color: 'emerald' },
            { label: 'View Reports', icon: '📊', color: 'rose' },
          ].map(a => (
            <button key={a.label} className={`flex flex-col items-center gap-2 p-4 bg-${a.color}-50 border border-${a.color}-100 rounded-xl hover:bg-${a.color}-100 transition-colors`}>
              <span className="text-3xl">{a.icon}</span>
              <span className="text-sm font-medium text-slate-700">{a.label}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
