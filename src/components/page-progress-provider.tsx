'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { AppColors } from '~/constants/colors.constants';

const PageProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      color={AppColors.brand[600]}
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default PageProgressProvider;
