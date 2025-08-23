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
  tokenSet: boolean;
  setToken: (token: string) => void;
  user: User;
  setUser: (user: Partial<User>) => void;
  resetAuth: () => void;
};

const initialState = {
  token: '',
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
};

//create the global store for auth , contains user details
export const useAuthStore = create<authStore>((set) => ({
  ...initialState,
  tokenSet: false,
  /**
   * set the token
   */
  setToken: (token: string) => set({ token: token, tokenSet: !!token }),
  /**
   * set user details
   */
  setUser: (user: Partial<User>) =>
    set((prev) => ({ user: { ...prev.user, ...user } })),
  /**
   * reset the store
   */
  resetAuth: () => set(initialState),
}));
