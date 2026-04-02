import { Fragment } from 'react';

import { NumberField } from '@/components/forms/ui/NumberField';
import { TimeField } from '@/components/forms/ui/TimeField';

export function RepeatMonthly() {
  return (
    <Fragment>
      <div className="flex gap-1.5 items-center">
        <span>On day</span>
        <NumberField
          className="flex-1"
          fieldName="reminderData.repeatData.days"
          maxValue={31}
          minValue={1}
        />
        <span>of each month</span>
      </div>
      <div className="flex gap-1.5 items-center">
        <span>at</span>
        <TimeField
          className="flex-1"
          hoursField="reminderData.repeatData.hours"
          minutesField="reminderData.repeatData.minutes"
        />
      </div>
    </Fragment>
  );
}
