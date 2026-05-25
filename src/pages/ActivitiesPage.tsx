import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Users, Clock, CircleCheck as CheckCircle, Plus, ListFilter as Filter } from 'lucide-react';
import { MOCK_ACTIVITIES } from '../lib/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

const categoryConfig: Record<string, { icon: string; color: string; bg: string }> = {
  sports: { icon: '⚽', color: 'text-sky-600', bg: 'bg-sky-50' },
  arts: { icon: '🎨', color: 'text-rose-600', bg: 'bg-rose-50' },
  science: { icon: '🔬', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  cultural: { icon: '🎭', color: 'text-amber-600', bg: 'bg-amber-50' },
  literary: { icon: '📖', color: 'text-violet-600', bg: 'bg-violet-50' },
  social: { icon: '🤝', color: 'text-teal-600', bg: 'bg-teal-50' },
};

type FilterType = 'all' | 'sports' | 'arts' | 'science' | 'cultural' | 'literary' | 'social';

export function ActivitiesPage() {
  const { user } = useAuth();
  const isJunior = (user?.grade || 10) <= 5;
  const [filter, setFilter] = useState<FilterType>('all');
  const [registered, setRegistered] = useState<string[]>([]);

  const filtered = filter === 'all' ? MOCK_ACTIVITIES : MOCK_ACTIVITIES.filter(a => a.category === filter);

  const register = (id: string) => {
    setRegistered(r => r.includes(id) ? r : [...r, id]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{isJunior ? '🎉 Fun Activities!' : 'School Activities'}</h1>
          <p className="text-slate-500 mt-1">Participate, earn points, and grow your skills</p>
        </div>
        {(user?.role === 'teacher' || user?.role === 'admin') && (
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-semibold hover:bg-sky-600 transition-colors">
            <Plus size={16} /> Add Activity
          </button>
        )}
      </div>

      {/* My Participation Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className={clsx('rounded-2xl p-5 text-white flex items-center justify-between', isJunior ? 'gradient-kids' : 'bg-gradient-to-r from-emerald-600 to-teal-600')}
      >
        <div>
          <p className="text-white/80 text-sm">Your Participation</p>
          <p className="text-3xl font-bold mt-1">4 Activities</p>
          <p className="text-white/70 text-sm mt-1">+250 participation points earned</p>
        </div>
        <div className="text-right">
          <div className="text-5xl">{isJunior ? '🎊' : '🏅'}</div>
          <p className="text-white/70 text-xs mt-1">Active Participant</p>
        </div>
      </motion.div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {(['all', 'sports', 'arts', 'science', 'cultural', 'literary', 'social'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              'px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5',
              filter === f ? 'bg-sky-500 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            )}
          >
            {f === 'all' ? '🌟' : categoryConfig[f]?.icon}
            <span className="capitalize">{f}</span>
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className={clsx('grid gap-4', isJunior ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')}>
        {filtered.map((activity, i) => {
          const cat = categoryConfig[activity.category];
          const isRegistered = registered.includes(activity.id);
          const fillPct = Math.round((activity.participants / (activity.max_participants || 100)) * 100);

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={clsx(
                'bg-white rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-all',
                isJunior ? 'border-violet-100' : 'border-slate-100'
              )}
            >
              {/* Category header */}
              <div className={clsx('p-4', cat.bg)}>
                <div className="flex items-center justify-between">
                  <span className={clsx('text-3xl', isJunior && 'animate-bounce-in')}>{cat.icon}</span>
                  <Badge
                    variant={activity.category === 'sports' ? 'primary' : activity.category === 'science' ? 'success' : activity.category === 'arts' ? 'danger' : 'gray'}
                    size="sm"
                  >
                    {activity.category}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <h3 className={clsx('font-bold text-slate-800', isJunior ? 'text-lg' : 'text-base')}>{activity.title}</h3>
                <p className="text-slate-500 text-sm mt-1 line-clamp-2">{activity.description}</p>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar size={13} className="text-sky-500" />
                    <span>Event: {activity.event_date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={13} className="text-amber-500" />
                    <span>Register by: {activity.registration_deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users size={13} className="text-emerald-500" />
                    <span>{activity.participants}/{activity.max_participants} registered</span>
                  </div>
                </div>

                {/* Fill bar */}
                <div className="mt-3">
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fillPct}%` }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
                      className={clsx('h-full rounded-full', fillPct > 80 ? 'bg-red-400' : fillPct > 50 ? 'bg-amber-400' : 'bg-emerald-400')}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{fillPct}% full</p>
                </div>

                <button
                  onClick={() => register(activity.id)}
                  disabled={isRegistered}
                  className={clsx(
                    'mt-4 w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2',
                    isRegistered
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default'
                      : isJunior
                        ? 'gradient-kids text-white hover:opacity-90'
                        : 'bg-sky-500 hover:bg-sky-600 text-white'
                  )}
                >
                  {isRegistered ? <><CheckCircle size={16} /> Registered!</> : 'Register Now'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
