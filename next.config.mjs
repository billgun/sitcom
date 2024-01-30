import nextMdx from '@next/mdx';

const withMdx = nextMdx();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withMdx(nextConfig);
