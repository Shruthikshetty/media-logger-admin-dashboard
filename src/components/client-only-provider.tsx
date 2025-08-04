// app/client-provider.tsx
"use client";

import React, { useState, useEffect } from "react";

/**
 * This wrapper ensures that its children are only rendered on the client side.
 * This is necessary to prevent hydration errors when using components that
 * rely on browser-only APIs like `window` or `localStorage`.
 */
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Or a loading spinner/skeleton
  }

  return <>{children}</>;
};

export default ClientOnly;
