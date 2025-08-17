import { expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import Home from '../page';

//@this is just a example test file
it('should pass', () => {
  expect(1).toBe(1);
  render(<Home />);
  expect(screen.getByRole('paragraph')).toHaveTextContent('Dashboard');
});
