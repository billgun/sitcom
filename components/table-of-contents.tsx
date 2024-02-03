'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export interface HeadingType {
  text: string;
  anchor: string;
}

const TableOfContents = () => {
  const [headings, setHeadings] = useState<HeadingType[]>([]);
  const tocLinksRef = useRef<HTMLAnchorElement[]>([]);
  const firstVisibleLink = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const obsvCallback: IntersectionObserverCallback = (entries) => {
      const links = tocLinksRef.current;

      entries.forEach((entry) => {
        const activeHeading = entry.target;

        links.forEach((link) => {
          const href = link?.href.split('#')[1];

          if (entry.isIntersecting && href === activeHeading.id) {
            links.forEach((l) => l?.classList.remove('active'));
            link?.classList.add('active');
          }
        });

        if (!firstVisibleLink.current) {
          links[0]?.classList.add('active');
          firstVisibleLink.current = links[0];
        }
      });
    };

    const observer = new IntersectionObserver(obsvCallback, {
      rootMargin: '0px 0px -70% 0px',
      threshold: [1.0],
    });

    const h2Headings = Array.from(
      document.querySelectorAll('article > h2')
    ) as HTMLElement[];

    const h2s: HeadingType[] = h2Headings.map((h2) => {
      observer.observe(h2);

      return {
        text: h2.dataset.text!,
        anchor: '#' + h2.id,
      };
    });

    setHeadings(h2s);

    return () => {
      h2Headings.map((h2) => {
        observer.unobserve(h2);
      });
    };
  }, []);

  return (
    <div className='container'>
      <p>Table of Contents</p>
      {headings.length > 0 ? (
        <>
          {headings.map((heading) => (
            <Link
              key={heading.text}
              ref={(el: HTMLAnchorElement) => tocLinksRef.current.push(el)}
              href={heading.anchor}
            >
              {heading.text}
            </Link>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default TableOfContents;
