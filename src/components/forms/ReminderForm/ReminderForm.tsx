import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentProps, useCallback } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { FormDialog } from '@/components/forms/FormDialog';
import {
  formSchema,
  FormSchema,
  reminderDefaults,
} from '@/components/forms/ReminderForm';
import { ReminderOnce } from '@/components/forms/ReminderForm/ReminderOnce';
import { ReminderRepeat } from '@/components/forms/ReminderForm/ReminderRepeat';
import { InputField } from '@/components/forms/ui/InputField';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

type Props = {
  dialogProps?: ComponentProps<typeof Dialog>;
  formProps: {
    onSubmit?: () => void;
  };
};

export function ReminderForm({ dialogProps, formProps: { onSubmit } }: Props) {
  const formHandler = useForm<FormSchema>({
    defaultValues: {
      label: '',
      ...reminderDefaults.reminderOnce,
    },
    resolver: zodResolver(formSchema),
  });

  const changeTab = useCallback(
    (activeTab: string) => {
      formHandler.reset({
        label: formHandler.getValues('label'),
        ...reminderDefaults[activeTab as keyof typeof reminderDefaults],
      });
    },
    [formHandler]
  );

  const handleSubmit = useCallback(
    (formData: FormSchema) => console.log(formData),
    [onSubmit]
  );

  const reminderType = useWatch({
    control: formHandler.control,
    name: 'reminderType',
  });

  return (
    <FormDialog
      {...dialogProps}
      dialogDescription="Configure when this reminder is triggered."
      dialogTitle="Create Reminder"
    >
      <FormProvider {...formHandler}>
        <form
          className="space-y-3"
          onSubmit={formHandler.handleSubmit(handleSubmit)}
        >
          <InputField
            autoComplete="off"
            fieldLabel="Label"
            fieldName="label"
            placeholder="e.g. Morning Focus Session"
          />
          <Tabs onValueChange={changeTab} value={reminderType}>
            <TabsList className="w-full">
              <TabsTrigger value="reminderOnce">Fixed</TabsTrigger>
              <TabsTrigger value="reminderRepeat">Recurring</TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col gap-3" value="reminderOnce">
              <ReminderOnce />
            </TabsContent>
            <TabsContent className="flex flex-col gap-3" value="reminderRepeat">
              <ReminderRepeat />
            </TabsContent>
          </Tabs>
          <Button
            className="cursor-pointer w-full"
            onClick={() => console.log(formHandler.getValues())}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </FormDialog>
  );
}
