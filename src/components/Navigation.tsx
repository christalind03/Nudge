import {
  Bell,
  LayoutGrid,
  MousePointerClick,
  Plus,
  Settings,
} from 'lucide-react';
import { useState } from 'react';

import { BlockForm } from '@/components/forms/BlockForm';
import { ReminderForm } from '@/components/forms/ReminderForm';
import { NavigationRoute } from '@/components/NavigationRoute';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Separator } from '@/components/ui/Separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/Sidebar';

export function Navigation() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex gap-1 items-center ">
          <MousePointerClick
            className="scale-x-[-1] size-5.5"
            fill="currentColor"
          />
          <h1 className="font-bold text-xl">Nudge</h1>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu className="p-1">
          <NavigationRoute
            menuIcon={LayoutGrid}
            menuLabel="Dashboard"
            navigationPath="/"
          />
          <NavigationRoute
            menuIcon={Bell}
            menuLabel="Reminders"
            navigationPath="/reminders"
          />
        </SidebarMenu>
        <SidebarGroup className="flex flex-col min-h-0">
          <SidebarGroupLabel>Time Blocks</SidebarGroupLabel>
          <SidebarGroupAction
            asChild
            className="hover:cursor-pointer"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="size-3 text-accent-foreground" />
          </SidebarGroupAction>
          <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Reminder Block</DialogTitle>
                <DialogDescription>
                  Configure a schedule and time window for certain reminders.
                </DialogDescription>
              </DialogHeader>
              <Separator />
              <BlockForm onSubmit={() => setDialogOpen(false)} />
              {/*<ReminderForm onSubmit={() => setDialogOpen(false)} />*/}
            </DialogContent>
          </Dialog>
          <SidebarGroupContent className="flex flex-col min-h-0">
            <SidebarMenu className="border-l-2 border-solid flex flex-col min-h-0 ml-2.5 pl-1">
              <ScrollArea className="h-full" scrollHideDelay={0}>
                {Array.from({ length: 50 }, (_, arrayIndex) => (
                  <NavigationRoute
                    key={arrayIndex}
                    menuLabel={`Block ${arrayIndex}`}
                    navigationPath={`/blocks/${arrayIndex}`}
                  />
                ))}
              </ScrollArea>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <NavigationRoute
            menuIcon={Settings}
            menuLabel="Settings"
            navigationPath="/settings"
          />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
