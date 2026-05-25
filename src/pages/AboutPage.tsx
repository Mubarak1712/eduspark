import { motion } from 'framer-motion';
import { Brain, Target, Zap, Users, CircleCheck as CircleCheck, Award } from 'lucide-react';

const reasons = [
  {
    title: 'Built for modern schools',
    description: 'A unified platform for classroom insights, attendance tracking, and parental engagement.',
    icon: Users,
  },
  {
    title: 'AI-driven learning',
    description: 'Smart recommendations help teachers personalize lessons and students stay motivated.',
    icon: Brain,
  },
  {
    title: 'Data you can trust',
    description: 'Actionable analytics that streamline decisions across operations and instruction.',
    icon: Award,
  },
];

const benefits = [
  { icon: Brain, title: 'AI-Powered Learning', desc: 'Smart personalization adapts to each student\'s learning style and pace' },
  { icon: Target, title: 'Goal Tracking', desc: 'Clear objectives and real-time progress monitoring for students' },
  { icon: Zap, title: 'Instant Feedback', desc: 'Immediate results and insights help students improve faster' },
  { icon: Users, title: 'Community Building', desc: 'Foster collaboration and healthy competition among peers' },
  { icon: Award, title: 'Achievement Recognition', desc: 'Motivate with badges, streaks, and leaderboard rankings' },
  { icon: CircleCheck, title: 'Simplified Admin', desc: 'Streamlined management tools for teachers and school administrators' },
];

const team = [
  { name: 'Sarah Chen', role: 'Founder & CEO', emoji: '👩‍💼' },
  { name: 'Marcus Johnson', role: 'Chief Technology Officer', emoji: '👨‍💻' },
  { name: 'Dr. Priya Sharma', role: 'Education Director', emoji: '👨‍🎓' },
  { name: 'Alex Rivera', role: 'Product Lead', emoji: '👩‍🏫' },
];

const stats = [
  { label: 'Schools onboarded', value: '1,200+' },
  { label: 'Students supported', value: '10,000+' },
  { label: 'Average satisfaction', value: '4.9/5' },
  { label: 'Integration-ready', value: '99% compatibility' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 pt-24 pb-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-sky-500 blur-3xl" />
          <div className="absolute right-10 top-10 h-64 w-64 rounded-full bg-cyan-400 blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-slate-800/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-200">
              Empowering schools with AI-first learning
            </span>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              EduSpark brings smarter learning, stronger collaboration, and better outcomes.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-200">
              We design education technology for teachers, students, and parents who want fast adoption, simple workflows, and measurable progress.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-14 grid gap-6 lg:grid-cols-3"
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 text-white shadow-2xl shadow-slate-900/20 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-200">Mission</p>
              <h2 className="mt-5 text-2xl font-semibold">Create equitable digital classrooms.</h2>
              <p className="mt-4 text-slate-200 leading-relaxed">
                We help every student and educator access tools that reduce friction and increase engagement.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 text-white shadow-2xl shadow-slate-900/20 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-200">Vision</p>
              <h2 className="mt-5 text-2xl font-semibold">Make learning intuitive and impactful.</h2>
              <p className="mt-4 text-slate-200 leading-relaxed">
                Our platform blends AI, analytics, and human-centered design to transform school operations for the digital era.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 text-white shadow-2xl shadow-slate-900/20 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-200">Why EduSpark</p>
              <h2 className="mt-5 text-2xl font-semibold">Trusted by modern schools.</h2>
              <p className="mt-4 text-slate-200 leading-relaxed">
                Fast setup, secure workflows, and thoughtful features that fit today’s classrooms without adding complexity.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Why Choose EduSpark</p>
              <h2 className="mt-4 text-4xl font-bold text-slate-900">A platform designed for fast adoption and real classroom wins.</h2>
              <p className="mt-6 text-slate-600 leading-8">
                EduSpark combines powerful analytics, intuitive workflows, and AI-driven support to help schools move from manual tasks to modern operations.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {reasons.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-sky-500">AI-powered education</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-900">Accelerate learning with intelligent tools.</h2>
            <p className="mt-4 text-slate-500 leading-8 max-w-2xl mx-auto">
              From real-time feedback to personalized learning paths, EduSpark makes it easy to deliver the experiences students expect today.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-100 text-sky-600">
                  <benefit.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{benefit.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Team & innovation</p>
              <h2 className="mt-4 text-4xl font-bold">People behind the product.</h2>
              <p className="mt-4 text-slate-300 leading-8">
                Our team blends education expertise with product excellence to deliver tools that scale across classrooms, districts, and communities.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
                >
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-800 text-3xl">
                    {member.emoji}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="mt-2 text-slate-300">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Impact in numbers</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-900">Trusted by schools around the world.</h2>
            <p className="mt-4 text-slate-500 leading-8 max-w-2xl mx-auto">
              The metrics below show the reach and satisfaction of teams using EduSpark across classrooms and districts.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm"
              >
                <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
                <p className="mt-3 text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Ready to get started?</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-900">Explore EduSpark for your school today.</h2>
            <p className="mt-4 text-slate-500 leading-8">
              Connect with our team and see how smart school automation can help your educators focus on teaching while the platform handles the rest.
            </p>
            <button
              onClick={() => window.location.href = '/login'}
              className="mt-10 inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Request a Demo
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
