'use client';
import { Clock, Crown, Mail, Trophy, User } from 'lucide-react';
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
//@TODO this page in in progress
// user details page containing all information of a user
const UserDetails = () => {
  //get user if from params
  const userId = useParams()?.id;
  // fetch user details
  //@TODO add api for this
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
              {false ? (
                //in case of loading
                <Skeleton className="h-30 w-30 rounded-full" />
              ) : (
                <>
                  <AvatarImage
                    className="h-30 w-30 rounded-full"
                    src={
                      'https://i.imgur.com/kU7nX7l_d.webp?maxwidth=520&shape=thumb&fidelity=high'
                    }
                  />
                  <AvatarFallback>
                    <User className="bg-brand-200 text-base-white h-30 w-30 rounded-full p-3" />
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-2xl font-bold">Carol Davis</p>
                <p className="text-md text-ui-400 flex flex-row items-center justify-center gap-1">
                  <Mail className="text-ui-400 h-4 w-4" />
                  carol.davis@example.com
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <RoleBadge role="user" />
                <Badge className="bg-brand-600 rounded-full px-4 text-sm hover:opacity-80">
                  Active
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
          <p className="text-md text-ui-400 font-normal">
            Gaming enthusiast and content moderator. Always keeping the
            community friendly and engaging.
          </p>
          <div className="mt-2 flex flex-col gap-2 md:flex-row">
            <InfoCardWithIcon
              label={'wdaw'}
              value={'2000'}
              Icon={Trophy}
              className="md:flex-1"
            />
            <InfoCardWithIcon
              label={'wdaw'}
              value={'2000'}
              Icon={Trophy}
              className="md:flex-1"
            />
          </div>
          <InfoCardWithIcon
            label={'wdaw'}
            value={'2000'}
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
