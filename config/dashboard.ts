import { DashboardConfig } from '@/types';
import { CogIcon, CreditCardIcon, FileTextIcon } from 'lucide-react';

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Posts',
      href: '/dashboard',
      icon: FileTextIcon,
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: CreditCardIcon,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: CogIcon,
    },
  ],
};
