import {
  Bell,
  Crown,
  Film,
  Gamepad2,
  LayoutDashboard,
  LucideIcon,
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
export const ProfileMenuItems = [
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

// user roles
export const UserRoles = {
  admin: 'admin',
  user: 'user',
};

// role color mapping
export const ROLE_COLOR_MAPPING: Record<
  string,
  'destructive' | 'secondary' | 'default' | 'outline'
> = {
  admin: 'destructive',
  user: 'secondary',
};

// role icon mapping
export const ROLE_ICON_MAPPING: Record<string, LucideIcon> = {
  admin: Crown,
  user: User,
};

// Code area example placeholder
export const CODE_AREA_PLACEHOLDER_EXAMPLE = `[
\t{
\t\t"title": "The Shawshank Redemption",
\t\t"description": "Two imprisoned men bond over a number of years..."
\t}
]`;

// bulk add games placeholder
export const BULK_ADD_GAMES_PLACEHOLDER_EXAMPLE = `[
  {
    "title": "God of War Ragnarök",
    "description": "Embark on an epic journey across the Nine Realms.",
    "averageRating": 9.5,
    "genre": ["Action", "Adventure"],
    "releaseDate": "2022-11-09",
    "posterUrl": "https://example.com/poster.jpg",
    "backdropUrl": "https://example.com/backdrop.jpg",
    "status": "released",
    "platforms": ["PlayStation 5", "PlayStation 4"],
    "avgPlaytime": 25,
    "developer": "Santa Monica Studio",
    "ageRating": 18,
    "youtubeVideoId": "dIQGI36HxZE"
  }
]`;

// bulk add TV shows placeholder
export const BULK_ADD_TV_SHOWS_PLACEHOLDER_EXAMPLE = `[
  {
    "title": "Example TV Show",
    "description": "A gripping series following a small team as they uncover a conspiracy that spans continents.",
    "averageRating": 8.2,
    "genre": ["Action", "Drama", "Mystery"],
    "releaseDate": "2024-01-01T00:00:00.000Z",
    "cast": ["Alex Carter", "Jamie Lin"],
    "directors": ["Taylor Morgan"],
    "avgRunTime": 45,
    "languages": ["English"],
    "posterUrl": "https://example.com/tvshow/poster.jpg",
    "backdropUrl": "https://example.com/tvshow/backdrop.jpg",
    "isActive": true,
    "status": "released",
    "tags": ["Attack", "Sequel"],
    "totalSeasons": 1,
    "totalEpisodes": 1,
    "ageRating": 16,
    "youtubeVideoId": "a1b2c3d4e5",
    "tmdbId": "123456",
    "imdbId": "tt1234567",
    "seasons": [
      {
        "seasonNumber": 1,
        "title": "Season 1",
        "description": "The investigation begins, revealing the first clues.",
        "releaseDate": "2024-01-01T00:00:00.000Z",
        "noOfEpisodes": 1,
        "posterUrl": "https://example.com/tvshow/season1.jpg",
        "seasonRating": 8.2,
        "status": "ended",
        "youtubeVideoId": "f6g7h8i9j0",
        "averageRating": 8.2,
        "episodes": [
          {
            "_id": "1000001",
            "title": "Pilot",
            "description": "A mysterious incident draws the team together as they chase their first lead.",
            "episodeNumber": 1,
            "releaseDate": "2024-01-01T00:00:00.000Z",
            "runTime": 45,
            "stillUrl": "https://example.com/tvshow/season1/episode1_still.jpg",
            "averageRating": 8.0,
            "createdAt": "2025-10-21T14:39:00.000Z",
            "updatedAt": "2025-10-21T14:39:00.000Z"
          }
        ]
      }
    ]
  }
]`;
