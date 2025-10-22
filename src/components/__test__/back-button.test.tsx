import { expect, it, describe, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import BackButton from '../back-button';

const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

//component mocks
vi.mock('~/components/ui/button', () => import('~/__mocks__/button.mock'));

describe('back button component test cases', () => {
  it('should render the back button component', () => {
    render(<BackButton />);
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument(); // This is coming from mock
  });
  it('should call the back function when clicked', () => {
    render(<BackButton />);
    screen.getByTestId('button').click();
    expect(mockBack).toHaveBeenCalled();
  });
});
