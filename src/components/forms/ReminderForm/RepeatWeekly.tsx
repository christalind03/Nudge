import { Fragment } from 'react';

import { TimeField } from '@/components/forms/ui/TimeField';
import { WeekdayField } from '@/components/forms/ui/WeekdayField';

export function RepeatWeekly() {
  return (
    <Fragment>
      <div className="flex gap-3 items-center">
        <span>Every</span>
        <WeekdayField fieldName="reminderData.repeatData.weekdays" />
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
