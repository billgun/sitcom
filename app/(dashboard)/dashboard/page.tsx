import Link from 'next/link';

import { env } from '@/env.mjs';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Icons } from '@/components/icons';

export default async function IndexPage() {
  return (
    <>
      <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
        <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
          <Link
            href={siteConfig.links.twitter}
            className='inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium'
            target='_blank'
          >
            🤡 Follow along on Twitter
            <ArrowRightIcon className='ml-1 h-4 w-4' />
          </Link>
          <h1 className='font-heading text-balance text-2xl sm:text-4xl md:text-5xl lg:text-6xl'>
            An example app built using Next.js 13 app router & server
            components.
          </h1>
          <p className='text-muted-foreground'>
            Inspired from{' '}
            <Link href={'https://tx.shadcn.com/'}>Taxonomy by shadcn</Link>
          </p>
          <p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
            I&apos;m building a web app with Next.js 13 and open sourcing
            everything. Watch me fail this miserably.
          </p>
          <div className='space-x-4'>
            <Link href='/login' className={cn(buttonVariants({ size: 'lg' }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
