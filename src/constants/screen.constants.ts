import {
  Bell,
  Film,
  Gamepad2,
  LayoutDashboard,
  Settings,
  Tv,
  User,
  Users,
} from 'lucide-react';

// sidebar icons
export const NAVIGATION_ICONS = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Movies', href: '/movies', icon: Film },
  { title: 'TV Shows', href: '/tv-shows', icon: Tv },
  { title: 'Games', href: '/games', icon: Gamepad2 },
  { title: 'Users', href: '/users', icon: Users },
  { title: 'Settings', href: '/settings', icon: Settings },
];

//redirection manage cards shown in dashboard
export const MANAGE_CARDS_DASHBOARD = [
  {
    title: 'Manage Movies',
    description: 'Add , edit, and organize your movie collection',
    Icon: Film,
    style: 'text-blue-500',
    href: '/movies',
  },
  {
    title: 'Manage TV Shows',
    description: 'Control your TV series and episodes library',
    Icon: Tv,
    style: 'text-purple-500',
    href: '/tv-shows',
  },
  {
    title: 'Manage Games',
    description: 'Organize your gaming library and platforms',
    Icon: Gamepad2,
    style: 'text-green-500',
    href: '/games',
  },
];

// list of menu items in profile menu appears on click of profile icon
export const ProfileMeneItems = [
  {
    name: 'Profile',
    icon: User,
    href: '/profile',
  },
  {
    name: 'Notifications',
    icon: Bell,
    href: '/', //@TODO in progress
  },
];
