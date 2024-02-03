import Link from 'next/link';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import ErrorMessage from '@/components/ui/ErrorMessage';
// import { signUp } from '@/actions/signup';
import { useState } from 'react';
import { Icons } from '@/components/icons';
import SignupForm from './signup-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

const SignUpSchema = z.object({
  username: z.string().min(1),
  email: z.string().email('Invalid email address').min(1),
  password: z.string().min(1),
  tnc: z.boolean().refine((value) => value === true, {
    message: 'Checkbox must be checked',
  }),
});

export type SignUp = z.infer<typeof SignUpSchema>;

export default function Signup() {
  // const onSubmit = handleSubmit((data) => {
  //   signUp(data);
  // });

  return (
    <>
      <div className='flex min-h-full w-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <Button variant={'outline'} asChild>
          <Link
            href='/'
            className='bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm text-foreground no-underline'
          >
            <ChevronLeftIcon
              width={24}
              height={24}
              className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
            />
            Back
          </Link>
        </Button>

        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <Icons.logo className='mx-auto h-10 w-auto' />
          <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-foreground'>
            Sign up! It's free
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <div className='bg-primary-foreground px-6 py-12 shadow sm:rounded-lg sm:px-12'>
            <SignupForm />

            <div>
              <div className='relative mt-10'>
                <div
                  className='absolute inset-0 flex items-center'
                  aria-hidden='true'
                >
                  <Separator className='my-4 bg-foreground' />
                </div>
                <div className='relative flex justify-center text-sm font-medium leading-6'>
                  <span className='bg-primary-foreground px-6 text-foreground'>
                    Or continue with
                  </span>
                </div>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-4'>
                <Button asChild variant={'default'} className='gap-3'>
                  <Link href='#'>
                    <Icons.google className='h-4 w-4' />
                    <span className='text-sm font-semibold leading-6'>
                      Google
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Already have an account?{' '}
            <Link
              href='login'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
