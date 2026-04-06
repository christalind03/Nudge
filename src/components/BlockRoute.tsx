import { useQueryClient } from '@tanstack/react-query';
import { Ellipsis, SquarePen, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';

import { BlockForm } from '@/components/forms/BlockForm';
import { Route } from '@/components/Route';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { toast } from '@/components/ui/Toast';
import { Block } from '@/database/types';

type Props = {
  blockData: Block;
};

export function BlockRoute({ blockData }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteBlock = useCallback(async () => {
    try {
      const queryResult = await window.databaseAPI.deleteBlock(blockData.id);
      if (queryResult) {
        await queryClient.invalidateQueries({ queryKey: ['blockData'] });

        toast({
          toastTitle: `Block "${blockData.name}" Deleted`,
          toastVariant: 'success',
        });
      }
    } catch (errorObj) {
      toast({
        toastDescription: errorObj.message,
        toastTitle: 'Block Deletion Failed',
        toastVariant: 'error',
      });
    }
  }, [blockData, queryClient]);

  return (
    <Route
      menuAction={
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={(selectEvent) => {
                selectEvent.preventDefault();
                setDialogOpen(true);
              }}
            >
              <SquarePen className="size-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <BlockForm
              dialogProps={{
                onOpenChange: (openState) => setDialogOpen(openState),
                open: dialogOpen,
              }}
              formProps={{
                blockData,
                onSubmit: () => setDialogOpen(false),
              }}
            />
            <AlertDialog>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive">
                    <Trash2 />
                  </AlertDialogMedia>
                  <AlertDialogTitle>
                    Delete &quot;{blockData.name}&quot;?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-xs">
                    This action cannot be undone and will delete all reminders
                    associated with this time block.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="outline">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={deleteBlock}
                    variant="destructive"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(selectEvent) => selectEvent.preventDefault()}
                  variant="destructive"
                >
                  <Trash2 className="size-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </AlertDialog>
          </DropdownMenuContent>
          <DropdownMenuTrigger
            asChild
            className="cursor-pointer opacity-0 mr-5.5 text-muted-foreground data-[state=open]:opacity-100 group-hover/menu-item:opacity-100"
          >
            <Ellipsis className="size-4" />
          </DropdownMenuTrigger>
        </DropdownMenu>
      }
      menuLabel={blockData.name}
      navigationPath={`/blocks/${blockData.id}`}
    />
  );
}
