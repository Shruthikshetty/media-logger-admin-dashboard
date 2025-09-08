import React, { createContext, use } from 'react';
import { Skeleton } from './ui/skeleton';
import { cn } from '~/lib/utils';

/**
 * A simple component to display a loading animation for lists.
 *
 * @param {number} [noOfItems=3] The number of items to display in the list.
 * @param {string} [className] The class name to apply to the outer container.
 * @param {string} [itemClassName] The class name to apply to each item in the list.
 * @param {boolean} [vertical=false] Whether the list should be displayed vertically or horizontally.
 * @returns {JSX.Element} A JSX element representing the list of loading items.
 */
export const ListLoader = ({
  noOfItems = 3,
  className,
  itemClassName,
  vertical = false,
}: {
  noOfItems: number;
  className?: string;
  itemClassName?: string;
  vertical?: boolean;
}) => {
  return (
    <div
      className={cn(
        'flex gap-2',
        vertical ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      {Array.from({ length: noOfItems }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-5 w-10 rounded-full', itemClassName)}
        />
      ))}
    </div>
  );
};

// The context can hold a boolean value or be undefined if no provider is used.
export const LoadingContext = createContext<
  | {
      isLoading?: boolean;
      defaultFallback?: React.ReactNode;
    }
  | undefined
>(undefined);

/**
 * An optional provider for managing a shared loading state.
 * It also has a fallback loader to display while content is loading.
 */
export const LoadingProvider = ({
  defaultFallback = <Skeleton className="h-7 w-30 rounded-md my-1" />,
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  defaultFallback?: React.ReactNode;
}) => {
  return (
    <LoadingContext.Provider value={{ isLoading, defaultFallback }}>
      {children}
    </LoadingContext.Provider>
  );
};

type LoadingWrapperProps = {
  /**
   * (Optional) Explicitly set the loading state.
   * This overrides any value from a parent LoadingProvider.
   */
  isLoading?: boolean;
  /**
   * The component or element to render while content is loading.
   */
  fallback: React.ReactNode;
  /**
   * The content to render when loading is complete.
   */
  children: React.ReactNode;
};

/**
 * A wrapper that displays a fallback loader while its children are loading.
 * It reads from LoadingContext using the `use` hook and can be controlled
 * by a prop or a parent LoadingProvider.
 */
export const LoadingWrapper = ({
  isLoading: isLoadingProp,
  fallback,
  children,
}: LoadingWrapperProps) => {
  // Use the `use` hook to read the context value.
  // It returns the context value (`boolean`) or `undefined` if no provider is found.
  const contextLoading = use(LoadingContext);

  // The logic to determine the final state remains the same.
  // The `isLoading` prop takes precedence over the context value.
  const showLoader = isLoadingProp ?? contextLoading?.isLoading ?? false;

  if (showLoader) {
    return <>{fallback ?? contextLoading?.defaultFallback}</>;
  }

  return <>{children}</>;
};
