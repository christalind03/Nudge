import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';

type Props<TFieldValues extends FieldValues> = {
  className?: string;
  fieldLabel?: string;
  fieldName: Path<TFieldValues>;
  maxValue: number;
  minValue: number;
};

export function NumberField<TFieldValues extends FieldValues>({
  className,
  fieldLabel,
  fieldName,
  maxValue,
  minValue,
}: Props<TFieldValues>) {
  const formHandler = useFormContext<TFieldValues>();

  return (
    <Controller
      control={formHandler.control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid} className={className}>
          {fieldLabel && (
            <FieldLabel htmlFor={field.name}>{fieldLabel}</FieldLabel>
          )}
          <Input
            {...field}
            aria-invalid={fieldState.invalid}
            id={field.name}
            max={maxValue}
            min={minValue}
            onChange={(changeEvent) =>
              field.onChange(changeEvent.target.valueAsNumber)
            }
            type="number"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
