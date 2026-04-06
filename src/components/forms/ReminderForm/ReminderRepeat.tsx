import { Fragment, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import {
  FormSchema,
  repeatDefaults,
} from '@/components/forms/ReminderForm/index';
import { RepeatCron } from '@/components/forms/ReminderForm/RepeatCron';
import { RepeatDaily } from '@/components/forms/ReminderForm/RepeatDaily';
import { RepeatHourly } from '@/components/forms/ReminderForm/RepeatHourly';
import { RepeatMinutes } from '@/components/forms/ReminderForm/RepeatMinutes';
import { RepeatMonthly } from '@/components/forms/ReminderForm/RepeatMonthly';
import { RepeatWeekly } from '@/components/forms/ReminderForm/RepeatWeekly';
import { DateField } from '@/components/forms/ui/DateField';
import { Divider } from '@/components/forms/ui/Divider';
import { Field, FieldLabel } from '@/components/ui/Field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

export function ReminderRepeat() {
  const formHandler = useFormContext<FormSchema>();

  const changeSelect = useCallback(
    (activeSelect: string) => {
      formHandler.reset({
        label: formHandler.getValues('label'),
        reminderData: {
          ...repeatDefaults[activeSelect as keyof typeof repeatDefaults],
        },
        reminderType: 'reminderRepeat',
      });
    },
    [formHandler]
  );

  const repeatType = useWatch({
    control: formHandler.control,
    name: 'reminderData.repeatType',
  });

  return (
    <Fragment>
      <Divider dividerLabel="WHEN" />
      <DateField fieldLabel="Start Date" fieldName="reminderData.dateStart" />
      <DateField
        canReset
        fieldLabel="End Date"
        fieldName="reminderData.dateEnd"
        fieldOptional
      />
      <Divider dividerLabel="FREQUENCY" />
      <Field>
        <FieldLabel htmlFor="selectFrequency">Run</FieldLabel>
        <Select onValueChange={changeSelect} value={repeatType}>
          <SelectContent position="popper">
            <SelectItem value="repeatMinutes">
              Every <span className="font-mono">&#123;x&#125;</span> Minutes
            </SelectItem>
            <SelectItem value="repeatHourly">Hourly</SelectItem>
            <SelectItem value="repeatDaily">Daily</SelectItem>
            <SelectItem value="repeatWeekly">Weekly</SelectItem>
            <SelectItem value="repeatMonthly">Monthly</SelectItem>
            <SelectItem value="repeatCron">Advanced</SelectItem>
          </SelectContent>
          <SelectTrigger id="selectFrequency">
            <SelectValue placeholder="---" />
          </SelectTrigger>
        </Select>
      </Field>
      {repeatType === 'repeatCron' && <RepeatCron />}
      {repeatType === 'repeatDaily' && <RepeatDaily />}
      {repeatType === 'repeatHourly' && <RepeatHourly />}
      {repeatType === 'repeatMinutes' && <RepeatMinutes />}
      {repeatType === 'repeatMonthly' && <RepeatMonthly />}
      {repeatType === 'repeatWeekly' && <RepeatWeekly />}
    </Fragment>
  );
}
