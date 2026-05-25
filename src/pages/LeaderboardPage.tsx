import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trophy, Flame, Crown, Medal, Star } from 'lucide-react';
import { MOCK_LEADERBOARD } from '../lib/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import clsx from 'clsx';

const badgeGradients: Record<string, string> = {
  diamond: 'from-cyan-400 to-sky-500',
  platinum: 'from-sky-300 to-blue-500',
  gold: 'from-yellow-400 to-amber-500',
  silver: 'from-slate-300 to-slate-500',
  bronze: 'from-amber-600 to-amber-700',
};

type FilterType = 'overall' | 'quiz' | 'attendance' | 'activities';

export function LeaderboardPage() {
  const [filter, setFilter] = useState<FilterType>('overall');

  const top3 = MOCK_LEADERBOARD.slice(0, 3);
  const rest = MOCK_LEADERBOARD.slice(3);
  const myEntry = MOCK_LEADERBOARD[1]; // Arjun = rank 2

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Leaderboard</h1>
        <p className="text-slate-500 mt-1">Top performers across the school</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['overall', 'quiz', 'attendance', 'activities'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              'px-4 py-2 rounded-xl text-sm font-semibold capitalize whitespace-nowrap transition-all',
              filter === f ? 'bg-sky-500 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            )}
          >
            {f === 'overall' ? '🏆 Overall' : f === 'quiz' ? '🧠 Quiz' : f === 'attendance' ? '📅 Attendance' : '⚽ Activities'}
          </button>
        ))}
      </div>

      {/* My Rank Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-sky-600 to-cyan-600 rounded-2xl p-5 text-white flex items-center gap-4"
      >
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
          #{myEntry.rank}
        </div>
        <div>
          <p className="text-sky-200 text-sm">Your Current Rank</p>
          <p className="font-bold text-lg">{myEntry.name}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-bold">{myEntry.points.toLocaleString()}</p>
          <p className="text-sky-200 text-xs">points</p>
        </div>
      </motion.div>

      {/* Podium - Top 3 */}
      <div className="flex items-end justify-center gap-4 pt-8 pb-4">
        {/* 2nd place */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <img src={top3[1].avatar} alt={top3[1].name} className="w-16 h-16 rounded-2xl object-cover border-4 border-slate-300 shadow-lg" />
            <div className="absolute -top-3 -right-2 w-7 h-7 bg-slate-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">2</div>
          </div>
          <p className="text-sm font-bold text-slate-800 mt-2 text-center max-w-[80px] truncate">{top3[1].name.split(' ')[0]}</p>
          <p className="text-xs text-slate-500">{top3[1].points}</p>
          <div className="mt-2 w-24 h-24 bg-slate-200 rounded-t-xl flex items-end justify-center pb-2">
            <Medal size={24} className="text-slate-400" />
          </div>
        </motion.div>

        {/* 1st place */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="flex flex-col items-center"
        >
          <Crown size={28} className="text-amber-500 mb-1 animate-float" />
          <div className="relative">
            <img src={top3[0].avatar} alt={top3[0].name} className="w-20 h-20 rounded-2xl object-cover border-4 border-yellow-400 shadow-xl" />
            <div className="absolute -top-3 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">1</div>
          </div>
          <p className="text-sm font-bold text-slate-800 mt-2 text-center max-w-[90px] truncate">{top3[0].name.split(' ')[0]}</p>
          <p className="text-xs text-slate-500">{top3[0].points}</p>
          <div className="mt-2 w-28 h-32 bg-amber-100 rounded-t-xl flex items-end justify-center pb-2 border-t-4 border-amber-400">
            <Trophy size={28} className="text-amber-500" />
          </div>
        </motion.div>

        {/* 3rd place */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <img src={top3[2].avatar} alt={top3[2].name} className="w-16 h-16 rounded-2xl object-cover border-4 border-amber-700 shadow-lg" />
            <div className="absolute -top-3 -right-2 w-7 h-7 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">3</div>
          </div>
          <p className="text-sm font-bold text-slate-800 mt-2 text-center max-w-[80px] truncate">{top3[2].name.split(' ')[0]}</p>
          <p className="text-xs text-slate-500">{top3[2].points}</p>
          <div className="mt-2 w-24 h-16 bg-amber-100 rounded-t-xl flex items-end justify-center pb-2">
            <Medal size={24} className="text-amber-700" />
          </div>
        </motion.div>
      </div>

      {/* Full Leaderboard */}
      <Card>
        <h3 className="font-bold text-slate-800 mb-4">Full Rankings</h3>
        <div className="space-y-2">
          {MOCK_LEADERBOARD.map((entry, i) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={clsx(
                'flex items-center gap-4 p-3 rounded-xl transition-all',
                entry.name === myEntry.name ? 'bg-sky-50 border-2 border-sky-200' : 'hover:bg-slate-50'
              )}
            >
              {/* Rank */}
              <div className={clsx(
                'w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0',
                entry.rank === 1 ? 'bg-amber-100 text-amber-600' :
                entry.rank === 2 ? 'bg-slate-200 text-slate-600' :
                entry.rank === 3 ? 'bg-amber-50 text-amber-700' :
                'bg-slate-100 text-slate-500'
              )}>
                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
              </div>

              {/* Avatar */}
              <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />

              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm">
                  {entry.name}
                  {entry.name === myEntry.name && <span className="ml-2 text-xs text-sky-500 font-medium">(You)</span>}
                </p>
                <p className="text-xs text-slate-400">{entry.class}</p>
              </div>

              {/* Streak */}
              <div className="hidden sm:flex items-center gap-1 text-sm text-amber-600">
                <Flame size={14} /> <span className="font-semibold">{entry.streak}d</span>
              </div>

              {/* Badge */}
              <div className={clsx('w-6 h-6 rounded-full bg-gradient-to-br flex-shrink-0', badgeGradients[entry.badge])} title={entry.badge} />

              {/* Points */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-slate-800 text-sm">{entry.points.toLocaleString()}</p>
                <p className="text-xs text-slate-400">pts</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
