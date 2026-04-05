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
import { toast } from '@/components/ui/Toast';
import { isFormBlock } from '@/database/types';

type Props = {
  onSubmit: () => void;
};

export function BlockForm({ onSubmit }: Props) {
  const formHandler = useForm<FormSchema>({
    defaultValues: defaultSchema,
    resolver: zodResolver(formSchema),
  });

  async function handleSubmit(formData: FormSchema) {
    if (!isFormBlock(formData)) {
      return;
    }

    const queryResult = await window.databaseAPI.insertBlock(formData);
    if (queryResult.success) {
      toast({
        toastTitle: `Block "${formData.name}" Created`,
        toastVariant: 'success',
      });

      onSubmit();
      return;
    }

    toast({
      toastDescription: queryResult.message,
      toastTitle: 'Block Creation Failed',
      toastVariant: 'error',
    });
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
