import { motion } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, Calendar, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Clock, ListFilter as Filter } from 'lucide-react';
import { MOCK_HOMEWORK } from '../lib/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

type FilterType = 'all' | 'pending' | 'submitted';

export function HomeworkPage() {
  const { user } = useAuth();
  const isJunior = (user?.grade || 10) <= 5;
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all' ? MOCK_HOMEWORK : MOCK_HOMEWORK.filter(h => h.status === filter);

  const pendingCount = MOCK_HOMEWORK.filter(h => h.status === 'pending').length;
  const submittedCount = MOCK_HOMEWORK.filter(h => h.status === 'submitted').length;

  const subjectIcons: Record<string, string> = {
    Mathematics: '📐', English: '📝', Physics: '⚛️', Biology: '🧬', Geography: '🗺️', Chemistry: '🧪', History: '📜', Computer: '💻',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{isJunior ? '📚 My Homework!' : 'Homework Assignments'}</h1>
          <p className="text-slate-500 mt-1">Track and submit your assignments</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center"
        >
          <Clock size={20} className="text-amber-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-amber-700">{pendingCount}</p>
          <p className="text-xs text-amber-600">Pending</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center"
        >
          <CheckCircle size={20} className="text-emerald-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-emerald-700">{submittedCount}</p>
          <p className="text-xs text-emerald-600">Submitted</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-center"
        >
          <BookOpen size={20} className="text-sky-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-sky-700">{MOCK_HOMEWORK.length}</p>
          <p className="text-xs text-sky-600">Total</p>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'pending', 'submitted'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              'px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all',
              filter === f ? 'bg-sky-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Homework List */}
      <div className="space-y-3">
        {filtered.map((hw, i) => (
          <motion.div
            key={hw.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={clsx(
              'bg-white rounded-2xl border-2 p-5 shadow-sm hover:shadow-md transition-all',
              hw.status === 'submitted' ? 'border-emerald-100' :
              hw.priority === 'high' ? 'border-red-100' :
              hw.priority === 'medium' ? 'border-amber-100' : 'border-slate-100'
            )}
          >
            <div className="flex items-start gap-4">
              <div className={clsx(
                'w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0',
                hw.status === 'submitted' ? 'bg-emerald-50' : hw.priority === 'high' ? 'bg-red-50' : 'bg-amber-50'
              )}>
                {subjectIcons[hw.subject] || '📘'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={clsx('font-bold text-slate-800', isJunior ? 'text-base' : 'text-sm')}>{hw.title}</h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge
                      variant={hw.status === 'submitted' ? 'success' : hw.priority === 'high' ? 'danger' : hw.priority === 'medium' ? 'warning' : 'gray'}
                    >
                      {hw.status === 'submitted' ? '✓ Done' : hw.priority + ' priority'}
                    </Badge>
                  </div>
                </div>
                <p className="text-slate-500 text-sm mt-0.5">{hw.subject}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Calendar size={12} /> Due: {hw.due_date}</span>
                </div>
              </div>
            </div>
            {hw.status === 'pending' && (
              <div className="mt-4 flex gap-2">
                <button className={clsx(
                  'flex-1 py-2 rounded-xl text-sm font-semibold transition-all',
                  isJunior ? 'gradient-kids text-white' : 'bg-sky-500 hover:bg-sky-600 text-white'
                )}>
                  Mark as Done ✓
                </button>
                <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                  Details
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
