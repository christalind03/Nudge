import { NumberField } from '@/components/forms/ui/NumberField';

export function RepeatHourly() {
  return (
    <div className="flex gap-1.5 items-center">
      <span>Every</span>
      <NumberField
        className="flex-1"
        fieldName="reminderData.repeatData.hours"
        maxValue={23}
        minValue={1}
      />
      <span>hour&#40;s&#41; at</span>
      <NumberField
        className="flex-1"
        fieldName="reminderData.repeatData.minutes"
        maxValue={59}
        minValue={0}
      />
      <span>minute&#40;s&#41;</span>
    </div>
  );
}
