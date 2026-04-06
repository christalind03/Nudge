import { LucideIcon } from 'lucide-react';
import { ReactNode, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import { cn } from '@/lib/utils';

type Props = {
  menuAction?: ReactNode;
  menuIcon?: LucideIcon;
  menuLabel: string;
  navigationPath: string;
};

export function Route({
  menuAction: MenuAction,
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
      {MenuAction && <SidebarMenuAction>{MenuAction}</SidebarMenuAction>}
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
