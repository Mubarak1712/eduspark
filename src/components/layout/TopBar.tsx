import { Bell, Search, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface TopBarProps {
  sidebarCollapsed: boolean;
}

export function TopBar({ sidebarCollapsed }: TopBarProps) {
  const { user } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Quiz Streak!', message: 'You\'ve maintained a 14-day streak 🔥', type: 'quiz', time: '2m ago' },
    { id: 2, title: 'New Homework', message: 'Physics assignment due tomorrow', type: 'alert', time: '1h ago' },
    { id: 3, title: 'Badge Earned!', message: 'You earned the "Science Star" badge', type: 'reward', time: '3h ago' },
    { id: 4, title: 'Notice', message: 'PTM scheduled for May 31st', type: 'info', time: '1d ago' },
  ];

  const typeColors = { quiz: 'bg-amber-100 text-amber-600', alert: 'bg-red-100 text-red-600', reward: 'bg-emerald-100 text-emerald-600', info: 'bg-sky-100 text-sky-600' };

  return (
    <header
      className="fixed top-0 right-0 h-16 bg-white border-b border-slate-100 shadow-sm z-30 flex items-center px-6 gap-4"
      style={{ left: sidebarCollapsed ? 72 : 260, transition: 'left 0.3s ease' }}
    >
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, assignments..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* AI Assistant badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-200 rounded-xl">
          <Zap size={13} className="text-sky-500" />
          <span className="text-xs font-medium text-sky-600">AI Assistant</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <Bell size={16} className="text-slate-600" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
          </button>
          {notifOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs flex-shrink-0 ${typeColors[n.type as keyof typeof typeColors]}`}>
                      {n.type === 'quiz' ? '🔥' : n.type === 'reward' ? '🏆' : n.type === 'alert' ? '📚' : '📢'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-500 truncate">{n.message}</p>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0">{n.time}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-100 text-center">
                <button className="text-xs text-sky-600 font-medium hover:underline">View all</button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Avatar */}
        <img
          src={user?.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60'}
          alt="avatar"
          className="w-9 h-9 rounded-xl object-cover border-2 border-slate-200 shadow-sm"
        />
      </div>
    </header>
  );
}
