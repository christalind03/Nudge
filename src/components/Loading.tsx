import { Spinner } from '@/components/ui/Spinner';

export function Loading() {
  return (
    <div className="flex items-center justify-center size-full">
      <Spinner />
    </div>
  );
}
