import cronstrue from 'cronstrue';
import { useFormContext, useWatch } from 'react-hook-form';

import { FormSchema } from '@/components/forms/ReminderForm/index';
import { InputField } from '@/components/forms/ui/InputField';

const targetField = 'reminderData.repeatData.cronExpression';

export function RepeatCron() {
  const formHandler = useFormContext<FormSchema>();

  const cronExpression = useWatch({
    control: formHandler.control,
    name: targetField,
  });

  const cronState = formHandler.getFieldState(
    targetField,
    formHandler.formState
  );

  return (
    <div className="flex flex-col gap-1.5">
      <InputField
        autoComplete="off"
        fieldLabel="Cron Expression"
        fieldName={targetField}
        onChange={() => formHandler.trigger(targetField)}
        placeholder="* * * * *"
      />
      {cronExpression &&
        !cronState.invalid &&
        (() => {
          try {
            return (
              <p className="leading-tight text-muted-foreground text-xs">
                Scheduled for{' '}
                {cronstrue
                  .toString(cronExpression)
                  .replace(/^./, (c) => c.toLowerCase())}
              </p>
            );
          } catch {
            return null;
          }
        })()}
    </div>
  );
}
