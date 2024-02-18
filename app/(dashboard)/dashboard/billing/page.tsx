import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/session';
// import { stripe } from '@/lib/stripe';
// import { getUserSubscriptionPlan } from '@/lib/subscription';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { BillingForm } from '@/components/billing-form';
// import { DashboardHeader } from '@/components/header';
import { Icons } from '@/components/icons';
import { CheckoutForm } from '@/components/checkout-form';
import { AlertTriangleIcon } from 'lucide-react';

export const metadata = {
  title: 'Billing',
  description: 'Manage billing and your subscription plan.',
};

export default async function BillingPage() {
  //   const user = await getCurrentUser()

  //   if (!user) {
  //     redirect("/login")
  //   }

  //   const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  //   // If user has a pro plan, check cancel status on Stripe.
  //   let isCanceled = false;
  //   if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
  //     const stripePlan = await stripe.subscriptions.retrieve(
  //       subscriptionPlan.stripeSubscriptionId
  //     );
  //     isCanceled = stripePlan.cancel_at_period_end;
  //   }

  return (
    <div className='container'>
      <div className='flex items-center justify-between px-2'>
        <div className='grid gap-1'>
          <h1 className='font-heading text-3xl md:text-4xl'>Billing</h1>
          <p className='text-lg text-muted-foreground'>
            Manage billing and your subscription plan.
          </p>
        </div>
      </div>
      <div className='mt-4 grid gap-8'>
        <Alert className='!pl-14'>
          <AlertTriangleIcon />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription>
            Taxonomy app is a demo app using a Stripe test environment. You can
            find a list of test card numbers on the{' '}
            <a
              href='https://stripe.com/docs/testing#cards'
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-8'
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert>
        <CheckoutForm uiMode='hosted' />
      </div>
    </div>
  );
}
