import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LoginForm } from './login-form';
import { Icons } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

export default function Login() {
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
            Sign in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <div className='bg-primary-foreground px-6 py-12 shadow sm:rounded-lg sm:px-12'>
            <LoginForm />

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

          <p className='mt-10 text-center text-sm text-muted-foreground'>
            New to {siteConfig.name}?{' '}
            <Link
              href='/signup'
              className='font-semibold leading-6 text-foreground hover:text-foreground/80'
            >
              Let&apos;s get started
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
