'use client';
import React from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

/**
 * This component renders the login page.
 * @returns {JSX.Element}
 */
const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-ui-600 flex w-[50%] max-w-[550px] flex-col items-center justify-center rounded-lg border p-5">
        <div className="mb-5 flex flex-col items-center">
          <div className="text-base-white pt-3 pb-1 text-3xl font-bold">
            Media Logger Admin
          </div>
          <div className="text-ui-600 text-md pb-3 font-bold">
            Sign in to your admin dashboard
          </div>
        </div>
        <form className="w-full">
          <div className="flex flex-col gap-2">
            <div>
              <Label htmlFor="email" className="text-md mt-2 mb-2">
                Email
              </Label>
              <Input type="text" id="email" className="border-ui-600 w-full" />
            </div>
            <div>
              <Label htmlFor="password" className="text-md mt-2 mb-2">
                Password
              </Label>
              <Input
                type="text"
                id="password"
                className="border-ui-600 w-full"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-brand-500 hover:bg-brand-500 mt-6 mb-5 w-full text-lg hover:opacity-80"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
