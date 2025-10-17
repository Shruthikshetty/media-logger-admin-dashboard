import { expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import { describe } from 'node:test';
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
  it('should render trending up/down icon', () => {
    // up
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
    // down
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
