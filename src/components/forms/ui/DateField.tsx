import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { useState } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Field, FieldError, FieldLabel } from '@/components/ui/Field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { cn } from '@/lib/utils';

type Props<TFieldValues extends FieldValues> = {
  canReset?: boolean;
  className?: string;
  fieldLabel?: string;
  fieldName: Path<TFieldValues>;
};

export function DateField<TFieldValues extends FieldValues>({
  canReset,
  fieldLabel,
  fieldName,
}: Props<TFieldValues>) {
  const formHandler = useFormContext<TFieldValues>();
  const [isOpen, setIsOpen] = useState(false);

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
            </FieldLabel>
          )}
          <Popover onOpenChange={setIsOpen} open={isOpen}>
            <PopoverContent align="start" className="p-0 w-auto">
              <Calendar
                defaultMonth={
                  field.value ? toLocalDate(field.value) : undefined
                }
                mode="single"
                onSelect={(selectedDate: Date) =>
                  field.onChange(
                    selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''
                  )
                }
                selected={field.value ? toLocalDate(field.value) : undefined}
              />
            </PopoverContent>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  'cursor-pointer flex font-normal justify-between',
                  !field.value && '!text-muted-foreground',
                  fieldState.invalid && 'border-destructive'
                )}
                id={field.name}
                variant="outline"
              >
                {field.value ? (
                  format(toLocalDate(field.value), 'PPP')
                ) : (
                  <span>Select Date</span>
                )}
                {canReset && field.value ? (
                  <span
                    aria-label="Clear Date"
                    className="-m-2 p-2"
                    onClick={(clickEvent) => {
                      clickEvent.stopPropagation();
                      clickEvent.preventDefault();

                      field.onChange(undefined);
                      setIsOpen(false);
                    }}
                    role="button"
                  >
                    <X className="size-3.5" />
                  </span>
                ) : (
                  <CalendarIcon className="size-3.5" />
                )}
              </Button>
            </PopoverTrigger>
          </Popover>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

function toLocalDate(dateString: string) {
  return new Date(`${dateString}T00:00:00`);
}
