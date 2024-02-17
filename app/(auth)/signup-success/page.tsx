import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeftIcon } from 'lucide-react';
import Image from 'next/image';

export default function Signup() {
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
            Sign up! It&apos;s free
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <div className='bg-primary-foreground px-6 py-12 shadow sm:rounded-lg sm:px-12'>
            <div>
              <div className='mt-6 grid grid-cols-1 gap-4'>
                <Image
                  src={'/images/work-party.jpg'}
                  alt={'Signup Success'}
                  width={804}
                  height={452}
                  className='rounded-md border bg-muted fill-current transition-colors'
                />
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
