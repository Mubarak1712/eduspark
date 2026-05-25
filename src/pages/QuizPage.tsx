import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flame, Trophy, CircleCheck as CheckCircle, Circle as XCircle, ChevronRight, Zap, RotateCcw } from 'lucide-react';
import { MOCK_QUIZZES, MOCK_STUDENT_STATS } from '../lib/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

type QuizState = 'select' | 'playing' | 'result';

export function QuizPage() {
  const { user } = useAuth();
  const isJunior = (user?.grade || 10) <= 5;
  const [state, setQuizState] = useState<QuizState>('select');
  const [selectedQuiz, setSelectedQuiz] = useState(MOCK_QUIZZES[0]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(selectedQuiz.time_limit_seconds);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (state !== 'playing') return;
    if (timeLeft <= 0) { finishQuiz(); return; }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [state, timeLeft]);

  const startQuiz = (quiz: typeof MOCK_QUIZZES[0]) => {
    setSelectedQuiz(quiz);
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setTimeLeft(quiz.time_limit_seconds);
    setScore(0);
    setShowResult(false);
    setQuizState('playing');
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const nextQuestion = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    if (currentQ + 1 >= selectedQuiz.questions.length) {
      const correct = newAnswers.filter((a, i) => a === selectedQuiz.questions[i].correct).length;
      setScore(correct * selectedQuiz.points_per_question);
      setQuizState('result');
    } else {
      setCurrentQ(c => c + 1);
      setSelected(null);
    }
  };

  const finishQuiz = () => {
    const correct = answers.filter((a, i) => a === selectedQuiz.questions[i]?.correct).length;
    setScore(correct * selectedQuiz.points_per_question);
    setQuizState('result');
  };

  const correctCount = answers.filter((a, i) => a === selectedQuiz.questions[i]?.correct).length;
  const pct = Math.round((correctCount / selectedQuiz.questions.length) * 100);

  if (state === 'select') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{isJunior ? '🧠 Quiz Time!' : 'Daily GK Quizzes'}</h1>
            <p className="text-slate-500 mt-1">Test your knowledge and earn points</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl">
              <Flame size={18} className="text-amber-500" />
              <span className="font-bold text-amber-700">{MOCK_STUDENT_STATS.current_streak} day streak!</span>
            </div>
          </div>
        </div>

        {/* Streak Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className={clsx(
            'rounded-2xl p-6',
            isJunior ? 'gradient-kids text-white' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
          )}
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl animate-float">🔥</div>
            <div>
              <h2 className="text-2xl font-bold">{MOCK_STUDENT_STATS.current_streak}-Day Streak!</h2>
              <p className="text-white/80">Keep it going! {14 - MOCK_STUDENT_STATS.current_streak} more days to unlock Diamond badge</p>
            </div>
            <div className="ml-auto">
              <div className="text-center bg-white/20 rounded-xl p-3">
                <p className="text-3xl font-bold">{MOCK_STUDENT_STATS.total_points}</p>
                <p className="text-xs text-white/80">Total Points</p>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${(MOCK_STUDENT_STATS.current_streak / 21) * 100}%` }} />
          </div>
          <p className="text-xs text-white/70 mt-1">{MOCK_STUDENT_STATS.current_streak}/21 days to longest streak badge</p>
        </motion.div>

        {/* Quiz Cards */}
        <h2 className="text-lg font-bold text-slate-800">Available Quizzes</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {MOCK_QUIZZES.map((quiz, i) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={clsx(
                'p-6 rounded-2xl border-2 cursor-pointer transition-all',
                isJunior ? 'border-violet-200 bg-violet-50 hover:border-violet-400' : 'border-slate-200 bg-white hover:border-sky-400 hover:shadow-md'
              )}
              onClick={() => startQuiz(quiz)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={clsx('text-4xl', isJunior && 'animate-bounce-in')}>{isJunior ? '🎯' : '🧠'}</div>
                <Badge variant={quiz.difficulty === 'easy' ? 'success' : quiz.difficulty === 'medium' ? 'warning' : 'danger'}>
                  {quiz.difficulty}
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{quiz.title}</h3>
              <p className="text-slate-500 text-sm mt-1">{quiz.category}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Clock size={14} /> {Math.floor(quiz.time_limit_seconds / 60)}min</span>
                <span className="flex items-center gap-1"><Zap size={14} /> {quiz.questions.length} questions</span>
                <span className="flex items-center gap-1"><Trophy size={14} /> {quiz.questions.length * quiz.points_per_question} pts max</span>
              </div>
              <button className={clsx(
                'mt-4 w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2',
                isJunior ? 'gradient-kids text-white' : 'bg-sky-500 hover:bg-sky-600 text-white'
              )}>
                Start Quiz <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Past Performance */}
        <Card>
          <h3 className="font-bold text-slate-800 mb-4">My Quiz Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-sky-50 rounded-xl">
              <p className="text-3xl font-bold text-sky-600">{MOCK_STUDENT_STATS.total_points}</p>
              <p className="text-sm text-slate-500 mt-1">Total Points</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-xl">
              <p className="text-3xl font-bold text-amber-600">{MOCK_STUDENT_STATS.current_streak}</p>
              <p className="text-sm text-slate-500 mt-1">Current Streak</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <p className="text-3xl font-bold text-emerald-600">{MOCK_STUDENT_STATS.quiz_score_avg}%</p>
              <p className="text-sm text-slate-500 mt-1">Avg. Score</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (state === 'playing') {
    const q = selectedQuiz.questions[currentQ];
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Progress Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-600">Question {currentQ + 1}/{selectedQuiz.questions.length}</span>
          </div>
          <div className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm',
            timeLeft <= 30 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-700'
          )}>
            <Clock size={16} />
            {mins}:{secs.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Progress */}
        <div className="h-2 bg-slate-200 rounded-full">
          <motion.div
            className="h-full bg-sky-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ) / selectedQuiz.questions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="!p-8">
              <h2 className={clsx('font-bold text-slate-800 mb-8', isJunior ? 'text-2xl' : 'text-xl')}>
                {q.question}
              </h2>
              <div className="space-y-3">
                {q.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={selected === null ? { scale: 1.02 } : {}}
                    whileTap={selected === null ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(i)}
                    className={clsx(
                      'w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3',
                      selected === null
                        ? 'border-slate-200 hover:border-sky-400 hover:bg-sky-50'
                        : selected === i
                          ? i === q.correct
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-red-500 bg-red-50 text-red-700'
                          : i === q.correct
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-slate-200 opacity-50',
                      isJunior ? 'text-base' : 'text-sm'
                    )}
                  >
                    <span className={clsx(
                      'w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm flex-shrink-0',
                      selected === null ? 'border-slate-300' :
                      selected === i ? i === q.correct ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-red-500 bg-red-500 text-white'
                      : i === q.correct ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300'
                    )}>
                      {selected !== null && i === q.correct ? <CheckCircle size={16} /> :
                       selected === i && i !== q.correct ? <XCircle size={16} /> :
                       String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-medium">{opt}</span>
                  </motion.button>
                ))}
              </div>
              {selected !== null && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={nextQuestion}
                  className="mt-6 w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {currentQ + 1 >= selectedQuiz.questions.length ? 'See Results' : 'Next Question'} <ChevronRight size={18} />
                </motion.button>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Result
  return (
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', bounce: 0.3 }}
      >
        <Card className="text-center !p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
            className="text-8xl mb-4"
          >
            {pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '💪'}
          </motion.div>
          <h2 className="text-3xl font-bold text-slate-800">Quiz Complete!</h2>
          <div className="mt-6 p-6 bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl">
            <p className="text-6xl font-bold text-sky-600">{pct}%</p>
            <p className="text-slate-600 mt-2">{correctCount}/{selectedQuiz.questions.length} correct answers</p>
            <p className="text-xl font-bold text-emerald-600 mt-2">+{score} points earned!</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-lg font-bold text-slate-800">{correctCount}</p>
              <p className="text-xs text-slate-500">Correct</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-lg font-bold text-slate-800">{selectedQuiz.questions.length - correctCount}</p>
              <p className="text-xs text-slate-500">Wrong</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-lg font-bold text-amber-600">{MOCK_STUDENT_STATS.current_streak}</p>
              <p className="text-xs text-slate-500">Day Streak 🔥</p>
            </div>
          </div>
          {pct >= 80 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl"
            >
              <p className="text-sm font-semibold text-amber-700">🎉 Great job! You've earned a new badge!</p>
            </motion.div>
          )}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => startQuiz(selectedQuiz)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors text-sm"
            >
              <RotateCcw size={16} /> Retry
            </button>
            <button
              onClick={() => setQuizState('select')}
              className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold transition-colors text-sm"
            >
              More Quizzes
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
