import { useQuery } from '@tanstack/react-query';
import {
  Bell,
  LayoutGrid,
  MousePointerClick,
  Plus,
  Settings,
} from 'lucide-react';
import { useState } from 'react';

import { BlockRoute } from '@/components/BlockRoute';
import { Error } from '@/components/Error';
import { BlockForm } from '@/components/forms/BlockForm';
import { Loading } from '@/components/Loading';
import { Route } from '@/components/Route';
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
  const {
    data: blockData,
    error: blockError,
    isPending: blockPending,
  } = useQuery({
    queryFn: () => window.databaseAPI.readBlocks(),
    queryKey: ['blockData'],
  });

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
          <Route
            menuIcon={LayoutGrid}
            menuLabel="Dashboard"
            navigationPath="/"
          />
          <Route
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
          <BlockForm
            dialogProps={{
              onOpenChange: (openState) => setDialogOpen(openState),
              open: dialogOpen,
            }}
            formProps={{
              onSubmit: () => setDialogOpen(false),
            }}
          />
          <SidebarGroupContent className="flex flex-col min-h-0">
            {blockData && (
              <SidebarMenu className="border-l-2 border-solid flex flex-col min-h-0 ml-2.5 pl-1">
                <ScrollArea className="h-full" scrollHideDelay={0}>
                  {blockData.map((blockData) => (
                    <BlockRoute blockData={blockData} key={blockData.id} />
                  ))}
                </ScrollArea>
              </SidebarMenu>
            )}
            {blockError && (
              <Error
                errorDescription={blockError.message}
                errorTitle="Failed to Load Time Blocks"
                iconClass="size-3"
                textClass="text-xs"
              />
            )}
            {blockPending && <Loading />}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <Route
            menuIcon={Settings}
            menuLabel="Settings"
            navigationPath="/settings"
          />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
