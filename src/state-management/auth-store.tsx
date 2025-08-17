import { create } from 'zustand';

//type for user
export interface User {
  _id: string;
  name: string;
  email: string;
  profileImg: string;
  role: string;
  xp: number;
  location: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

//type for auth store
type authStore = {
  token: string;
  setToken: (token: string) => void;
  user: User;
  setUser: (user: Partial<User>) => void;
};

//create the global store for auth
export const useAuthStore = create<authStore>((set) => ({
  token: '',
  setToken: (token: string) => set((prev) => ({ ...prev, token: token })),
  user: {
    _id: '',
    name: '',
    email: '',
    profileImg: '',
    role: '',
    xp: 0,
    location: '',
    bio: '',
    createdAt: '',
    updatedAt: '',
  },
  setUser: (user: Partial<User>) =>
    set((prev) => ({ ...prev, user: { ...prev.user, ...user } })),
}));
