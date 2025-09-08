import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppLayoutProviders from './layout-providers';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  fallback: ['sans-serif'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  title: 'Media Logger Admin Dashboard',
  description: 'Media Logger Admin Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-base-black text-base-white h-full w-full antialiased`}
      >
        {/* vercel dev insights tool */}
        <SpeedInsights />
        <AppLayoutProviders>{children}</AppLayoutProviders>
      </body>
    </html>
  );
}
