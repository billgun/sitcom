'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PlaygroundPage() {
  const formAction = async (data: FormData): Promise<void> => {
    console.log('click');
    await account();
  };
  return (
    <div className='container grid grid-cols-3 px-4 py-6 lg:px-8'>
      <form action={formAction}>
        ZA playground
        <Link href={'/account/stripe/connect'}>Stripe</Link>
      </form>
    </div>
  );
}
