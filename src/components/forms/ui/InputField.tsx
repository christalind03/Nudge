import { ComponentProps } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';

type Props<TFieldValues extends FieldValues> = ComponentProps<typeof Input> & {
  className?: string;
  fieldLabel?: string;
  fieldName: Path<TFieldValues>;
};

export function InputField<TFieldValues extends FieldValues>({
  className,
  fieldLabel,
  fieldName,
  ...inputProps
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
            {...inputProps}
            aria-invalid={fieldState.invalid}
            id={field.name}
            onChange={(changeEvent) => {
              field.onChange(changeEvent);
              inputProps.onChange?.(changeEvent);
            }}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
