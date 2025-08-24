'use client';
import {
  Calendar,
  Camera,
  Edit,
  Mail,
  MapPin,
  Shield,
  Star,
  Trophy,
  User,
} from 'lucide-react';
import React from 'react';
import RoleBadge from '~/components/role-badge';
import TitleSubtitle from '~/components/title-subtitle';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import moment from 'moment';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { useAuthStore } from '~/state-management/auth-store';
import { getXPLevel } from '~/lib/exp-mapping';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import BackButton from '~/components/back-button';
import { Skeleton } from '~/components/ui/skeleton';
import {
  capitalizeFirstLetter,
  formatName,
  formatToIndianNumber,
} from '~/lib/formatting';
import EditProfileDialog from '~/components/edit-profile-dialog';

const Profile = () => {
  //get the user data from the store
  const userDetails = useAuthStore((s) => s.user);

  //get the level based on the xp
  const xpLevel = getXPLevel(userDetails?.xp ?? 0);

  //profile information
  const profileInfo = [
    {
      label: 'Full Name',
      value: formatName(userDetails?.name),
    },
    {
      label: 'Email Address',
      value: userDetails?.email,
      icon: <Mail className="text-ui-400 h-5 w-5" />,
    },
    {
      label: 'Role',
      value: capitalizeFirstLetter(userDetails?.role),
      icon: <Shield className="text-ui-400 h-5 w-5" />,
    },
    {
      label: 'Experience Points',
      value: userDetails?.xp,
      icon: <Trophy className="text-feedback-warning h-5 w-5" />,
    },
    {
      label: 'Location',
      value: userDetails?.location ?? '-',
      icon: <MapPin className="text-ui-400 h-5 w-5" />,
    },
    {
      label: 'Bio',
      value: userDetails?.bio,
    },
  ];

  return (
    <div className="flex flex-col gap-5 p-5">
      <BackButton />
      <TitleSubtitle
        title="My Profile"
        subtitle="Manage your profile information and account settings"
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-10">
        {/* Profile image Card */}
        <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r md:col-span-4 lg:col-span-3">
          <CardHeader>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <div className="relative">
                <Avatar className="border-ui-600 border-1">
                  {!userDetails?._id ? (
                    //incase of loading
                    <Skeleton className="h-30 w-30 rounded-full" />
                  ) : (
                    <>
                      <AvatarImage
                        className="h-30 w-30 rounded-full"
                        src={userDetails?.profileImg}
                      />
                      <AvatarFallback>
                        <User className="bg-brand-200 text-base-white h-30 w-30 rounded-full p-3" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                {/* TODO functionality to change profile image */}
                <button
                  className="bg-base-black border-ui-600 absolute right-0 bottom-0 flex items-center justify-center rounded-full border p-2 hover:opacity-70 active:scale-95"
                  disabled={!userDetails?._id}
                >
                  <Camera className="h-6 w-6" />
                </button>
              </div>
              <p className="text-xl">{formatName(userDetails?.name)}</p>
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
                {!userDetails?._id ? (
                  <Skeleton className="h-4 w-20 max-w-50" />
                ) : (
                  <p className="text-lg font-bold">
                    {formatToIndianNumber(userDetails.xp)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="text-ui-400">Level</p>
              <div className="flex flex-row items-center gap-2">
                {!userDetails?._id ? (
                  <Skeleton className="h-4 w-20 max-w-50" />
                ) : (
                  <>
                    <Star
                      className={cn('h-4 w-4', `${xpLevel.color}`)}
                      strokeWidth={3}
                    />
                    <p className={cn('text-lg font-bold', `${xpLevel.color}`)}>
                      {xpLevel.level}
                    </p>
                  </>
                )}
              </div>
            </div>
            {!userDetails?._id ? (
              //incase of loading
              <>
                <Skeleton className="h-4 w-40 max-w-70" />
                <Skeleton className="h-4 w-40 max-w-70" />
              </>
            ) : (
              <>
                <p className="text-ui-400 flex flex-row items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Joined {moment(userDetails?.createdAt).format('DD/MM/YYYY')}
                </p>
                <p className="text-ui-400 flex flex-row items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Updated {moment(userDetails?.updatedAt).format('DD/MM/YYYY')}
                </p>
              </>
            )}
          </CardContent>
        </Card>
        {/* Profile info card */}
        <Card className="border-ui-600 text-base-white from-base-black to-ui-900 overflow-hidden bg-gradient-to-r md:col-span-6 lg:col-span-7">
          <CardHeader>
            <div className="flex flex-row gap-4">
              <TitleSubtitle
                title="Profile Information"
                subtitle="Your personal details and account information"
                customStyles={{
                  title: 'text-2xl font-semibold',
                  subtitle: 'text-base',
                }}
              />
              {/* TODO functionality to edit profile */}
              <EditProfileDialog
                userExistingData={{
                  email: userDetails?.email ?? '',
                  name: userDetails?.name ?? '',
                  bio: userDetails?.bio ?? '',
                  location: userDetails?.location ?? '',
                }}
              >
                <Button
                  className="border-ui-600 bg-brand-500 hover:bg-brand-200 border p-4.5 active:scale-95"
                  disabled={!userDetails?._id}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </EditProfileDialog>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 lg:grid lg:grid-cols-2">
            {profileInfo.map((info, index) => {
              if (!userDetails?._id)
                // if data is loading
                return (
                  <React.Fragment key={index}>
                    <Skeleton className="h-4 max-w-50" />
                    <Skeleton className="h-4 max-w-70" />
                  </React.Fragment>
                );
              return (
                <div
                  key={info.label}
                  className={cn(
                    'flex flex-col',
                    info.label === 'Bio' ? 'col-span-2' : 'col-span-1',
                  )}
                >
                  <p className="text-ui-400 font-semibold">{info.label}</p>
                  <div className="flex flex-row items-center gap-2">
                    {info?.icon}
                    <p className="text-lg">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
