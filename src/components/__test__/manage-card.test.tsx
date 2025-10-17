import { expect, it, describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import ManageCard from '../manage-card';
import { Crown } from 'lucide-react';

describe('manage card component test cases', () => {
  it('should render the manage card component', () => {
    render(
      <ManageCard
        title={'mock test title'}
        description={'mock test description'}
        href={'/'}
      />,
    );
    expect(screen.getByText('mock test title')).toBeInTheDocument();
    expect(screen.getByText('mock test description')).toBeInTheDocument();
  });

  it('should display icon if provided', () => {
    render(
      <ManageCard
        title={'mock test title'}
        description={'mock test description'}
        href={'/'}
        Icon={Crown}
      />,
    );
    expect(screen.getByLabelText('media-icon')).toBeInTheDocument();
  });
});
