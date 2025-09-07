import { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';

/**
 * A custom hook that uses Lodash to prevent flickering loading indicators.
 * It only returns `true` if the `isLoading` state persists for longer than the specified delay.
 *
 * @param isLoading The actual loading state from a data fetching hook (e.g., `isFetching`).
 * @param delay The debounce delay in milliseconds. Defaults to 500ms.
 * @returns A boolean indicating whether the delayed loading state should be shown.
 */
function useDelayedLoading(isLoading: boolean, delay = 500): boolean {
  const [showLoading, setShowLoading] = useState(false);

  // Memoize the debounced
  const debouncedSetShowLoading = useMemo(
    () =>
      debounce((loading: boolean) => {
        if (loading) {
          // set the loading state after the delay
          setShowLoading(true);
        }
      }, delay),
    [delay],
  );

  useEffect(() => {
    // When the loading state changes, we call our debounced function.
    if (isLoading) {
      debouncedSetShowLoading(true);
    } else {
      // If loading stops, we immediately hide the loading indicator...
      setShowLoading(false);
      // ...and cancel any pending debounced call.
      debouncedSetShowLoading.cancel();
    }

    // Cleanup on unmount.
    return () => {
      debouncedSetShowLoading.cancel();
    };
  }, [isLoading, debouncedSetShowLoading]);

  return showLoading;
}

export default useDelayedLoading;
