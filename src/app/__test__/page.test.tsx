import { expect, it , vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import Home from '../page';
import { describe } from 'node:test';
import MockComponent from '~/__mocks__/MockComponent';

//mock analytics data
vi.mock('~/services/analytics-service', () => ({
  useDashboardAnalyticsData: () => ({
    data: {
      data: {
        totalMovies: 100,
        totalTvShows: 100,
        totalGames: 100,
        totalUsers: 100,
      },
    },
  }),
}));

// mock components
vi.mock('~/components/manage-card', () => ({
  __esModule: true,
  default: () => <MockComponent testId="mock-manage-card" />,
}));

vi.mock('~/components/dashboard/dashboard-charts', () => ({
  __esModule: true,
  default: () => <MockComponent testId="mock-dashboard-charts" />,
}));

// all test cases
describe('all test cases related to dashboard', () => {
  it('should render the dashboard with all required elements', () => {
    render(<Home />);
    expect(screen.getByText('Media Management Dashboard')).toBeInTheDocument();
    expect(
      screen.getByText('Manage your media library efficiently'),
    ).toBeInTheDocument();
    expect(screen.getByText('Total movies')).toBeInTheDocument();
    expect(screen.getByText('Quick Add')).toBeInTheDocument();
  });
});
