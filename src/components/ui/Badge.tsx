import { type ReactNode } from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'gray' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

const variants = {
  primary: 'bg-sky-100 text-sky-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  gray: 'bg-slate-100 text-slate-600',
  info: 'bg-blue-100 text-blue-700',
};

export function Badge({ children, variant = 'gray', size = 'sm', className }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center font-medium rounded-full',
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
