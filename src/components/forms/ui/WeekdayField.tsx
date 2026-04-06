import {
  Controller,
  FieldPathByValue,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Field, FieldError, FieldLabel } from '@/components/ui/Field';
import { cn } from '@/lib/utils';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

type Props<TFieldValues extends FieldValues> = {
  className?: string;
  fieldLabel?: string;
  fieldName: FieldPathByValue<TFieldValues, number[]>;
};

export function WeekdayField<TFieldValues extends FieldValues>({
  fieldLabel,
  fieldName,
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
            >
              {fieldLabel}
            </FieldLabel>
          )}
          <div className="flex gap-1.5 justify-between">
            {DAY_LABELS.map((dayLabel, dayIndex) => {
              const isActive = field.value.includes(dayIndex);

              return (
                <Button
                  aria-label={dayLabel}
                  aria-pressed={isActive}
                  className="aspect-square px-0 rounded-full text-center hover:cursor-pointer"
                  key={dayIndex}
                  onClick={() => {
                    formHandler.setValue(
                      field.name,
                      isActive
                        ? field.value.filter(
                            (activeDay: number) => activeDay !== dayIndex
                          )
                        : [...field.value, dayIndex]
                    );
                  }}
                  size="sm"
                  type="button"
                  variant={isActive ? 'default' : 'outline'}
                >
                  {dayLabel}
                </Button>
              );
            })}
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
