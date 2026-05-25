import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Notebook as Facebook, Battery as Twitter, Link as Linkedin } from 'lucide-react';
import { ContactCard } from '../components/ui/ContactCard';
import { ContactForm } from '../components/ui/ContactForm';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Our team is here to answer your questions and help you get started.',
    details: 'support@eduspark.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Schedule a demo or get help from our customer success team.',
    details: '+1 (555) 123-4567',
  },
  {
    icon: MapPin,
    title: 'Head Office',
    description: 'Visit us or send mail to our main education technology hub.',
    details: '123 Education Ave, Learning City',
  },
];

const socials = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:support@eduspark.com' },
];

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 pt-24 pb-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-10 top-16 h-72 w-72 rounded-full bg-sky-500 blur-3xl" />
          <div className="absolute right-10 top-10 h-64 w-64 rounded-full bg-cyan-400 blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-slate-800/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl"
          >
            <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-200">
              Reach out to EduSpark
            </span>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Let’s build smarter learning experiences together.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-200">
              Send us a message and our team will respond within one business day. We’re excited to help your school thrive with smarter tools.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Contact Info</p>
                <h2 className="mt-5 text-3xl font-bold text-slate-900">Start a conversation with our team.</h2>
                <p className="mt-4 text-slate-600 leading-8">
                  Whether you have a question about features, pricing, or implementation, EduSpark support is available to help every step of the way.
                </p>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <ContactCard
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      details={item.details}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Stay connected</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">Follow EduSpark on social media</h2>
            <p className="mt-4 text-slate-500">We share platform updates, school success stories, and product news regularly.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 min-w-[3.5rem] items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-5 text-slate-700 transition hover:border-sky-300 hover:bg-sky-500 hover:text-white"
              >
                <social.icon size={20} />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
