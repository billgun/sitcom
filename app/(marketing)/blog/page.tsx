import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { compareDesc } from 'date-fns';

import { formatDate } from '@/lib/utils';
import matter from 'gray-matter';

export const metadata = {
  title: 'Blog',
};

const blogDir = 'content/blog';

export default async function BlogPage() {
  const files = fs.readdirSync(path.join(blogDir));
  const posts = files
    .map((filename) => {
      const fileContent = fs.readFileSync(
        path.join(blogDir, filename),
        'utf-8'
      );
      const { data: frontMatter } = matter(fileContent);
      return {
        meta: frontMatter,
        slug: `blog/${filename.replace('.mdx', '')}`,
      };
    })
    .sort((a, b) => compareDesc(new Date(a.meta.date), new Date(b.meta.date)));

  return (
    <div className='container max-w-4xl py-6 lg:py-10'>
      <div className='flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8'>
        <div className='flex-1 space-y-4'>
          <h1 className='inline-block font-heading text-4xl tracking-tight lg:text-5xl'>
            Blog
          </h1>
          <p className='text-xl text-muted-foreground'>
            A blog built using next-mdx-remote.
          </p>
        </div>
      </div>
      <hr className='my-8' />
      {posts?.length ? (
        <div className='grid gap-10 sm:grid-cols-2'>
          {posts.map((post, index) => (
            <article
              key={post.meta._id}
              className='group relative flex flex-col space-y-2'
            >
              {post.meta.image && (
                <Image
                  src={post.meta.image}
                  alt={post.meta.title}
                  width={804}
                  height={452}
                  className='rounded-md border bg-muted transition-colors'
                  priority={index <= 1}
                />
              )}
              <h2 className='text-2xl font-extrabold'>{post.meta.title}</h2>
              {post.meta.description && (
                <p className='text-muted-foreground'>{post.meta.description}</p>
              )}
              {post.meta.date && (
                <p className='text-sm text-muted-foreground'>
                  {formatDate(post.meta.date)}
                </p>
              )}
              <Link href={post.slug} className='absolute inset-0'>
                <span className='sr-only'>View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
