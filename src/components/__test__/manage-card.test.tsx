import { expect, it, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { describe } from 'node:test';
import ManageCard from '../manage-card';

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
});
