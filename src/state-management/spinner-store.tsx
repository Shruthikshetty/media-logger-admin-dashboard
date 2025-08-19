//this file contains the state management for the global app spinner
import { create } from 'zustand';

type spinnerOptions = {
  opacity: number;
  type: 'normal' | 'dot';
};
type spinnerStore = {
  showSpinner: boolean;
  setShowSpinner: (showSpinner: boolean) => void;
  spinnerOptions: spinnerOptions;
  setSpinnerWithOptions: (options: {
    showSpinner?: boolean;
    options?: Partial<spinnerOptions>;
  }) => void;
  toggleSpinner: () => void;
  resetSpinner: () => void;
};

//default spinner state
const initialState: Pick<spinnerStore, 'showSpinner' | 'spinnerOptions'> = {
  showSpinner: true, // this setting is only used initially on app load
  spinnerOptions: {
    opacity: 0,
    type: 'dot',
  },
};

//hook to access / modify the spinner state globally
export const useSpinnerStore = create<spinnerStore>((set) => ({
  ...initialState,
  /**
   * set the spinner state
   */
  setShowSpinner: (showSpinner: boolean) =>
    set((prev) => ({ ...prev, showSpinner: showSpinner })),

  /**
   * toggle spinner state
   */
  toggleSpinner: () =>
    set((prev) => ({ ...prev, showSpinner: !prev.showSpinner })),

  /**
   * set the spinner options
   */
  setSpinnerWithOptions: ({
    showSpinner,
    options,
  }: {
    showSpinner?: boolean;
    options?: Partial<spinnerOptions>;
  }) =>
    set((prev) => ({
      ...prev,
      showSpinner: showSpinner ?? prev.showSpinner,
      spinnerOptions: { ...prev.spinnerOptions, ...(options ?? {}) },
    })),

  /**
   * reset the spinner state
   */
  resetSpinner: () =>
    set({
      showSpinner: false,
      spinnerOptions: {
        opacity: 50,
        type: 'dot',
      },
    }),
}));
