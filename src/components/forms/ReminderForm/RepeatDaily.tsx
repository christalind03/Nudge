import { NumberField } from '@/components/forms/ui/NumberField';
import { TimeField } from '@/components/forms/ui/TimeField';

export function RepeatDaily() {
  return (
    <div className="flex gap-1.5 items-center">
      <span>Every</span>
      <NumberField
        className="flex-1"
        fieldName="reminderData.repeatData.days"
        maxValue={365}
        minValue={1}
      />
      <span>day&#40;s&#41; at</span>
      <TimeField
        className="flex-1"
        hoursField="reminderData.repeatData.hours"
        minutesField="reminderData.repeatData.minutes"
      />
    </div>
  );
}
