import { ChangeEvent, useCallback } from 'react';
import { FieldValues, Path, useFormContext, useWatch } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';

type Props<TFieldValues extends FieldValues> = {
  className?: string;
  fieldLabel?: string;
  hoursField: Path<TFieldValues>;
  minutesField: Path<TFieldValues>;
};

export function TimeField<TFieldValues extends FieldValues>({
  className,
  fieldLabel,
  hoursField,
  minutesField,
}: Props<TFieldValues>) {
  const formHandler = useFormContext<TFieldValues>();

  const hoursState = formHandler.getFieldState(
    hoursField,
    formHandler.formState
  );

  const minutesState = formHandler.getFieldState(
    minutesField,
    formHandler.formState
  );

  const hoursWatch = useWatch({
    control: formHandler.control,
    name: hoursField,
  });

  const minutesWatch = useWatch({
    control: formHandler.control,
    name: minutesField,
  });

  const displayValue = `${String(hoursWatch ?? 0).padStart(2, '0')}:${String(minutesWatch ?? 0).padStart(2, '0')}`;
  const fieldErrors = [hoursState.error, minutesState.error].filter(Boolean);
  const isInvalid = hoursState.invalid || minutesState.invalid;

  const handleChange = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>) => {
      const [recurringHours, recurringMinutes] = changeEvent.target.value
        .split(':')
        .map(Number);

      formHandler.setValue(hoursField, recurringHours as never, {
        shouldValidate: true,
      });
      formHandler.setValue(minutesField, recurringMinutes as never, {
        shouldValidate: true,
      });
    },
    [formHandler, hoursField, minutesField]
  );

  return (
    <Field aria-invalid={isInvalid} className={className}>
      {fieldLabel && <FieldLabel htmlFor={hoursField}>{fieldLabel}</FieldLabel>}
      <Input
        aria-invalid={isInvalid}
        id={hoursField}
        onChange={handleChange}
        type="time"
        value={displayValue}
      />
      {isInvalid && <FieldError errors={fieldErrors} />}
    </Field>
  );
}
