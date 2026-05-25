import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, User, CheckCircle2 } from 'lucide-react';

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.name && values.email && values.message) {
      setSubmitted(true);
      setValues({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-900/10 backdrop-blur-xl"
    >
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Get in touch</p>
        <h2 className="mt-4 text-3xl font-bold text-slate-900">Contact our team</h2>
        <p className="mt-3 text-slate-600">Send us a note and we’ll respond within 24 hours.</p>
      </div>

      {submitted ? (
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Message received</h3>
          <p className="mt-2 text-slate-600">Thanks for reaching out. Our team will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <div className="mt-2 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
              <User size={18} className="text-sky-500" />
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full border-0 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <div className="mt-2 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Mail size={18} className="text-sky-500" />
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border-0 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Message</span>
            <div className="mt-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-start gap-3">
                <MessageSquare size={18} className="mt-2 text-sky-500" />
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Tell us about your school or request"
                  rows={6}
                  className="w-full resize-none border-0 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  required
                />
              </div>
            </div>
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-600"
          >
            Send Message
          </button>
        </form>
      )}
    </motion.div>
  );
}
