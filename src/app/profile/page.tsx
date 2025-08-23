'use client';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Calendar, Star, Trophy, User } from 'lucide-react';
import React from 'react';
import RoleBadge from '~/components/role-badge';
import TitleSubtitle from '~/components/title-subtitle';
import { Avatar } from '~/components/ui/avatar';
import moment from 'moment';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { useAuthStore } from '~/state-management/auth-store';
import { getXPLevel } from '~/lib/exp-mapping';
import { cn } from '~/lib/utils';

const Profile = () => {
  //get the user data from the store
  const userDetails = useAuthStore((s) => s.user);

  //get the level based on the xp
  const xpLevel = getXPLevel(userDetails?.xp ?? 0);

  return (
    <div className="flex flex-col gap-5 p-5">
      <TitleSubtitle
        title="My Profile"
        subtitle="Manage your profile information and account settings"
      />
      <div>
        <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
          <CardHeader>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <Avatar className="border-ui-600 border-1">
                <AvatarImage
                  className="h-30 w-30 rounded-full"
                  src={userDetails?.profileImg}
                />
                <AvatarFallback>
                  <User className="bg-brand-200 text-base-white h-30 w-30 rounded-full p-3" />
                </AvatarFallback>
              </Avatar>
              <p className="text-xl">{userDetails?.name}</p>
              <RoleBadge role={userDetails?.role} />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <p className="text-ui-400">XP Points</p>
              <div className="flex flex-row items-center gap-2">
                <Trophy
                  className="text-feedback-warning h-5 w-5"
                  strokeWidth={2}
                />
                {/* @TODO create a formatter for number with commas */}
                <p className="text-lg font-bold">{userDetails.xp}</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="text-ui-400">Level</p>
              <div className="flex flex-row items-center gap-2">
                <Star
                  className={cn('h-4 w-4', `${xpLevel.color}`)}
                  strokeWidth={3}
                />
                <p className={cn('text-lg font-bold', `${xpLevel.color}`)}>
                  {xpLevel.level}
                </p>
              </div>
            </div>
            <p className="text-ui-400 flex flex-row items-center gap-2">
              <Calendar className="h-5 w-5" />
              Joined {moment(userDetails.createdAt).format('DD/MM/YYYY')}
            </p>
            <p className="text-ui-400 flex flex-row items-center gap-2">
              <Calendar className="h-5 w-5" />
              Updated {moment(userDetails.updatedAt).format('DD/MM/YYYY')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
