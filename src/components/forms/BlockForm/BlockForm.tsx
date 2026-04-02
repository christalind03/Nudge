import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import {
  defaultSchema,
  formSchema,
  FormSchema,
} from '@/components/forms/BlockForm';
import { InputField } from '@/components/forms/ui/InputField';
import { WeekdayField } from '@/components/forms/ui/WeekdayField';
import { Button } from '@/components/ui/Button';

type Props = {
  onSubmit: () => void;
};

export function BlockForm({ onSubmit }: Props) {
  const formHandler = useForm<FormSchema>({
    defaultValues: defaultSchema,
    resolver: zodResolver(formSchema),
  });

  function handleSubmit(formData: FormSchema) {
    console.log(formData);
    onSubmit();
  }

  return (
    <FormProvider {...formHandler}>
      <form
        className="space-y-3"
        onSubmit={formHandler.handleSubmit(handleSubmit)}
      >
        <InputField
          autoComplete="off"
          fieldLabel="Label"
          fieldName="name"
          placeholder="e.g. Morning Focus Session"
        />
        <WeekdayField fieldLabel="Active Days" fieldName="activeDays" />
        <div className="flex gap-5">
          <InputField fieldLabel="Time" fieldName="timeStart" type="time" />
          <InputField fieldLabel="Time" fieldName="timeEnd" type="time" />
        </div>
        <Button className="cursor-pointer w-full" type="submit">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
