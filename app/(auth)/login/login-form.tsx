'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from './actions';

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Name must be at least 2 characters.',
    })
    .email({
      message: 'Must be in email format',
    }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const defaultValues: Partial<LoginFormValues> = {
  email: '',
  password: '',
  rememberMe: false,
};

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });
  async function onSubmit(formData: LoginFormValues) {
    setIsLoading(true);

    const supabase = createClient();

    const { error } = await signIn({
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);
    if (error) {
      console.log(error.message);
      form.setError('root', { message: error.message });
      throw new Error('Could not authenticate user');
    }
    router.push('/');
    router.refresh();
  }

  return (
    <Form {...form}>
      <FormMessage>{form.formState.errors.root?.message}</FormMessage>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder='Your name' {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-between'>
          <div className='text-sm leading-6'>
            <a
              href='#'
              className='font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <Button
            variant={'default'}
            type='submit'
            className='w-full font-semibold'
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}
