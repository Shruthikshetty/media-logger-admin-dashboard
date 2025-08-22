'use client';
import React from 'react';
import TitleSubtitle from '~/components/title-subtitle';
import { useAuthStore } from '~/state-management/auth-store';

const Profile = () => {
  //get the user data from the store
  const userDetails = useAuthStore((s) => s.user);

  return (
    <>
      <TitleSubtitle title="Profile" subtitle="Manage your profile" />
    </>
  );
};

export default Profile;
