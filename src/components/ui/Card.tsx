import { type ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };
  return (
    <div className={clsx(
      'bg-white rounded-2xl border border-slate-100 shadow-sm',
      hover && 'card-hover cursor-pointer',
      paddings[padding],
      className
    )}>
      {children}
    </div>
  );
}
