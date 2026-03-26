import { LucideIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/Sidebar';
import { cn } from '@/lib/utils';

type Props = {
  menuIcon?: LucideIcon;
  menuLabel: string;
  navigationPath: string;
};

export function NavigationRoute({
  menuIcon: MenuIcon,
  menuLabel,
  navigationPath,
}: Props) {
  const { pathname: locationPath } = useLocation();

  const isActive = useMemo(
    () => locationPath === navigationPath,
    [locationPath, navigationPath]
  );

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          isActive && 'font-medium text-primary hover:text-primary'
        )}
      >
        <Link to={navigationPath}>
          {MenuIcon && <MenuIcon className="size-4" />}
          <span className="flex-1 min-w-0 truncate">{menuLabel}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
