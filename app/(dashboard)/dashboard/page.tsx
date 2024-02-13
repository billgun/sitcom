import Link from 'next/link';

import { env } from '@/env.mjs';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Icons } from '@/components/icons';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  // const { data, error } = await getCurrentUser();

  // if (error || !data?.user) {
  //   redirect('/login');
  // }

  return (
    <div className='container'>
      <div className='flex items-center justify-between px-2'>
        <div className='grid gap-1'>
          <h1 className='font-heading text-3xl md:text-4xl'>Posts</h1>
          <p className='text-lg text-muted-foreground'>
            Create and manage posts.
          </p>
        </div>
      </div>
    </div>
  );
}
