import React from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

//@todo screen in progress
const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-ui-600 min-w-[30%] rounded-lg border p-3">
        <div>Media Logger Admin</div>
        <div>Sign in to your admin dashboard</div>
        <form>
          <Label htmlFor="email">Email</Label>
          <Input type="text" id="email" />
          <Label htmlFor="password">Password</Label>
          <Input type="text" id="password" />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
