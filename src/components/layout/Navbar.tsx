import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { School, Menu, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleNavigate = (href: string) => {
    setMobileOpen(false);
    navigate(href);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/15 backdrop-blur-xl shadow-sm shadow-slate-900/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:py-4">
        <button
          onClick={() => handleNavigate('/')}
          className="flex items-center gap-3 rounded-2xl py-2 px-3 transition-all duration-200 hover:bg-slate-100/80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/20">
            <School size={18} />
          </div>
          <div className="text-left">
            <p className="text-base font-bold text-slate-900">EduSpark</p>
            <p className="text-xs text-slate-500">Smart School</p>
          </div>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavigate(link.href)}
              className={clsx(
                'relative rounded-full px-3 py-2 text-sm font-medium transition duration-200',
                isActive(link.href)
                  ? 'text-sky-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="navbar-underline"
                  className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-10 rounded-full bg-sky-500"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => handleNavigate('/login')}
            className="rounded-full px-5 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:text-sky-600 hover:bg-slate-100"
          >
            Sign In
          </button>
          <button
            onClick={() => handleNavigate('/login')}
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-200 hover:bg-sky-600"
          >
            Get Started
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-700 shadow-sm shadow-slate-900/5 transition duration-200 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl"
        >
          <div className="space-y-3 px-4 py-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigate(link.href)}
                className={clsx(
                  'w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition duration-200',
                  isActive(link.href)
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => handleNavigate('/login')}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition duration-200 hover:bg-slate-100"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavigate('/login')}
                className="rounded-2xl bg-sky-500 px-4 py-3 text-left text-sm font-semibold text-white transition duration-200 hover:bg-sky-600"
              >
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
