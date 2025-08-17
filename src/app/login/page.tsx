'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  loginDefaultValues,
  loginSchema,
  LoginSchema,
} from '~/schema/login-schema';

/**
 * This component renders the login page.
 * @returns {JSX.Element}
 */
const Login = () => {
  //create a form using the login schema
  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  //submit the form
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //prevent default behavior
    e.preventDefault();
    //get the data from the from
    const data = loginForm.getValues();
    //log the data
    console.log(data);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-ui-600 flex max-w-[550px] flex-col items-center justify-center rounded-lg border p-5 sm:w-[90%] md:w-[50%]">
        <div className="mb-5 flex flex-col items-center">
          <div className="text-base-white pt-3 pb-1 text-center text-3xl font-bold">
            Media Logger Admin
          </div>
          <div className="text-ui-600 text-md pb-3 text-center font-bold">
            Sign in to your admin dashboard
          </div>
        </div>
        <Form {...loginForm}>
          <form className="w-full" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <FormField<LoginSchema>
                name="email"
                control={loginForm.control}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email" className="text-md mt-2 mb-2">
                      Email
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        id="email"
                        className="border-ui-600 w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField<LoginSchema>
                name="password"
                control={loginForm.control}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password" className="text-md mt-2 mb-2">
                      Password
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        id="password"
                        className="border-ui-600 w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="bg-brand-500 hover:bg-brand-500 mt-6 mb-5 w-full text-lg hover:opacity-80"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
