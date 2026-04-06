import { Plus } from 'lucide-react';
import { Fragment, useState } from 'react';

import { ReminderForm } from '@/components/forms/ReminderForm';
import { Button } from '@/components/ui/Button';

type Props = {
  displayCreateButton?: boolean;
  routeLabel: string;
};

export function RouteHeader({ displayCreateButton = true, routeLabel }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <header className="border-b flex items-center justify-between p-2 w-full">
      <span className="font-bold text-xl">{routeLabel}</span>
      {displayCreateButton && (
        <Fragment>
          <Button
            className="cursor-pointer"
            onClick={() => setDialogOpen(true)}
            size="sm"
            variant="secondary"
          >
            <Plus className="size-4" />
            New Reminder
          </Button>
          <ReminderForm
            dialogProps={{
              onOpenChange: (openState) => setDialogOpen(openState),
              open: dialogOpen,
            }}
            formProps={{
              onSubmit: () => setDialogOpen(false),
            }}
          />
        </Fragment>
      )}
    </header>
  );
}
