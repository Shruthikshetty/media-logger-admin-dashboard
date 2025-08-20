'use client';
import { Film, Gamepad2, Tv, Users } from 'lucide-react';
import DashboardCharts from '~/components/dashboard-charts';
import ManageCard from '~/components/manage-card';
import StatCard from '~/components/stat-card';
import TitleSubtitle from '~/components/title-subtitle';
import { MANAGE_CARDS_DASHBOARD } from '~/constants/screen.constants';
import { useDashboardAnalyticsData } from '~/services/analytics-service';

/**
 * This is the default tab that opens up when the app is opened
 * This is the dashboard containing all media concise information
 */
export default function Home() {
  //fetch dashboard analytics data
  const { data } = useDashboardAnalyticsData();
  const analyticsData = data?.data;

  //@TODO implement logic to fetch media stats from api
  const totalMediaStat = [
    {
      title: 'Total movies',
      value: analyticsData?.totalMovies,
      changePercent:
        analyticsData?.percentageChangeFromLastMonth?.movies.percentage,
      changeDirection:
        analyticsData?.percentageChangeFromLastMonth?.movies.change,
      Icon: Film,
      iconClassName: 'text-blue-500',
    },
    {
      title: 'Total TV Shows',
      value: analyticsData?.totalTvShows,
      changePercent:
        analyticsData?.percentageChangeFromLastMonth?.tvShows.percentage,
      changeDirection:
        analyticsData?.percentageChangeFromLastMonth?.tvShows.change,
      Icon: Tv,
      iconClassName: 'text-purple-500',
    },
    {
      title: 'Total Games',
      value: analyticsData?.totalGames,
      changePercent:
        analyticsData?.percentageChangeFromLastMonth?.games.percentage,
      changeDirection:
        analyticsData?.percentageChangeFromLastMonth?.games.change,
      Icon: Gamepad2,
      iconClassName: 'text-green-500',
    },
    {
      title: 'Total Users',
      value: analyticsData?.totalUsers,
      changePercent:
        analyticsData?.percentageChangeFromLastMonth?.users.percentage,
      changeDirection:
        analyticsData?.percentageChangeFromLastMonth?.users.change,
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
