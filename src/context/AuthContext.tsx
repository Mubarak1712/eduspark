import { createContext, useContext, useState, type ReactNode } from 'react';
import { MOCK_USERS } from '../lib/mockData';

type Role = 'student' | 'teacher' | 'parent' | 'admin';

interface UserProfile {
  id: string;
  auth_user_id: string;
  role: Role;
  full_name: string;
  email?: string;
  avatar_url?: string;
  roll_number?: string;
  class_id?: string;
  student_id?: string;
  grade?: number;
  section?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: (identifier: string, password: string, role?: Role) => Promise<{ error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading] = useState(false);

  const signIn = async (identifier: string, password: string, role?: Role): Promise<{ error?: string }> => {
    // Demo auth: check against mock credentials
    const id = identifier.toLowerCase().trim();

    if (id === 'admin@school.edu' || (role === 'admin' && id === 'admin@school.edu')) {
      setUser(MOCK_USERS.admin as UserProfile);
      return {};
    }
    if (id === 'teacher@school.edu' || (role === 'teacher' && id === 'teacher@school.edu')) {
      setUser(MOCK_USERS.teacher as UserProfile);
      return {};
    }
    if (id === 'stu001' || id === 'stu002') {
      if (role === 'parent') {
        setUser(MOCK_USERS.parent as UserProfile);
      } else {
        const grade = id === 'stu001' ? 10 : 4;
        setUser(grade >= 6 ? MOCK_USERS.student as UserProfile : MOCK_USERS.juniorStudent as UserProfile);
      }
      return {};
    }

    // Generic demo login
    if (password.length >= 6) {
      if (role === 'admin') setUser(MOCK_USERS.admin as UserProfile);
      else if (role === 'teacher') setUser(MOCK_USERS.teacher as UserProfile);
      else if (role === 'parent') setUser(MOCK_USERS.parent as UserProfile);
      else setUser(MOCK_USERS.student as UserProfile);
      return {};
    }

    return { error: 'Invalid credentials. Try demo credentials shown below.' };
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
