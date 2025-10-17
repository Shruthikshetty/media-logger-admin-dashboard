import { expect, it, describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import StatCard from '../stat-card';
import { Tv } from 'lucide-react';

describe('stat card component test cases', () => {
  it('should render the stat card component', () => {
    render(
      <StatCard
        title={'Movies'}
        changePercent={90}
        value={1000}
        changeDirection="down"
        Icon={Tv}
      />,
    );
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText(/90/)).toBeInTheDocument();
  });
  // up
  it('should render trending up icon', () => {
    render(
      <StatCard
        title={'Movies'}
        changePercent={90}
        value={1000}
        changeDirection="up"
        Icon={Tv}
      />,
    );
    expect(screen.getByLabelText('trending-up')).toBeInTheDocument();
  });
  // down
  it('should render trending down icon', () => {
    render(
      <StatCard
        title={'Movies'}
        changePercent={90}
        value={1000}
        changeDirection="down"
        Icon={Tv}
      />,
    );
    expect(screen.getByLabelText('trending-down')).toBeInTheDocument();
  });

  it('should display icon if provided', () => {
    render(
      <StatCard
        title={'Movies'}
        changePercent={90}
        value={1000}
        changeDirection="up"
        Icon={Tv}
      />,
    );
    expect(screen.getByLabelText('media-icon')).toBeInTheDocument();
  });
});
