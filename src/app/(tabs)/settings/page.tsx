import { Key, Shield, TriangleAlert } from 'lucide-react';
import React from 'react';
import { T } from 'vitest/dist/chunks/reporters.d.BFLkQcL6.js';
import TitleSubtitle from '~/components/title-subtitle';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';

//@TODO screen in progress
const SettingsTab = () => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <TitleSubtitle
        title="Settings"
        subtitle="Manage your account preferences and privacy settings"
      />
      {/* Security card */}
      <Card className="border-ui-600 text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader className="flex flex-row items-center justify-start gap-2">
          <Shield className="h-7 w-7" />
          <TitleSubtitle
            title="Security"
            subtitle="Protect your account and data"
            customStyles={{
              title: 'text-2xl font-semibold',
              subtitle: 'text-base',
            }}
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button variant={'outline'} className="border-ui-600">
            <Key />
            Change password
          </Button>
          <Button variant={'outline'} className="border-ui-600">
            <Key />
            export data
          </Button>
        </CardContent>
      </Card>
      {/* Account delete card */}
      <Card className="border-feedback-error text-base-white from-base-black to-ui-900 bg-gradient-to-r">
        <CardHeader className="flex flex-row items-center justify-start gap-2">
          <TriangleAlert className="text-feedback-error h-7 w-7" />
          <TitleSubtitle
            title="Danger Zone"
            subtitle="Irreversible actions that affect your account"
            customStyles={{
              title: 'text-2xl font-semibold text-feedback-error',
              subtitle: 'text-base',
            }}
          />
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <Button variant={'red'} className="border-feedback-error">
            <TriangleAlert className="size-4" />
            Delete Account
          </Button>
          <p className="text-ui-400 mt-2">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
