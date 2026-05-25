import { motion } from 'framer-motion';
import { Calendar, TrendingUp, CircleCheck as CheckCircle, Circle as XCircle, Clock } from 'lucide-react';
import { MOCK_ATTENDANCE, MOCK_STUDENT_STATS } from '../lib/mockData';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import clsx from 'clsx';

const statusConfig = {
  present: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', label: 'Present' },
  absent: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Absent' },
  late: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100', label: 'Late' },
  excused: { icon: CheckCircle, color: 'text-sky-600', bg: 'bg-sky-100', label: 'Excused' },
};

const calDays = [
  { date: '05/01', status: 'present' }, { date: '05/02', status: 'present' },
  { date: '05/05', status: 'present' }, { date: '05/06', status: 'excused' },
  { date: '05/07', status: 'present' }, { date: '05/08', status: 'present' },
  { date: '05/09', status: 'present' }, { date: '05/12', status: 'late' },
  { date: '05/13', status: 'present' }, { date: '05/14', status: 'present' },
  { date: '05/15', status: 'absent' }, { date: '05/16', status: 'present' },
  { date: '05/19', status: 'present' },
];

const monthData = MOCK_STUDENT_STATS.monthly_attendance;

export function AttendancePage() {
  const present = MOCK_ATTENDANCE.filter(a => a.status === 'present').length;
  const absent = MOCK_ATTENDANCE.filter(a => a.status === 'absent').length;
  const late = MOCK_ATTENDANCE.filter(a => a.status === 'late').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Attendance</h1>
        <p className="text-slate-500 mt-1">Track your daily and monthly attendance records</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Attendance %" value="92%" icon={<TrendingUp size={20} />} change="This month" gradient="gradient-success" delay={0} />
        <StatCard title="Days Present" value={present} icon={<CheckCircle size={20} />} change="Last 10 days" changeType="neutral" gradient="gradient-primary" delay={0.1} />
        <StatCard title="Days Absent" value={absent} icon={<XCircle size={20} />} change="Last 10 days" changeType="down" gradient="gradient-danger" delay={0.2} />
        <StatCard title="Late Arrivals" value={late} icon={<Clock size={20} />} changeType="neutral" gradient="gradient-warning" delay={0.3} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-slate-800 mb-4">Monthly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[70, 100]} />
              <Tooltip
                formatter={(v) => [`${v}%`, 'Attendance']}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                {monthData.map((entry, i) => (
                  <Cell key={i} fill={entry.percentage >= 90 ? '#10b981' : entry.percentage >= 80 ? '#f59e0b' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-bold text-slate-800 mb-4">May 2026 Calendar</h3>
          <div className="grid grid-cols-7 gap-1.5 text-xs text-center text-slate-500 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="font-semibold">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty cells for start of month */}
            {[...Array(3)].map((_, i) => <div key={`e${i}`} />)}
            {[...Array(31)].map((_, dayIdx) => {
              const day = dayIdx + 1;
              const dateStr = `05/${day.toString().padStart(2, '0')}`;
              const rec = calDays.find(c => c.date === dateStr);
              const isWeekend = (dayIdx + 3) % 7 === 0 || (dayIdx + 3) % 7 === 6;
              return (
                <div
                  key={day}
                  className={clsx(
                    'aspect-square rounded-lg flex items-center justify-center text-xs font-medium',
                    isWeekend ? 'bg-slate-100 text-slate-400' :
                    rec?.status === 'present' ? 'bg-emerald-100 text-emerald-700' :
                    rec?.status === 'absent' ? 'bg-red-100 text-red-700' :
                    rec?.status === 'late' ? 'bg-amber-100 text-amber-700' :
                    rec?.status === 'excused' ? 'bg-sky-100 text-sky-700' :
                    'bg-slate-50 text-slate-400'
                  )}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 mt-4 text-xs">
            {[['bg-emerald-100 text-emerald-700', 'Present'], ['bg-red-100 text-red-700', 'Absent'], ['bg-amber-100 text-amber-700', 'Late'], ['bg-sky-100 text-sky-700', 'Excused']].map(([cls, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={clsx('w-5 h-5 rounded text-center text-xs flex items-center justify-center', cls)}>•</div>
                <span className="text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Log */}
      <Card>
        <h3 className="font-bold text-slate-800 mb-4">Recent Attendance Log</h3>
        <div className="space-y-2">
          {MOCK_ATTENDANCE.map((a) => {
            const cfg = statusConfig[a.status as keyof typeof statusConfig];
            return (
              <motion.div
                key={a.date}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center', cfg.bg)}>
                    <cfg.icon size={18} className={cfg.color} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{a.date}</p>
                    <p className="text-xs text-slate-400">{new Date(a.date).toLocaleDateString('en-IN', { weekday: 'long' })}</p>
                  </div>
                </div>
                <span className={clsx('px-3 py-1 rounded-full text-xs font-semibold', cfg.bg, cfg.color)}>
                  {cfg.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
