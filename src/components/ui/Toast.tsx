import { CircleCheck, Info, TriangleAlert } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  id: number | string;
  toastDescription?: string;
  toastTitle: string;
  toastVariant?: 'error' | 'success' | 'warning';
};

function toast(toastProps: Omit<Props, 'id'>) {
  return sonnerToast.custom((toastID) => (
    <Toast id={toastID} {...toastProps} />
  ));
}

function Toast({
  className,
  toastDescription,
  toastTitle,
  toastVariant,
}: Props) {
  return (
    <div
      className={cn(
        'bg-background border flex font-sans gap-1.5 items-start max-w-sm p-3 rounded-lg shadow-lg text-sm',
        toastVariant === 'error' && 'bg-red-200 border-red-300 text-red-600',
        toastVariant === 'success' &&
          'bg-green-100 border-green-200 text-green-600',
        toastVariant === 'warning' &&
          'bg-yellow-100 border-yellow-200 text-yellow-600',
        className
      )}
    >
      {toastVariant && (
        <div className="mt-0.5">
          {toastVariant === 'error' && <Info className="size-4" />}
          {toastVariant === 'success' && <CircleCheck className="size-4" />}
          {toastVariant === 'warning' && <TriangleAlert className="size-4" />}
        </div>
      )}
      <div>
        <span className="font-medium">{toastTitle}</span>
        {toastDescription && <p className="line-clamp-2">{toastDescription}</p>}
      </div>
    </div>
  );
}

export { toast };
