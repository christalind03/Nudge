import { Separator } from '@/components/ui/Separator';

type Props = {
  dividerLabel?: string;
};

export function Divider({ dividerLabel }: Props) {
  return (
    <div className="flex gap-3 items-center">
      <span className="font-bold text-muted-foreground text-xs">
        {dividerLabel}
      </span>
      <Separator className="flex-1" />
    </div>
  );
}
