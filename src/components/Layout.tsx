import { Outlet } from 'react-router-dom';

import { Navigation } from '@/components/Navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';

export function Layout() {
  return (
    <SidebarProvider>
      <Navigation />
      <main>
        <SidebarTrigger className="md:hidden" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
