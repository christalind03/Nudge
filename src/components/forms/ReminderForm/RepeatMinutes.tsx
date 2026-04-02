import { NumberField } from '@/components/forms/ui/NumberField';

export function RepeatMinutes() {
  return (
    <div className="flex gap-1.5 items-center">
      <span>Every</span>
      <NumberField
        className="flex-1"
        fieldName="reminderData.repeatData.minutes"
        maxValue={59}
        minValue={5}
      />
      <span>minute&#40;s&#41;</span>
    </div>
  );
}
