import { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string;
  className?: string;
}

export function ContactCard({ icon: Icon, title, description, details, className }: ContactCardProps) {
  return (
    <div className={clsx('rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-900/5 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-md', className)}>
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-100 text-sky-600 mb-5">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-4">{description}</p>
      <p className="text-sm font-medium text-slate-700">{details}</p>
    </div>
  );
}
