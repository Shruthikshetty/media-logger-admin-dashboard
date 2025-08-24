'use client';
import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * A button component that goes back to the previous route when clicked.
 * It renders an {@link ArrowLeft} icon and the text or "Back" by default.
 * @param {string} [text] - The text to display on the button.
 * @example
 * <BackButton />
 */
const BackButton = ({ text = 'Back' }: { text?: string }) => {
  //initialize router
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="border-ui-600 hover:bg-ui-700 hover:border-ui-200 text-ui-200 hover:text-base-white max-w-40 border bg-transparent active:scale-95"
    >
      <ArrowLeft className="text-ui-200 size-4" strokeWidth={2} />
      {text}
    </Button>
  );
};

export default BackButton;
