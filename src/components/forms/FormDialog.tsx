import { ComponentProps, ReactElement } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Separator } from '@/components/ui/Separator';

type Props = ComponentProps<typeof Dialog> & {
  children: ReactElement;
  dialogDescription: string;
  dialogTitle: string;
};

export function FormDialog({
  children,
  dialogDescription,
  dialogTitle,
  ...dialogProps
}: Props) {
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Separator />
        {children}
      </DialogContent>
    </Dialog>
  );
}
