import { Fragment } from 'react';

import { DateField } from '@/components/forms/ui/DateField';
import { Divider } from '@/components/forms/ui/Divider';
import { InputField } from '@/components/forms/ui/InputField';

export function ReminderOnce() {
  return (
    <Fragment>
      <Divider dividerLabel="WHEN" />
      <DateField fieldLabel="Date" fieldName="reminderData.date" />
      <InputField fieldLabel="Time" fieldName="reminderData.time" type="time" />
    </Fragment>
  );
}
