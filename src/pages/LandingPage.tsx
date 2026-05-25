import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChartBar as BarChart3, Trophy, Zap, Brain, Bell, Users, BookOpen, Star, ArrowRight, CircleCheck as CircleCheck } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Learning Assistant', desc: 'Personalized study guidance powered by AI for every student', color: 'bg-sky-100 text-sky-600' },
  { icon: Trophy, title: 'Rewards & Badges', desc: 'Gamified learning with streaks, points, and achievement badges', color: 'bg-amber-100 text-amber-600' },
  { icon: BarChart3, title: 'Smart Analytics', desc: 'Real-time insights on attendance, performance, and engagement', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Bell, title: 'Smart Notifications', desc: 'Timely alerts for homework, exams, and important events', color: 'bg-rose-100 text-rose-600' },
  { icon: Users, title: 'Parent Connect', desc: 'Keep parents informed with live updates on their child\'s progress', color: 'bg-violet-100 text-violet-600' },
  { icon: BookOpen, title: 'Digital Homework', desc: 'Assign, submit, and track homework digitally with ease', color: 'bg-cyan-100 text-cyan-600' },
];

const stats = [
  { value: '10,000+', label: 'Students' },
  { value: '500+', label: 'Teachers' },
  { value: '98%', label: 'Attendance Accuracy' },
  { value: '4.9★', label: 'App Rating' },
];

const roles = [
  { role: 'Student', icon: '🎓', desc: 'Quizzes, homework, rewards & more', color: 'from-sky-500 to-cyan-500', path: '/login?role=student' },
  { role: 'Teacher', icon: '📚', desc: 'Manage classes, attendance & analytics', color: 'from-orange-400 to-amber-500', path: '/login?role=teacher' },
  { role: 'Parent', icon: '👨‍👩‍👧', desc: 'Track your child\'s progress', color: 'from-emerald-500 to-teal-500', path: '/login?role=parent' },
  { role: 'Admin', icon: '🏫', desc: 'Full school management dashboard', color: 'from-slate-600 to-slate-700', path: '/login?role=admin' },
];

const testimonials = [
  { name: 'Dr. Anita Patel', role: 'Principal, Riverside School', text: 'EduSpark transformed how we manage student engagement. Attendance is up 15% and teachers love the analytics.', emoji: '👩‍💼' },
  { name: 'James Wilson', role: 'Parent', text: 'Finally, a tool that keeps me informed about my child\'s progress. The interface is intuitive and updates are timely.', emoji: '👨‍💼' },
  { name: 'Ms. Lisa Chen', role: 'Teacher, Math Department', text: 'The quiz feature with immediate feedback helps students learn faster. I\'ve seen remarkable improvement in scores.', emoji: '👩‍🏫' },
];

const faqs = [
  { q: 'How do I get started with EduSpark?', a: 'Sign up for a free account, create your school profile, and invite students and teachers. You\'ll have full access to all features during the trial period.' },
  { q: 'Is my student data secure?', a: 'Yes, we use enterprise-grade encryption and comply with FERPA and GDPR. All data is stored securely on Supabase infrastructure.' },
  { q: 'Can I integrate with existing school systems?', a: 'We support integration with common school management systems. Contact our support team for specific requirements.' },
  { q: 'What support do you offer?', a: 'We provide 24/7 email support, live chat during business hours, and comprehensive documentation with video tutorials.' },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 border border-sky-400/30 rounded-full text-sky-300 text-sm font-medium mb-6">
              <Zap size={14} /> AI-Powered School Management Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            The Future of
            <br />
            <span className="text-gradient">School Learning</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Empower students, teachers, and parents with a unified platform featuring AI tutoring, gamified quizzes, live attendance, and smart analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-sky-500/30 hover:shadow-sky-400/40"
            >
              Start Demo <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/login?role=student')}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all backdrop-blur-sm"
            >
              Student Login
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* User Roles */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-sky-500 mb-3">Choose your path</p>
            <h2 className="text-4xl font-bold text-slate-800">Built for Every School Role</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">EduSpark is designed to support students, teachers, parents, and administrators with dedicated tools and workflows.</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r, i) => (
              <motion.button
                key={r.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(r.path)}
                className={`rounded-3xl p-6 text-left text-white shadow-lg shadow-slate-900/10 transition-all duration-300 ${r.color} hover:shadow-xl`}
              >
                <div className="text-4xl mb-4">{r.icon}</div>
                <h3 className="text-xl font-semibold">{r.role}</h3>
                <p className="mt-2 text-sm text-white/85">{r.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  Explore {r.role} <ArrowRight size={14} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-500 mb-4">Platform Features</p>
              <h2 className="text-4xl font-bold text-slate-900">Modern tools to keep your school on track</h2>
              <p className="mt-4 text-slate-500 max-w-xl">From AI-guided tutoring to digital homework and real-time analytics, EduSpark helps teams collaborate and students thrive.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition hover:-translate-y-1"
                >
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${f.color}`}>
                    <f.icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400 mb-4">Real Results</p>
            <h2 className="text-4xl font-bold">Numbers that show impact</h2>
            <p className="mt-4 text-slate-300 max-w-2xl mx-auto">EduSpark delivers measurable outcomes for classrooms, administration, and parents with clear engagement and performance tracking.</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-lg shadow-slate-950/20 backdrop-blur-xl"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-200 mb-5">
                  <CircleCheck size={20} className="text-sky-400" />
                </div>
                <p className="text-4xl font-bold tracking-tight text-white">{stat.value}</p>
                <p className="mt-3 text-sm text-slate-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-sky-500 mb-4">Trusted feedback</p>
            <h2 className="text-4xl font-bold text-slate-900">Communities love EduSpark</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Hear from leaders who are using EduSpark to transform their school operations and student outcomes.</p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-50 text-2xl">
                  {testimonial.emoji}
                </div>
                <p className="text-slate-600 italic">“{testimonial.text}”</p>
                <div className="mt-8">
                  <p className="text-base font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-sky-500 mb-4">Frequently asked</p>
            <h2 className="text-4xl font-bold text-slate-900">Your most common questions answered</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Everything you need to know before you get started with EduSpark.</p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm shadow-slate-900/5"
              >
                <h3 className="font-semibold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-sky-900 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300 mb-4">Start tomorrow today</p>
            <h2 className="text-4xl font-bold sm:text-5xl">Launch your school into a smarter future</h2>
            <p className="mt-4 text-slate-300">EduSpark brings AI-powered teaching, operations, and parent engagement into one polished experience for schools of all sizes.</p>
          </motion.div>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-2xl shadow-sky-500/30 transition hover:bg-sky-400"
          >
            <Star size={18} /> Start Free Demo
          </button>
        </div>
      </section>
    </div>
  );
}
