'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { useRouter } from 'next/navigation';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  loginDefaultValues,
  loginSchema,
  LoginSchema,
} from '~/schema/login-schema';
import { useLoginUser } from '~/services/auth-service';
import { useAuthStore } from '~/state-management/auth-store';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { CookieNames, TokenExpiry } from '~/constants/config.constants';

/**
 * This component renders the login page.
 * @returns {JSX.Element}
 */
const Login = () => {
  //create a form using the login schema
  const loginForm = useForm<LoginSchema>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const route = useRouter();

  //get store data
  const { setToken } = useAuthStore();

  //import the mutation for auth login
  const { mutate, error } = useLoginUser();

  //submit the form
  const onSubmit = (data: LoginSchema) => {
    //call the login api
    mutate(data, {
      onSuccess: (data) => {
        // set the token
        setToken(data.data.token);
        // set token in cookie
        Cookies.set(CookieNames.token, data.data.token, {
          expires: TokenExpiry, // days
          path: '/', // accessible across the app
        });
        toast.info('Login successful', {
          classNames: {
            toast: '!bg-feedback-success',
          },
        });
        route.replace('/');
      },
      onError: (error) => {
        // show message a pop up
        toast.error(error?.response?.data.message ?? 'Something went wrong', {
          classNames: {
            toast: '!bg-feedback-error',
          },
        });
      },
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-ui-600 flex max-w-[550px] flex-col items-center justify-center rounded-lg border p-5 md:w-[60%]">
        <div className="mb-5 flex flex-col items-center">
          <div className="text-base-white pt-3 pb-1 text-center text-3xl font-bold">
            Media Logger Admin
          </div>
          <div className="text-ui-600 text-md pb-3 text-center font-bold">
            Sign in to your admin dashboard
          </div>
        </div>
        <Form {...loginForm}>
          <form className="w-full" onSubmit={loginForm.handleSubmit(onSubmit)}>
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
                        placeholder="example@gmail.com"
                        className="border-ui-600 w-full"
                      />
                    </FormControl>
                    <FormMessage />
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
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        placeholder="**********"
                        className="border-ui-600 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error?.response?.data?.message && (
              <p className="text-feedback-error mt-3 text-center">
                {error?.response?.data?.message}
              </p>
            )}
            <Button
              type="submit"
              disabled={!loginForm.formState.isValid}
              className="bg-brand-500 hover:bg-brand-500 mt-6 mb-5 h-10 w-full text-lg hover:opacity-80"
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
