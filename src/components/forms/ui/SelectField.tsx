import { ReactElement } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import { Field, FieldLabel } from '@/components/ui/Field';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { cn } from '@/lib/utils';

type Props<TFieldValues extends FieldValues> = {
  fieldLabel?: string;
  fieldName: Path<TFieldValues>;
  fieldOptional?: boolean;
  renderOptions: () => ReactElement | ReactElement[];
  selectPlaceholder?: string;
};

export function SelectField<TFieldValues extends FieldValues>({
  fieldLabel,
  fieldName,
  fieldOptional = false,
  renderOptions,
  selectPlaceholder,
}: Props<TFieldValues>) {
  const formHandler = useFormContext<TFieldValues>();

  return (
    <Controller
      control={formHandler.control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
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
          <Select {...field}>
            <SelectContent position="popper">{renderOptions()}</SelectContent>
            <SelectTrigger>
              <SelectValue placeholder={selectPlaceholder ?? '---'} />
            </SelectTrigger>
          </Select>
        </Field>
      )}
    />
  );
}
