import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { School, Eye, EyeOff, Loader as Loader2, ArrowLeft, User, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_CREDENTIALS } from '../lib/mockData';

type Role = 'student' | 'teacher' | 'parent' | 'admin';

const roleConfig = {
  student: { label: 'Student Login', hint: 'Use your Roll Number', gradient: 'from-sky-500 to-cyan-500', icon: '🎓', placeholder: 'Roll Number (e.g. STU001)' },
  parent: { label: 'Parent Login', hint: 'Use your child\'s Roll Number', gradient: 'from-emerald-500 to-teal-500', icon: '👨‍👩‍👧', placeholder: 'Child\'s Roll Number' },
  teacher: { label: 'Teacher Login', hint: 'Use your email address', gradient: 'from-orange-400 to-amber-500', icon: '📚', placeholder: 'Email Address' },
  admin: { label: 'Admin Login', hint: 'Use your admin email', gradient: 'from-slate-600 to-slate-700', icon: '🏫', placeholder: 'Admin Email' },
};

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') as Role) || 'student';
  const [role, setRole] = useState<Role>(initialRole);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const config = roleConfig[role];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await signIn(identifier, password, role);
    setLoading(false);
    if (err) { setError(err); return; }
    navigate('/dashboard');
  };

  const fillDemo = (cred: typeof DEMO_CREDENTIALS[0]) => {
    if (cred.role === 'Admin') { setRole('admin'); setIdentifier(cred.id); }
    else if (cred.role === 'Teacher') { setRole('teacher'); setIdentifier(cred.id); }
    else { setRole('student'); setIdentifier(cred.id); }
    setPassword(cred.password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className={`hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br ${config.gradient} p-12 text-white`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <School size={20} />
          </div>
          <span className="text-xl font-bold">EduSpark</span>
        </div>

        <motion.div
          key={role}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-8xl mb-6">{config.icon}</div>
          <h2 className="text-4xl font-bold leading-tight">{config.label}</h2>
          <p className="text-white/80 mt-3 text-lg">{config.hint}</p>

          <div className="mt-12 space-y-3">
            {['Real-time attendance tracking', 'AI-powered learning assistant', 'Gamified quiz streaks & rewards', 'Smart notifications & alerts'].map(f => (
              <div key={f} className="flex items-center gap-3 text-white/90">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-white/60 text-sm">© 2026 EduSpark Platform</div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back to home
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
          >
            {/* Role Tabs */}
            <div className="grid grid-cols-4 gap-1 bg-slate-100 rounded-xl p-1 mb-8">
              {(['student', 'parent', 'teacher', 'admin'] as Role[]).map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all capitalize ${
                    role === r ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <h1 className="text-2xl font-bold text-slate-800 mb-1">Welcome Back</h1>
            <p className="text-slate-500 text-sm mb-6">{config.hint}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{config.placeholder}</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder={config.placeholder}
                    className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-10 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                    required
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all bg-gradient-to-r ${config.gradient} hover:opacity-90 shadow-sm disabled:opacity-60 flex items-center justify-center gap-2`}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Quick Demo Login</p>
              <div className="space-y-2">
                {DEMO_CREDENTIALS.map(cred => (
                  <button
                    key={cred.role}
                    onClick={() => fillDemo(cred)}
                    className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-left"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-700">{cred.label}</p>
                      <p className="text-xs text-slate-400">ID: {cred.id} | Pass: {cred.password}</p>
                    </div>
                    <span className="text-xs text-sky-500 font-medium">Fill →</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
