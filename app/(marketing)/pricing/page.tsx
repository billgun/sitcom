'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export interface PricingTierFrequency {
  id: string;
  value: string;
  label: string;
  priceSuffix: string;
}

export interface PricingTier {
  name: string;
  id: string;
  href: string;
  discountPrice: string | Record<string, string>;
  price: string | Record<string, string>;
  description: string | React.ReactNode;
  features: string[];
  featured?: boolean;
  highlighted?: boolean;
  cta: string;
  soldOut?: boolean;
}

const frequencies: PricingTierFrequency[] = [
  { id: '1', value: '1', label: 'Monthly', priceSuffix: '/month' },
  { id: '2', value: '2', label: 'Annually', priceSuffix: '/year' },
];

const tiers: PricingTier[] = [
  {
    name: 'Free',
    id: '0',
    href: '/subscribe',
    price: { '1': '$0', '2': '$0' },
    discountPrice: { '1': '', '2': '' },
    description: `Get all goodies for free, no credit card required.`,
    features: [
      `Multi-platform compatibility`,
      `Real-time notification system`,
      `Advanced user permissions`,
      `Multi-platform compatibility`,
      `Real-time notification system`,
      `Advanced user permissions`,
    ],
    featured: false,
    highlighted: false,
    soldOut: false,
    cta: `Sign up`,
  },
  {
    name: 'Pro',
    id: '1',
    href: '/subscribe',
    price: { '1': '$3.99', '2': '$49.99' },
    discountPrice: { '1': '', '2': '' },
    description: `When you grow, need more power and flexibility.`,
    features: [
      `All in the free plan plus`,
      `Customizable templates`,
      `Integration with third-party apps`,
    ],
    featured: false,
    highlighted: true,
    soldOut: true,
    cta: `Get started`,
  },
  {
    name: 'Scaler',
    id: '2',
    href: '/contact-us',
    price: { '1': '$14.99', '2': '$179.88' },
    discountPrice: { '1': '', '2': '' },
    description: `When you grow, need more power and flexibility.`,
    features: [
      `All in the pro plan plus`,
      `Priority support`,
      `Enterprise-grade security`,
    ],
    featured: true,
    highlighted: false,
    soldOut: false,
    cta: `Get started`,
  },
];

export default function PricingPage() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  const bannerText = '';

  return (
    <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
      <div className={cn('flex w-full flex-col items-center')}>
        <div className='flex w-full flex-col items-center'>
          <div className='mx-auto flex max-w-7xl flex-col items-center px-6 lg:px-8'>
            <div className='mx-auto w-full max-w-4xl lg:w-auto lg:text-center'>
              <h1 className='max-w-xs text-4xl font-semibold !leading-tight text-black dark:text-white sm:max-w-none md:text-6xl'>
                A pricing page
              </h1>
              <p className='max-w-[42rem] leading-normal text-muted-foreground'>
                That doesn&apos;t really work but you can demo something out of
                it i guess
              </p>
            </div>

            {bannerText ? (
              <div className='my-4 flex w-full justify-center lg:w-auto'>
                <p className='w-full rounded-xl bg-slate-100 px-4 py-3 text-xs text-black dark:bg-slate-300/30 dark:text-white/80'>
                  {bannerText}
                </p>
              </div>
            ) : null}

            {frequencies.length > 1 ? (
              <div className='mt-16 flex justify-center'>
                <RadioGroup
                  defaultValue={frequency.value}
                  onValueChange={(value: string) => {
                    setFrequency(frequencies.find((f) => f.value === value)!);
                  }}
                  className='grid gap-x-1 rounded-full bg-white p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200/30 dark:bg-black dark:ring-gray-800'
                  style={{
                    gridTemplateColumns: `repeat(${frequencies.length}, minmax(0, 1fr))`,
                  }}
                >
                  <Label className='sr-only'>Payment frequency</Label>
                  {frequencies.map((option) => (
                    <Label
                      className={cn(
                        frequency.value === option.value
                          ? 'bg-slate-500/90 text-white dark:bg-slate-900/70 dark:text-white/70'
                          : 'bg-transparent text-gray-500 hover:bg-slate-500/10',
                        'cursor-pointer rounded-full px-2.5 py-2 transition-all'
                      )}
                      key={option.value}
                      htmlFor={option.value}
                    >
                      {option.label}

                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className='hidden'
                      />
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            ) : (
              <div className='mt-12' aria-hidden='true'></div>
            )}

            <div
              className={cn(
                'isolate mx-auto mb-28 mt-4 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none',
                tiers.length === 2 ? 'lg:grid-cols-2' : '',
                tiers.length === 3 ? 'lg:grid-cols-3' : ''
              )}
            >
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={cn(
                    'max-w-xs rounded-3xl p-8 ring-1 xl:p-10',
                    tier.highlighted ? 'ring-4' : ''
                  )}
                >
                  <h3
                    id={tier.id}
                    className={cn('text-2xl font-bold tracking-tight')}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      tier.featured
                        ? 'text-gray-300 dark:text-gray-500'
                        : 'text-gray-600 dark:text-gray-400',
                      'mt-4 text-sm leading-6'
                    )}
                  >
                    {tier.description}
                  </p>
                  <p className='mt-6 flex items-baseline gap-x-1'>
                    <span
                      className={cn(
                        'text-4xl font-bold tracking-tight',
                        tier.discountPrice &&
                          tier.discountPrice[
                            frequency.value as keyof typeof tier.discountPrice
                          ]
                          ? 'line-through'
                          : ''
                      )}
                    >
                      {typeof tier.price === 'string'
                        ? tier.price
                        : tier.price[frequency.value]}
                    </span>

                    <span>
                      {typeof tier.discountPrice === 'string'
                        ? tier.discountPrice
                        : tier.discountPrice[frequency.value]}
                    </span>

                    {typeof tier.price !== 'string' ? (
                      <span className={cn('text-sm font-semibold leading-6')}>
                        {frequency.priceSuffix}
                      </span>
                    ) : null}
                  </p>
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={cn(
                      'mt-6 flex shadow-sm',
                      tier.soldOut ? 'pointer-events-none' : ''
                    )}
                  >
                    <Button
                      size='lg'
                      disabled={tier.soldOut}
                      className={cn(
                        'w-full text-black dark:text-white',
                        !tier.highlighted && !tier.featured
                          ? 'bg-gray-100 dark:bg-gray-600'
                          : 'bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-700',
                        tier.featured || tier.soldOut
                          ? 'bg-white hover:bg-gray-200 dark:bg-neutral-900 dark:hover:bg-black'
                          : 'transition-opacity hover:opacity-80'
                      )}
                      variant={tier.highlighted ? 'default' : 'outline'}
                    >
                      {tier.soldOut ? 'Sold out' : tier.cta}
                    </Button>
                  </a>

                  <ul
                    className={cn('mt-8 space-y-3 text-sm leading-6 xl:mt-10')}
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className='flex gap-x-3'>
                        <CheckCircledIcon
                          className={cn(
                            tier.highlighted
                              ? 'text-muted-foreground'
                              : 'text-gray-500',
                            'h-6 w-5 flex-none'
                          )}
                          aria-hidden='true'
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p>
              Generated with{' '}
              <Link
                href='https://shipixen.com/shadcn-pricing-page'
                className='border-b-2 border-primary'
              >
                Shipixen.
              </Link>{' '}
              Check it out it&apos;s pretty cool!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
