import { Notebook as Facebook, Battery as Twitter, Link as Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Dashboard', href: '/login' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">EduSpark</h3>
            <p className="text-sm text-slate-400">Transforming education with AI-powered school management</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-0.5 flex-shrink-0 text-sky-400" />
                <a href="mailto:support@eduspark.com" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                  support@eduspark.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} className="mt-0.5 flex-shrink-0 text-sky-400" />
                <span className="text-sm text-slate-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-sky-400" />
                <span className="text-sm text-slate-400">123 Education Ave, Learning City</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  title={social.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-colors text-slate-400 hover:text-white"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>&copy; {currentYear} EduSpark. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
