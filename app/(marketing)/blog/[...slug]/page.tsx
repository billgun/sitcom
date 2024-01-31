import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import { cn, formatDate } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Mdx } from '@/components/mdx';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

interface BlogPostPageProps {
  params: {
    slug: string[];
  };
}

const blogDir = 'content/blog';

async function getBlogPostFromParams({ params }: BlogPostPageProps) {
  const slug = params.slug?.join('/') || 'index';
  const filePath = path.join(blogDir, `${slug}.mdx`);
  console.log(fs.existsSync(filePath));
  if (fs.existsSync(filePath)) {
    const source = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter, content } = matter(source);

    console.log('data', frontMatter);
    return {
      meta: frontMatter,
      slug,
      content,
    };
  } else {
    return null;
  }
}

async function getAllAuthors() {
  const authorDir = 'content/authors';
  const files = fs.readdirSync(path.join(authorDir));

  const authors = files.map((filename) => {
    const fileContent = fs.readFileSync(
      path.join(authorDir, filename),
      'utf-8'
    );
    const { data: frontMatter } = matter(fileContent);
    return {
      meta: frontMatter,
    };
  });
  return authors;
}

export default async function PostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostFromParams({ params });

  if (!post) {
    notFound();
  }

  console.log(post.meta);

  const authors = await getAllAuthors();

  return (
    <article className='container relative max-w-3xl py-6 lg:py-10'>
      <Link
        href='/blog'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-[-200px] top-14 hidden xl:inline-flex'
        )}
      >
        <ChevronLeftIcon className='mr-2 h-4 w-4' />
        See all post.metas
      </Link>
      <div>
        {post.meta.date && (
          <time
            dateTime={post.meta.date}
            className='block text-sm text-muted-foreground'
          >
            Published on {formatDate(post.meta.date)}
          </time>
        )}
        <h1 className='mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl'>
          {post.meta.title}
        </h1>
        {authors?.length ? (
          <div className='mt-4 flex space-x-4'>
            {authors.map((author) =>
              author ? (
                <Link
                  key={author.meta.title}
                  href={`https://twitter.com/${author.meta.twitter}`}
                  className='flex items-center space-x-2 text-sm'
                >
                  <Image
                    src={author.meta.avatar}
                    alt={author.meta.title}
                    width={42}
                    height={42}
                    className='rounded-full bg-white'
                  />
                  <div className='flex-1 text-left leading-tight'>
                    <p className='font-medium'>{author.meta.title}</p>
                    <p className='text-[12px] text-muted-foreground'>
                      @{author.meta.twitter}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      {post.meta.image && (
        <Image
          src={post.meta.image}
          alt={post.meta.title}
          width={720}
          height={405}
          className='my-8 rounded-md border bg-muted transition-colors'
          priority
        />
      )}
      <Mdx source={post.content} />
      <hr className='mt-12' />
      <div className='flex justify-center py-6 lg:py-10'>
        <Link href='/blog' className={cn(buttonVariants({ variant: 'ghost' }))}>
          <ChevronLeftIcon className='mr-2 h-4 w-4' />
          See all posts
        </Link>
      </div>
    </article>
  );
}
