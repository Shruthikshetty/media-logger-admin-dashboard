'use client';

import { Button } from '~/components/ui/button';

/**
 * This is the error page. that catch all unexpected errors globally
 * @returns a JSX.Element
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-base-black text-base-white m-auto flex h-screen w-screen flex-col items-center justify-center gap-5">
        <h2 className="text-3xl">Something went wrong!</h2>
        <Button variant={'blue'} onClick={() => reset()}>
          Try again
        </Button>
        <p className="text-feedback-error text-sm opacity-50">
          {error?.message}
        </p>
      </body>
    </html>
  );
}
