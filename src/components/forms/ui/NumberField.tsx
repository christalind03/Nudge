import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

type Props<TFieldValues extends FieldValues> = {
  className?: string;
  fieldLabel?: string;
  fieldName: Path<TFieldValues>;
  fieldOptional?: boolean;
  maxValue: number;
  minValue: number;
};

export function NumberField<TFieldValues extends FieldValues>({
  className,
  fieldLabel,
  fieldName,
  fieldOptional = false,
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
            <FieldLabel
              className={cn(fieldState.invalid && 'text-destructive')}
              htmlFor={field.name}
            >
              {fieldLabel}
              {fieldOptional && (
                <span className="text-muted-foreground text-xs">
                  (optional)
                </span>
              )}
            </FieldLabel>
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
