import { expect, it, describe, vi, afterEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import { SpinnerOverlay } from '../app-spinner';

// mock the spinner store
const spinnerState = {
  showSpinner: true,
  spinnerOptions: {
    opacity: 60,
    type: 'normal',
  },
};

vi.mock('~/state-management/spinner-store', () => ({
  _esModule: true,
  useSpinnerStore: () => spinnerState,
}));

describe('app spinner component test cases', () => {
  // Reset to default state after each test
  afterEach(() => {
    spinnerState.showSpinner = true;
    spinnerState.spinnerOptions.type = 'normal';
    spinnerState.spinnerOptions.opacity = 60;
  });

  it('should render the app spinner overlay component', () => {
    render(<SpinnerOverlay />);
    expect(screen.getByLabelText('spinner-loader')).toBeInTheDocument();
  });

  it('should render properly with dot loader', () => {
    // change the spinner type to dot
    spinnerState.spinnerOptions.type = 'dot';
    render(<SpinnerOverlay />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('should not render any overlay if the showSpinner state is false', () => {
    spinnerState.spinnerOptions.type = 'dot';
    spinnerState.showSpinner = false;
    render(<SpinnerOverlay />);
    expect(screen.queryByLabelText('spinner-loader')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Loading')).not.toBeInTheDocument();
  });
});
