'use client';
import { DashboardNav } from '@/components/dashboard-nav';
import { SiteHeader } from '@/components/site-header';
import { dashboardConfig } from '@/config/dashboard';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen flex-col space-y-6'>
      <SiteHeader />
      <div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='hidden w-[200px] flex-col md:flex'>
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className='flex w-full flex-1 flex-col overflow-hidden'>
          {children}
        </main>
      </div>
      {/* <SiteFooter className='border-t' /> */}
    </div>
  );
}
