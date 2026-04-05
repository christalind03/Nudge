import { Info } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';

type Props = {
  errorDescription: string;
  errorTitle: string;
  iconClass?: string;
  textClass?: string;
};

export function Error({
  errorDescription,
  errorTitle,
  iconClass,
  textClass,
}: Props) {
  return (
    <Alert className="bg-red-200 border-red-300" variant="destructive">
      <Info className={cn('size-4 text-red-600', iconClass)} />
      <AlertTitle className={cn('text-red-600', textClass)}>
        {errorTitle}
      </AlertTitle>
      <AlertDescription className={cn('text-red-600', textClass)}>
        {errorDescription}
      </AlertDescription>
    </Alert>
  );
}
