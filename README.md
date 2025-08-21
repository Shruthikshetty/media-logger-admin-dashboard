# Media Logger Admin Dashboard

An admin dashboard for managing Movies, TV Shows, Games, and Users in a media logging application built with Next.js 15 and TypeScript.

## Overview

The Media Logger Admin Dashboard is a modern, responsive web app designed to provide administrators with a comprehensive interface to manage various media types and users. It leverages a cutting-edge React stack including Next.js, Zustand for state management, TanStack Query for data fetching, and robust form validation with Zod and React Hook Form.

## Features

- User authentication with token management and protected routes
- Dashboard with statistical cards and interactive charts (bar and pie charts)
- Sidebar navigation providing access to Movies, TV Shows, Games, Users, and Settings sections
- Responsive layout with mobile support
- Custom design system using Tailwind CSS and Shadcn/UI components
- Form validation with real-time feedback
- State management using Zustand
- API service layer prepared for backend integration
- Comprehensive TypeScript support for safety and scalability

## Tech Stack

- **Next.js 15** – Server-side rendering and React framework
- **React 19** – Frontend UI
- **TypeScript** – Type safety
- **Zustand** – Lightweight state management
- **TanStack React Query** – Data fetching and caching
- **Axios** – HTTP client for API interaction
- **Tailwind CSS** – Styling framework
- **Shadcn/UI** – Component primitives based on Radix UI
- **Recharts** – Charting library
- **React Hook Form & Zod** – Forms with schema validation
- **Sonner** – Toast notifications

## Installation

Clone this repository:

```
git clone https://github.com/Shruthikshetty/media-logger-admin-dashboard.git
cd media-logger-admin-dashboard
```

Install dependencies with your package manager:

```
npm install

or
yarn install
```

Add env files

- take env variables from the env.example and create a .env file

## Running Locally

Start the development server:

```
npm run dev

or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the running app.

## Project Structure

- `/src/app` – Main Next.js routes and pages, including authentication and dashboard
- `/src/components` – Reusable UI components like sidebar, cards, and charts
- `/src/constants` – App-wide constants such as colors, API endpoints, and query keys
- `/src/services` – API service hooks for backend communication
- `/src/state-management` – Zustand stores for auth and UI state
- `/src/schema` – Zod validation schemas for forms
- `/src/lib` – Utility functions
- `/src/hooks` – Custom React hooks

## Authentication Flow

- Users authenticate via the login page using email and password
- Tokens are stored securely in cookies and Zustand state
- AuthGuard component protects pages, ensuring only logged-in users may access
- Redirects to login page if not authenticated

## Dashboard Overview

- Displays aggregated stats for movies, TV shows, games, and users
- Interactive charts provide visual insights into media additions and distributions
- Navigation cards link to management sections
- Mobile responsive with sidebar toggle

## Contributing

Contributions are welcome! Please fork the repo and submit pull requests.

## Upcoming Features

- Full CRUD operations for media and user management
- Backend API integration for live data
- Advanced search, filtering, and pagination
- Role-based access control
- Enhanced analytics and reporting

## License

This project is under development and currently does not have a license.
