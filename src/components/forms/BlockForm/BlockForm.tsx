import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { ComponentProps, useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  defaultSchema,
  formSchema,
  FormSchema,
} from '@/components/forms/BlockForm';
import { FormDialog } from '@/components/forms/FormDialog';
import { InputField } from '@/components/forms/ui/InputField';
import { WeekdayField } from '@/components/forms/ui/WeekdayField';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { toast } from '@/components/ui/Toast';
import { Block, FormBlock } from '@/database/types';

type Props = {
  dialogProps?: ComponentProps<typeof Dialog>;
  formProps: {
    blockData?: Block;
    onSubmit?: () => void;
  };
};

export function BlockForm({
  dialogProps,
  formProps: { blockData, onSubmit },
}: Props) {
  console.log(blockData);
  const formHandler = useForm<FormSchema>({
    defaultValues: blockData ?? defaultSchema,
    resolver: zodResolver(formSchema),
  });

  const queryClient = useQueryClient();

  const editMode = useMemo(() => !!blockData, [blockData]);
  const handleSubmit = useCallback(
    async (formSchema: FormSchema) => {
      try {
        const formData = formSchema as FormBlock;
        const queryResult = editMode
          ? await window.databaseAPI.updateBlock(blockData.id, formData)
          : await window.databaseAPI.insertBlock(formData);

        if (queryResult) {
          await queryClient.invalidateQueries({ queryKey: ['blockData'] });

          toast({
            toastTitle: `Block "${formSchema.name}" ${editMode ? 'Updated' : 'Created'}`,
            toastVariant: 'success',
          });

          onSubmit();
        }
      } catch (errorObj) {
        toast({
          toastDescription: errorObj.message,
          toastTitle: 'Block Creation Failed',
          toastVariant: 'error',
        });
      }
    },
    [editMode, onSubmit, queryClient]
  );

  return (
    <FormDialog
      {...dialogProps}
      dialogDescription="Configure a schedule for certain reminders."
      dialogTitle={`${editMode ? 'Edit' : 'Create'} Time Block`}
    >
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
    </FormDialog>
  );
}
