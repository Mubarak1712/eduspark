import { motion } from 'framer-motion';
import { useState } from 'react';
import { Megaphone, Pin, Calendar } from 'lucide-react';
import { MOCK_NOTICES } from '../lib/mockData';
import { Badge } from '../components/ui/Badge';
import clsx from 'clsx';

const categoryConfig: Record<string, { color: string; icon: string; variant: any }> = {
  general: { color: 'bg-slate-100 border-slate-200', icon: '📢', variant: 'gray' },
  academic: { color: 'bg-sky-50 border-sky-200', icon: '📚', variant: 'primary' },
  event: { color: 'bg-emerald-50 border-emerald-200', icon: '🎉', variant: 'success' },
  holiday: { color: 'bg-teal-50 border-teal-200', icon: '🏖️', variant: 'success' },
  urgent: { color: 'bg-red-50 border-red-200', icon: '🚨', variant: 'danger' },
  sports: { color: 'bg-amber-50 border-amber-200', icon: '⚽', variant: 'warning' },
};

export function NoticesPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? MOCK_NOTICES : MOCK_NOTICES.filter(n => n.category === filter);
  const categories = ['all', 'academic', 'event', 'holiday', 'sports', 'general', 'urgent'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">School Notices</h1>
        <p className="text-slate-500 mt-1">Stay updated with school announcements</p>
      </div>

      {/* Pinned Banner */}
      {MOCK_NOTICES.filter(n => n.is_pinned).length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white"
        >
          <div className="flex items-center gap-2 mb-3">
            <Pin size={18} /> <span className="font-bold text-sm">PINNED NOTICES</span>
          </div>
          <div className="space-y-3">
            {MOCK_NOTICES.filter(n => n.is_pinned).map(n => (
              <div key={n.id} className="bg-white/20 rounded-xl p-4">
                <p className="font-bold">{n.title}</p>
                <p className="text-white/80 text-sm mt-1">{n.content}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={clsx(
              'px-4 py-2 rounded-xl text-sm font-semibold capitalize whitespace-nowrap transition-all',
              filter === cat ? 'bg-sky-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            )}
          >
            {cat === 'all' ? '📋 All' : `${categoryConfig[cat]?.icon} ${cat}`}
          </button>
        ))}
      </div>

      {/* Notices */}
      <div className="space-y-4">
        {filtered.map((n, i) => {
          const cfg = categoryConfig[n.category] || categoryConfig.general;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={clsx('p-5 rounded-2xl border-2 shadow-sm transition-all hover:shadow-md', cfg.color)}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{cfg.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge variant={cfg.variant} size="sm">{n.category}</Badge>
                    {n.is_pinned && <Badge variant="warning" size="sm">📌 Pinned</Badge>}
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">{n.title}</h3>
                  <p className="text-slate-600 mt-2 text-sm leading-relaxed">{n.content}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400">
                    <Calendar size={12} /> {n.created_at}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
