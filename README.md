# Media Logger Admin Dashboard

A comprehensive admin dashboard for managing Movies, TV Shows, Games, and Users in a media logging application, built with Next.js 15 and TypeScript.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![React](https://img.shields.io/badge/React-19.1.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Build Status](https://img.shields.io/badge/build-passing-green)

## 🌟 Overview

The Media Logger Admin Dashboard is a modern, responsive web application designed to provide administrators with a comprehensive interface to manage various media types and users. Built with cutting-edge React stack including Next.js 15, React 19, and TypeScript for type safety and scalability.

**Live Demo:** [media-logger-admin-dashboard.vercel.app](https://media-logger-admin-dashboard.vercel.app)

## ✨ Features

### Core Functionality

- 🔐 **User Authentication** - Complete auth flow with JWT token management and protected routes
- 📊 **Interactive Dashboard** - Statistical cards and charts (bar/pie) with Recharts integration
- 🎬 **Media Management** - Comprehensive CRUD operations for Movies, TV Shows, and Games
- 👥 **User Management** - Admin controls for user roles and permissions
- ⚙️ **Settings Panel** - Configurable app settings and preferences

### Recent Additions (October 2025)

- 📺 **TV Show Details** - Season and episode management with accordion UI
- 🎮 **Game Management** - Enhanced game CRUD with bulk operations
- 📊 **Advanced Analytics** - Improved dashboard charts and statistics
- 🔍 **Enhanced Search** - Multi-filter dropdown with advanced search capabilities
- 📱 **Mobile Optimization** - Responsive design improvements for mobile devices

### Technical Features

- 🎨 **Modern UI/UX** - Custom design system using Tailwind CSS and shadcn/ui
- 📱 **Responsive Design** - Mobile-first approach with sidebar navigation
- ⚡ **Performance** - Optimized with Turbopack and Next.js 15 features
- 🛡️ **Type Safety** - Comprehensive TypeScript implementation
- 🗄️ **State Management** - Zustand for lightweight, efficient state handling
- 🌐 **API Integration** - Ready for backend integration with service layer architecture

## 🚀 Tech Stack

### Core Framework

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Static type checking

### State & Data Management

- **[Zustand 5](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[TanStack Query 5](https://tanstack.com/query)** - Data fetching and caching
- **[Axios 1.11](https://axios-http.com/)** - HTTP client for API calls

### UI & Styling

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library built on Radix UI
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Forms & Validation

- **[React Hook Form 7](https://react-hook-form.com/)** - Performant forms library
- **[Zod 4](https://zod.dev/)** - TypeScript-first schema validation
- **[@hookform/resolvers](https://react-hook-form.com/get-started#SchemaValidation)** - Schema validation integration

### Data Visualization

- **[Recharts 2](https://recharts.org/)** - React charting library
- **[TanStack Table 8](https://tanstack.com/table)** - Headless table building

### Development Tools

- **[Vitest 3](https://vitest.dev/)** - Testing framework
- **[ESLint 9](https://eslint.org/)** - JavaScript/TypeScript linting
- **[Prettier 3](https://prettier.io/)** - Code formatting
- **[@vercel/speed-insights](https://vercel.com/docs/speed-insights)** - Performance monitoring

### Additional Libraries

- **[date-fns 4](https://date-fns.org/)** - Modern date utility library
- **[js-cookie 3](https://github.com/js-cookie/js-cookie)** - Cookie handling
- **[sonner 2](https://sonner.emilkowal.ski/)** - Toast notifications
- **[react-day-picker 9](https://daypicker.dev/)** - Date picker component
- **[react-youtube 10](https://github.com/tjallingt/react-youtube)** - YouTube player integration

## 📦 Installation

### Prerequisites

- **Node.js** 18.17 or higher
- **npm** or **yarn** package manager

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Shruthikshetty/media-logger-admin-dashboard.git
cd media-logger-admin-dashboard
```

2. **Install dependencies**

```bash
# Using npm
npm install

# Using yarn
yarn install
```

3. **Environment Configuration**

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
# Add your API endpoints, authentication secrets, etc.
```

4. **Run the development server**

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```text
media-logger-admin-dashboard/
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (tabs)/            # Protected route groups
│   │   │   ├── games/         # Game management pages
│   │   │   ├── movies/        # Movie management pages
│   │   │   ├── tv-shows/      # TV show management pages
│   │   │   ├── users/         # User management pages
│   │   │   └── settings/      # Settings pages
│   │   ├── login/             # Authentication pages
│   │   ├── profile/           # User profile pages
│   │   └── AuthGuard.tsx      # Route protection component
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── dashboard/        # Dashboard-specific components
│   │   ├── games/           # Game-related components
│   │   ├── movies/          # Movie-related components
│   │   ├── tv-show/         # TV show-related components
│   │   └── users/           # User management components
│   ├── constants/            # Application constants
│   │   ├── colors.constants.ts
│   │   ├── config.constants.ts
│   │   ├── endpoints.constants.ts
│   │   └── query-key.constants.ts
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── schema/              # Zod validation schemas
│   ├── services/            # API service functions
│   ├── state-management/    # Zustand stores
│   ├── types/              # TypeScript type definitions
│   └── css-modules/        # CSS modules for styling
├── docs/                   # Documentation files
├── .env.example           # Environment variables template
├── components.json        # shadcn/ui configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vitest.config.ts       # Vitest test configuration
└── package.json           # Project dependencies and scripts
```

## 🔐 Authentication Flow

### Login Process

1. **Login Page** - Users authenticate with email and password
2. **Token Management** - JWT tokens stored securely in HTTP-only cookies
3. **State Management** - User session managed via Zustand store
4. **Route Protection** - AuthGuard component protects authenticated routes
5. **Automatic Redirect** - Unauthenticated users redirected to login

### Security Features

- HTTP-only cookies for token storage
- Automatic token refresh handling
- Role-based access control (Admin/User)
- Protected route system

## 📊 Dashboard Overview

### Statistics Cards

- **Movies** - Total count and recent additions
- **TV Shows** - Show count with season/episode tracking
- **Games** - Game library statistics
- **Users** - User management metrics

### Interactive Charts

- **Bar Charts** - Media additions over time
- **Pie Charts** - Distribution of media types
- **Responsive Design** - Mobile-optimized chart layouts

### Navigation

- **Sidebar Navigation** - Quick access to all sections
- **Mobile Toggle** - Collapsible sidebar for mobile devices
- **Breadcrumb Navigation** - Clear page hierarchy

## 🎬 Media Management Features

### Movies

- **CRUD Operations** - Add, edit, delete, and view movies
- **Bulk Operations** - Import movies via JSON
- **Advanced Filtering** - Genre, year, rating filters
- **Search Functionality** - Quick movie lookup
- **Details View** - Comprehensive movie information

### TV Shows

- **Season Management** - Track seasons and episodes
- **Episode Details** - Individual episode information
- **Accordion UI** - Collapsible season/episode views
- **Trailer Integration** - YouTube trailer embedding
- **Advanced Metadata** - Cast, crew, and production details

### Games

- **Game Library** - Complete game management system
- **Bulk Import** - JSON-based bulk game addition
- **Platform Tracking** - Multi-platform game support
- **Rating System** - User and critic ratings

## 👥 User Management

### User Operations

- **User CRUD** - Complete user management
- **Role Assignment** - Admin/User role management
- **Profile Management** - User profile editing
- **Access Control** - Permission-based feature access

### Admin Features

- **User Analytics** - User activity tracking
- **Role Management** - Dynamic role assignment
- **Bulk Operations** - Batch user operations

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Building
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting

# Testing
npm run test         # Run Vitest tests
```

## 🔧 Configuration Files

### Environment Variables (.env)

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=your_api_base_url

```

### Next.js Configuration (next.config.ts)

- Turbopack for faster development builds
- Image optimization settings
- API route configurations

### Tailwind Configuration

- Custom color scheme
- Component-specific utilities
- Responsive breakpoints

## 🚀 Recent Updates (October 2025)

### Version 0.1.0 Highlights

- **Enhanced TV Show Management** - Complete season/episode tracking system
- **Advanced UI Components** - New accordion components for nested data
- **Improved Mobile Experience** - Better responsive design implementation
- **Performance Optimizations** - Faster load times and smoother interactions
- **Bug Fixes** - Resolved authentication and form validation issues

## 🔮 Upcoming Features

### Short Term (Next Release)

- **Enhanced CRUD Operations** - Complete media management workflows
- **Advanced Search** - Multimedia global search integration for powerful search

### Long Term Roadmap

- **Modification history** - maintain history of all CRUD operations
- **Notification** - Add notification system

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- **TypeScript** - All code must be properly typed
- **ESLint** - Follow the configured linting rules
- **Prettier** - Use consistent code formatting
- **Testing** - Add tests for new features
- **Documentation** - Update README for new features / add doc string where ever required

### Pull Request Guidelines

- Provide clear description of changes
- Ensure all tests pass
- Update documentation as needed

## 📈 Performance

### Metrics

- **Lighthouse Score** - 90+ performance score
- **Bundle Size** - Optimized for fast loading
- **Core Web Vitals** - Excellent user experience metrics

### Optimizations

- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - Next.js Image component usage
- **Caching** - TanStack Query for efficient data caching
- **Lazy Loading** - Components loaded on demand

## 🐛 Known Issues

### Current Limitations

- Some Backend API integration is in development
- Some advanced filtering features are pending
- Mobile experience can be further improved

### Bug Reports

If you encounter any issues, please [open an issue](https://github.com/Shruthikshetty/media-logger-admin-dashboard/issues) with:

- Detailed description
- Steps to reproduce
- Screenshots (if applicable)
- Browser/device information

## 📝 License

This project is currently under development and does not have a license assigned.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **shadcn** - For the beautiful component library
- **Vercel** - For hosting and deployment platform
- **Radix UI** - For accessible component primitives
- **TanStack** - For excellent data fetching and table libraries

## 📞 Support

### Documentation

- **Component Library** - [shadcn/ui docs](https://ui.shadcn.com)
- **Next.js** - [Next.js documentation](https://nextjs.org/docs)
- **React Query** - [TanStack Query docs](https://tanstack.com/query)

### Community

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - Community discussions and questions

---

**Built with ❤️ by [Shruthik Shetty](https://github.com/Shruthikshetty)**

### Last Updated

October 2025
