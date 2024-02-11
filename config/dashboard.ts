import { DashboardConfig } from '@/types';
import { CameraIcon, FileTextIcon, IdCardIcon } from '@radix-ui/react-icons';

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
      icon: IdCardIcon,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: CameraIcon,
    },
  ],
};
