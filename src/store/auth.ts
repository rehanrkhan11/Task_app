import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: { id: number; username: string } | null;
  login: (token: string, user?: { id: number; username: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  
  login: (token: string, user?: { id: number; username: string }) => {
    localStorage.setItem('token', token);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ token, user: user || null });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  }
}))
