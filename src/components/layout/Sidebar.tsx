import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { LayoutDashboard, BookOpen, Calendar, Bell, Circle as HelpCircle, Trophy, Star, Users, Settings, LogOut, ChevronLeft, ChevronRight, ClipboardList, Activity, Megaphone, GraduationCap, ChartBar as BarChart3, School } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = {
  student: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/attendance', icon: Calendar, label: 'Attendance' },
    { to: '/homework', icon: BookOpen, label: 'Homework' },
    { to: '/timetable', icon: ClipboardList, label: 'Timetable' },
    { to: '/quiz', icon: HelpCircle, label: 'Daily Quiz' },
    { to: '/activities', icon: Activity, label: 'Activities' },
    { to: '/rewards', icon: Trophy, label: 'Rewards' },
    { to: '/leaderboard', icon: Star, label: 'Leaderboard' },
    { to: '/notices', icon: Megaphone, label: 'Notices' },
  ],
  parent: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/attendance', icon: Calendar, label: "Child's Attendance" },
    { to: '/homework', icon: BookOpen, label: 'Homework' },
    { to: '/timetable', icon: ClipboardList, label: 'Timetable' },
    { to: '/notices', icon: Megaphone, label: 'Notices' },
    { to: '/activities', icon: Activity, label: 'Activities' },
    { to: '/rewards', icon: Trophy, label: 'Achievements' },
  ],
  teacher: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/attendance', icon: Calendar, label: 'Attendance' },
    { to: '/homework', icon: BookOpen, label: 'Homework' },
    { to: '/timetable', icon: ClipboardList, label: 'Timetable' },
    { to: '/students', icon: Users, label: 'Students' },
    { to: '/activities', icon: Activity, label: 'Activities' },
    { to: '/notices', icon: Megaphone, label: 'Notices' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  ],
  admin: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/students', icon: GraduationCap, label: 'Students' },
    { to: '/teachers', icon: Users, label: 'Teachers' },
    { to: '/attendance', icon: Calendar, label: 'Attendance' },
    { to: '/homework', icon: BookOpen, label: 'Homework' },
    { to: '/quiz', icon: HelpCircle, label: 'Quizzes' },
    { to: '/activities', icon: Activity, label: 'Activities' },
    { to: '/events', icon: Star, label: 'Events' },
    { to: '/notices', icon: Megaphone, label: 'Notices' },
    { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ],
};

const roleColors = {
  student: 'from-sky-600 to-cyan-500',
  parent: 'from-emerald-600 to-teal-500',
  teacher: 'from-orange-500 to-amber-500',
  admin: 'from-slate-700 to-slate-600',
};

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, signOut } = useAuth();
  const role = user?.role || 'student';
  const items = navItems[role] || navItems.student;
  const gradientClass = roleColors[role];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-white border-r border-slate-100 shadow-lg z-40 flex flex-col overflow-hidden"
    >
      {/* Logo */}
      <div className={clsx('flex items-center gap-3 p-4 bg-gradient-to-r text-white', gradientClass)}>
        <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <School size={20} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="font-bold text-sm leading-tight">EduSpark</p>
              <p className="text-xs text-white/70">Smart School</p>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={onToggle}
          className="ml-auto w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* User info */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 py-3 border-b border-slate-100 bg-slate-50"
        >
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60'}
              alt={user?.full_name}
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-800 truncate">{user?.full_name}</p>
              <p className="text-xs text-slate-500 capitalize">{role}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-hide">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all duration-200 group',
              isActive
                ? `bg-gradient-to-r ${gradientClass} text-white shadow-sm`
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            )}
          >
            <item.icon size={18} className="flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium truncate"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={signOut}
          className={clsx(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors',
          )}
        >
          <LogOut size={18} className="flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
