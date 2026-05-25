import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Trophy, Star, Flame, Zap, Award, TrendingUp } from 'lucide-react';
import { MOCK_REWARDS, MOCK_STUDENT_STATS } from '../lib/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

const badgeColors: Record<string, string> = {
  bronze: 'from-amber-700 to-amber-600',
  silver: 'from-slate-400 to-slate-500',
  gold: 'from-yellow-400 to-amber-500',
  platinum: 'from-sky-400 to-sky-600',
  diamond: 'from-cyan-400 to-sky-500',
};

const badgeBg: Record<string, string> = {
  bronze: 'bg-amber-50 border-amber-200',
  silver: 'bg-slate-50 border-slate-200',
  gold: 'bg-yellow-50 border-yellow-200',
  platinum: 'bg-sky-50 border-sky-200',
  diamond: 'bg-cyan-50 border-cyan-200',
};

const comingSoonBadges = [
  { title: 'Homework Hero', icon: '📚', desc: 'Complete 30 assignments on time', progress: 18, max: 30, type: 'silver' },
  { title: 'Perfect Week', icon: '🌟', desc: 'Perfect attendance for a full week', progress: 4, max: 5, type: 'gold' },
  { title: 'Quiz Legend', icon: '🧠', desc: 'Score 100% in 10 quizzes', progress: 7, max: 10, type: 'platinum' },
  { title: 'Social Star', icon: '🤝', desc: 'Join 5 community activities', progress: 3, max: 5, type: 'bronze' },
];

export function RewardsPage() {
  const { user } = useAuth();
  const isJunior = (user?.grade || 10) <= 5;
  const [showPopup, setShowPopup] = useState(false);
  const [selectedReward, setSelectedReward] = useState(MOCK_REWARDS[0]);

  const totalPoints = MOCK_REWARDS.reduce((s, r) => s + r.points, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{isJunior ? '🏆 My Treasures!' : 'Rewards & Achievements'}</h1>
        <p className="text-slate-500 mt-1">Earn badges, climb ranks, and showcase your achievements</p>
      </div>

      {/* Points Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className={clsx('rounded-3xl p-6 text-white', isJunior ? 'gradient-kids' : 'bg-gradient-to-r from-amber-500 to-orange-500')}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium">Total Points Earned</p>
            <p className="text-5xl font-bold mt-1">{totalPoints.toLocaleString()}</p>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
                <Flame size={14} /> <span className="text-sm font-semibold">{MOCK_STUDENT_STATS.current_streak} day streak</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
                <Trophy size={14} /> <span className="text-sm font-semibold">Rank #5</span>
              </div>
            </div>
          </div>
          <div className="text-8xl animate-float">{isJunior ? '🌈' : '🏆'}</div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Badges Earned', value: MOCK_REWARDS.length, icon: '🏅', color: 'amber' },
          { label: 'Gold Badges', value: MOCK_REWARDS.filter(r => r.badge_type === 'gold').length, icon: '🥇', color: 'yellow' },
          { label: 'Total Points', value: totalPoints, icon: '⭐', color: 'sky' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-${s.color}-50 border border-${s.color}-100 rounded-2xl p-4 text-center`}
          >
            <div className={clsx('text-3xl mb-2', isJunior && 'animate-bounce-in')}>{s.icon}</div>
            <p className="text-2xl font-bold text-slate-800">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Earned Badges */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Earned Badges</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_REWARDS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, type: 'spring', bounce: 0.3 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => { setSelectedReward(r); setShowPopup(true); }}
              className={clsx('p-5 rounded-2xl border-2 cursor-pointer transition-all', badgeBg[r.badge_type])}
            >
              <div className="flex items-start gap-4">
                <div className={clsx('w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl shadow-md', badgeColors[r.badge_type])}>
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800">{r.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{r.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="warning" size="sm">+{r.points} pts</Badge>
                    <span className="text-xs text-slate-400 capitalize">{r.badge_type}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Coming Up Next...</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {comingSoonBadges.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl opacity-60">{b.icon}</span>
                <div>
                  <p className="font-bold text-slate-700">{b.title}</p>
                  <p className="text-xs text-slate-500">{b.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(b.progress / b.max) * 100}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    className="h-full bg-sky-500 rounded-full"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600">{b.progress}/{b.max}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Badge Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="bg-white rounded-3xl p-8 text-center max-w-sm w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
                className={clsx('w-24 h-24 rounded-3xl bg-gradient-to-br mx-auto flex items-center justify-center text-5xl shadow-xl', badgeColors[selectedReward.badge_type])}
              >
                {selectedReward.icon}
              </motion.div>
              <h2 className="text-2xl font-bold text-slate-800 mt-4">{selectedReward.title}</h2>
              <p className="text-slate-500 mt-2">{selectedReward.description}</p>
              <div className="mt-4 flex justify-center gap-3">
                <Badge variant="warning">+{selectedReward.points} points</Badge>
                <Badge variant="gray" className="capitalize">{selectedReward.badge_type} badge</Badge>
              </div>
              <p className="text-xs text-slate-400 mt-3">Earned on {selectedReward.earned_at}</p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-5 w-full py-3 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-colors"
              >
                Awesome! 🎉
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
