import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import Link from 'next/link';
import { Mdx } from '@/components/mdx';
import { notFound } from 'next/navigation';
import { ChevronRightIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { badgeVariants } from '@/components/ui/badge';

interface DocPageProps {
  params: {
    slug: string[];
  };
}
const basePath = 'content';

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join('/') || 'index';
  try {
    const source = fs.readFileSync(path.join(basePath, `${slug}.mdx`), 'utf8');
    const { data: frontMatter, content } = matter(source);

    return {
      meta: frontMatter,
      slug,
      content,
    };
  } catch (e) {
    notFound();
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    notFound();
  }

  return (
    <main className=' relative py-6  lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]'>
      <div className='mx-auto w-full min-w-0'>
        <div className='mb-4 flex items-center space-x-1 text-sm text-muted-foreground'>
          <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
            Docs
          </div>
          <ChevronRightIcon className='h-4 w-4' />
          <div className='font-medium text-foreground'>{doc.meta.title}</div>
        </div>
        <div className='space-y-2'>
          <h1 className={cn('scroll-m-20 text-4xl font-bold tracking-tight')}>
            {doc.meta.title}
          </h1>
          {doc.meta.description && (
            <p className='text-balance text-lg text-muted-foreground'>
              {doc.meta.description}
            </p>
          )}
        </div>
        {doc.meta.links ? (
          <div className='flex items-center space-x-2 pt-4'>
            {doc.meta.links?.doc && (
              <Link
                href={doc.meta.links.doc}
                target='_blank'
                rel='noreferrer'
                className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
              >
                Docs
                <ExternalLinkIcon className='h-3 w-3' />
              </Link>
            )}
            {doc.meta.links?.api && (
              <Link
                href={doc.meta.links.api}
                target='_blank'
                rel='noreferrer'
                className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
              >
                API Reference
                <ExternalLinkIcon className='h-3 w-3' />
              </Link>
            )}
          </div>
        ) : null}
        <div className='pb-12 pt-8'>
          <Mdx source={doc.content} />
        </div>
        {/* <DocsPager doc={doc} /> */}
      </div>
      {/* {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )} */}
    </main>
  );
}
