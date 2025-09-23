'use client';
import { Clock, Crown, Mail, Trophy, User } from 'lucide-react';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React from 'react';
import BackButton from '~/components/back-button';
import InfoCardWithIcon from '~/components/info-card-with-icon';
import RoleBadge from '~/components/role-badge';
import TitleSubtitle from '~/components/title-subtitle';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Skeleton } from '~/components/ui/skeleton';
import { formatToIndianNumber } from '~/lib/formatting';
import { isUserActive } from '~/lib/user-utils';
import { cn } from '~/lib/utils';
import { useGetUserDetailsById } from '~/services/user-service';

// user details page containing all information of a user
const UserDetails = () => {
  //get user if from params
  const userId = (useParams()?.id as string) ?? '';
  // fetch user details
  const { data, isLoading } = useGetUserDetailsById(userId);

  // info data displayed in cards
  const infoData = [
    {
      title: 'Experience Points',
      value: data?.data.xp ? formatToIndianNumber(data?.data.xp) : '???',
      icon: Trophy,
    },
    {
      title: 'Location',
      value: data?.data.location ?? '???',
      icon: Trophy,
    },
    {
      title: 'Member Since',
      value: moment(data?.data.createdAt).format('MMMM YYYY'),
      icon: Trophy,
    },
  ];

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* header */}
      <div className="flex flex-row items-center justify-start gap-5">
        <BackButton />
        <div className="border-ui-700 h-10 border-1" />
        <div className="flex grow flex-col items-baseline gap-2 sm:flex-row sm:items-center">
          <TitleSubtitle
            title="User Profile"
            subtitle="View and manage user details"
          />
          <Button variant={'blue'}>
            <Crown className="text- size-4" /> Change Role
          </Button>
        </div>
      </div>
      {/* details card */}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader>
          <CardDescription hidden>User profile details card</CardDescription>
          <div className="flex flex-row items-center justify-start gap-5">
            <Avatar className="border-ui-600 border-1">
              {isLoading ? (
                //in case of loading
                <Skeleton className="h-30 w-30 rounded-full" />
              ) : (
                <>
                  <AvatarImage
                    className="h-30 w-30 rounded-full"
                    src={data?.data?.profileImg}
                  />
                  <AvatarFallback>
                    <User className="bg-brand-200 text-base-white h-30 w-30 rounded-full p-3" />
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-2xl font-bold">{data?.data?.name}</p>
                <p className="text-md text-ui-400 flex flex-row items-center justify-center gap-1">
                  <Mail className="text-ui-400 h-4 w-4" />
                  {data?.data?.email}
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <RoleBadge role="user" />
                <Badge
                  className={cn(
                    'rounded-full px-4 text-sm hover:opacity-80',
                    isUserActive(data?.data?.lastLogin)
                      ? 'bg-brand-600'
                      : 'bg-ui-700',
                  )}
                >
                  {isUserActive(data?.data?.lastLogin) ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <div className="px-5">
          <Separator className="bg-ui-400" />
        </div>
        <CardContent className="flex flex-col gap-2">
          <p className="text-lg font-semibold">About</p>
          <p className="text-md text-ui-400 font-normal">{data?.data.bio}</p>
          <div className="mt-2 flex flex-col gap-2 md:flex-row">
            {infoData.map((item, index) => (
              <InfoCardWithIcon
                key={index}
                label={item.title}
                value={item.value.toString()}
                Icon={item.icon}
                className="md:flex-1"
              />
            ))}
          </div>
          <InfoCardWithIcon
            label={'Last Login'}
            value={
              data?.data?.lastLogin
                ? moment(data?.data?.lastLogin).format('DD MMM YYYY')
                : 'NA'
            }
            Icon={Clock}
            theme="gray"
            className="bg-ui-700/20 mt-2"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
