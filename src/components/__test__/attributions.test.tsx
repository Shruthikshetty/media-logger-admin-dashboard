import { expect, it, describe, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import Attributions from '../attributions';

describe('attributions component test cases', () => {
  it('should render the attributions component', () => {
    render(<Attributions />);
    expect(
      screen.getByText(/This product uses data and images from/),
    ).toBeInTheDocument();
    expect(screen.getByText(/TMDB/)).toBeInTheDocument();
    expect(screen.getByText(/RAWG/)).toBeInTheDocument();
    expect(screen.getByText(/IGDB/)).toBeInTheDocument();
    expect(screen.getByLabelText('The Movie Database')).toBeInTheDocument();
    expect(screen.getByLabelText('IGDB Logo')).toBeInTheDocument();
    expect(screen.getByLabelText('RAWG Logo')).toBeInTheDocument();
  });
});
