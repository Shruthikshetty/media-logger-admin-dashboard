'use client';
import { Film, Gamepad2, Tv, Users } from 'lucide-react';
import DashboardCharts from '~/components/dashboard-charts';
import ManageCard from '~/components/manage-card';
import StatCard from '~/components/stat-card';
import TitleSubtitle from '~/components/title-subtitle';
import { MANAGE_CARDS_DASHBOARD } from '~/constants/screen.constants';

/**
 * This is the default tab that opens up when the app is opened
 * This is the dashboard containing all media concise information
 */
export default function Home() {
  //@TODO implement logic to fetch media stats from api
  const totalMediaStat = [
    {
      title: 'Total movies',
      value: 1247,
      change: 8,
      Icon: Film,
      iconClassName: 'text-blue-500',
    },
    {
      title: 'Total TV Shows',
      value: 583,
      change: 5,
      Icon: Tv,
      iconClassName: 'text-purple-500',
    },
    {
      title: 'Total Games',
      value: 892,
      change: 3,
      Icon: Gamepad2,
      iconClassName: 'text-green-500',
    },
    {
      title: 'Total Users',
      value: 2847,
      change: 3,
      Icon: Users,
      iconClassName: 'text-orange-500',
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-5">
      <TitleSubtitle
        title="Media Management Dashboard"
        subtitle="Manage your media library efficiently"
      />
      {/* total media count cards */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-4">
        {totalMediaStat.map((stat, index) => {
          return <StatCard key={index} {...stat} />;
        })}
      </div>
      {/* charts  */}
      <DashboardCharts />
      {/* navigation cards */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
        {MANAGE_CARDS_DASHBOARD.map((card, index) => (
          <ManageCard
            key={index}
            title={card.title}
            description={card.description}
            Icon={card.Icon}
            iconClassName={card.style}
            href={card.href}
          />
        ))}
      </div>
    </div>
  );
}
