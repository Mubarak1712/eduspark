import { motion } from 'framer-motion';
import { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { MOCK_TIMETABLE } from '../lib/mockData';
import { Card } from '../components/ui/Card';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

const subjectColors: Record<string, string> = {
  Mathematics: 'bg-sky-100 text-sky-700 border-sky-200',
  English: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Physics: 'bg-violet-100 text-violet-700 border-violet-200',
  Chemistry: 'bg-rose-100 text-rose-700 border-rose-200',
  Biology: 'bg-teal-100 text-teal-700 border-teal-200',
  History: 'bg-amber-100 text-amber-700 border-amber-200',
  Computer: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'P.E.': 'bg-orange-100 text-orange-700 border-orange-200',
  Break: 'bg-slate-50 text-slate-400 border-slate-100',
  Lunch: 'bg-yellow-50 text-yellow-600 border-yellow-100',
};

const subjectIcons: Record<string, string> = {
  Mathematics: '📐', English: '📝', Physics: '⚛️', Chemistry: '🧪',
  Biology: '🧬', History: '📜', Computer: '💻', 'P.E.': '⚽',
  Break: '☕', Lunch: '🍱',
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function TimetablePage() {
  const { user } = useAuth();
  const isJunior = (user?.grade || 10) <= 5;
  const [activeDay, setActiveDay] = useState('Monday');

  const dayData = MOCK_TIMETABLE.find(d => d.day === activeDay) || MOCK_TIMETABLE[0];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{isJunior ? '📅 My School Day!' : 'Class Timetable'}</h1>
        <p className="text-slate-500 mt-1">Class 10A — Academic Year 2025-26</p>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={clsx(
              'px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all',
              activeDay === day ? 'bg-sky-500 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50',
              day === today && activeDay !== day && 'border-sky-200 bg-sky-50 text-sky-600'
            )}
          >
            {day === today ? '📍 ' : ''}{day.slice(0, 3)}
            {day === today && <span className="ml-1 text-xs">(Today)</span>}
          </button>
        ))}
      </div>

      {/* Schedule */}
      <motion.div
        key={activeDay}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        {dayData.periods.map((period, i) => {
          const isBreak = period.subject === 'Break' || period.subject === 'Lunch';
          const colorClass = subjectColors[period.subject] || 'bg-slate-100 text-slate-700 border-slate-200';
          const icon = subjectIcons[period.subject] || '📘';

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={clsx(
                'flex items-center gap-4 p-4 rounded-2xl border transition-all',
                isBreak ? 'bg-slate-50 border-slate-100' : `${colorClass} border`
              )}
            >
              {/* Time */}
              <div className="flex-shrink-0 text-center min-w-[80px]">
                <p className={clsx('text-xs font-semibold', isBreak ? 'text-slate-400' : 'text-slate-600')}>{period.time.split('–')[0]}</p>
                <p className={clsx('text-xs', isBreak ? 'text-slate-300' : 'text-slate-400')}>— {period.time.split('–')[1]}</p>
              </div>

              {/* Divider */}
              <div className={clsx('w-px h-10 flex-shrink-0', isBreak ? 'bg-slate-200' : 'bg-current opacity-20')} />

              {/* Subject */}
              <div className="flex items-center gap-3 flex-1">
                <span className={clsx('text-2xl', isJunior && !isBreak && 'animate-bounce-in')}>{icon}</span>
                <div>
                  <p className={clsx('font-bold', isJunior ? 'text-base' : 'text-sm', isBreak && 'text-slate-400')}>{period.subject}</p>
                  {period.teacher && <p className={clsx('text-xs mt-0.5', isBreak ? 'text-slate-300' : 'opacity-70')}>{period.teacher}</p>}
                </div>
              </div>

              {/* Room */}
              {period.room && !isBreak && (
                <div className="flex items-center gap-1 text-xs opacity-70 flex-shrink-0">
                  <MapPin size={12} /> {period.room}
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Legend */}
      <Card>
        <h3 className="font-semibold text-slate-800 mb-3 text-sm">Subject Color Guide</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(subjectColors).filter(([s]) => s !== 'Break' && s !== 'Lunch').map(([subj, cls]) => (
            <span key={subj} className={clsx('px-3 py-1 rounded-full text-xs font-medium border', cls)}>
              {subjectIcons[subj]} {subj}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
