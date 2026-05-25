import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  gradient?: string;
  delay?: number;
}

export function StatCard({ title, value, icon, change, changeType = 'up', gradient = 'gradient-primary', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 card-hover"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
          {change && (
            <p className={clsx('text-sm mt-2 font-medium', {
              'text-emerald-600': changeType === 'up',
              'text-red-500': changeType === 'down',
              'text-slate-500': changeType === 'neutral',
            })}>
              {changeType === 'up' && '↑ '}
              {changeType === 'down' && '↓ '}
              {change}
            </p>
          )}
        </div>
        <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center text-white', gradient)}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
