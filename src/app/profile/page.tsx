'use client';
import React from 'react';
import TitleSubtitle from '~/components/title-subtitle';
import { useAuthStore } from '~/state-management/auth-store';

const Profile = () => {
  //get the user data from the store
  const userDetails = useAuthStore((s) => s.user);

  return (
    <div className="p-5">
      <TitleSubtitle title="Profile" subtitle="Manage your profile" />
    </div>
  );
};

export default Profile;
