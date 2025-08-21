'use client';

import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart';
import {
  PieChartMediaDistributionConfig,
  WeeklyAdditionsConfig,
} from '~/constants/config.constants';
import { Card, CardHeader } from './ui/card';
import { AppColors } from '~/constants/colors.constants';
import { AnalyticsData } from '~/services/analytics-service';
import { Skeleton } from './ui/skeleton';
import TitleSubtitle from './title-subtitle';
const DashboardCharts = ({
  analyticsData,
}: {
  analyticsData?: AnalyticsData;
}) => {
  //data to display pie chart
  const mediaDistribution = [
    {
      name: 'Movies',
      value: analyticsData?.totalMovies || 0,
      fill: 'var(--color-movies)',
    },
    {
      name: 'TV Shows',
      value: analyticsData?.totalTvShows || 0,
      fill: 'var(--color-tvShows)',
    },
    {
      name: 'Games',
      value: analyticsData?.totalGames || 0,
      fill: 'var(--color-games)',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
      {!analyticsData ? (
        <>
          <Skeleton className="bg-ui-600 h-60 w-full rounded-xl md:h-100" />
          <Skeleton className="bg-ui-600 h-60 w-full rounded-xl md:h-100" />
        </>
      ) : (
        <>
          {/* Bar chart */}
          <Card className="bg-ui-600 from-base-black to-ui-900 border-ui-600 text-base-white gap-0.5 border bg-gradient-to-r">
            <CardHeader className="mb-3">
              <TitleSubtitle
                customStyles={{
                  title: 'text-2xl font-semibold',
                  subtitle: 'text-base',
                }}
                title="Weekly Content Additions"
                subtitle="New media added to the library this week"
              />
            </CardHeader>
            <ChartContainer
              config={WeeklyAdditionsConfig}
              className="min-h-[200px] w-full"
            >
              <BarChart data={analyticsData?.weeklyMediaCount ?? []}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={AppColors.ui[700]}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent className="bg-ui-800 text-base-white gap-2 p-2" />
                  }
                />
                <YAxis
                  tickMargin={10}
                  tick={true}
                  tickSize={5}
                  tickLine={true}
                  stroke={AppColors.ui[200]}
                />
                <XAxis
                  stroke={AppColors.ui[200]}
                  dataKey={'weekday'}
                  tickLine={true}
                  tickSize={5}
                  tickMargin={10}
                  tick={true}
                />
                <Bar dataKey={'movies'} fill="var(--color-movies)" radius={4} />
                <Bar
                  dataKey={'tvShows'}
                  fill="var(--color-tvShows)"
                  radius={4}
                ></Bar>
                <Bar dataKey={'games'} fill="var(--color-games)" radius={4} />
                <ChartLegend />
              </BarChart>
            </ChartContainer>
          </Card>

          {/* Pie chart */}
          <Card className="bg-ui-600 from-base-black to-ui-900 border-ui-600 text-base-white gap-0.5 border bg-gradient-to-r">
            <CardHeader className="mb-3">
              <TitleSubtitle
                customStyles={{
                  title: 'text-2xl font-semibold',
                  subtitle: 'text-base',
                }}
                title="Media Library Distribution"
                subtitle="Current breakdown of your media collection"
              />
            </CardHeader>
            <ChartContainer
              config={PieChartMediaDistributionConfig}
              className="min-h-[200px] w-full"
            >
              <PieChart>
                <Pie
                  data={mediaDistribution}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                ></Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="bg-ui-800 text-base-white gap-2 p-2"
                      hideLabel
                    />
                  }
                />
                <ChartLegend />
              </PieChart>
            </ChartContainer>
          </Card>
        </>
      )}
    </div>
  );
};

export default DashboardCharts;
