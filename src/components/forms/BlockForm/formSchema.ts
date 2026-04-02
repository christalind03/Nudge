import * as z from 'zod';

import { REQUIRED_MESSAGE } from '@/components/forms/constants';

function convertMinutes(activeTime: string) {
  const [totalHours, totalMinutes] = activeTime.split(':').map(Number);
  return totalHours * 60 + totalMinutes;
}

export const defaultSchema = {
  activeDays: [] as number[],
  name: '',
  timeEnd: '',
  timeStart: '',
} as FormSchema;

export const formSchema = z
  .object({
    activeDays: z
      .array(z.number().min(0).max(6))
      .nonempty({ message: REQUIRED_MESSAGE }),
    name: z.string().nonempty({ message: REQUIRED_MESSAGE }),
    timeEnd: z.string().nonempty({ message: REQUIRED_MESSAGE }).time(),
    timeStart: z.string().nonempty({ message: REQUIRED_MESSAGE }).time(),
  })
  .superRefine(({ timeEnd, timeStart }, schemaContext) => {
    if (!timeEnd || !timeStart) {
      return;
    }

    const minutesEnd = convertMinutes(timeEnd);
    const minutesStart = convertMinutes(timeStart);

    if (minutesEnd <= minutesStart) {
      schemaContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'The end time must be after the start time',
        path: ['timeEnd'],
      });

      return;
    } else if (minutesEnd - minutesStart < 5) {
      schemaContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'The time difference must be at least 5 minutes',
        path: ['timeEnd'],
      });

      return;
    }
  });

export type FormSchema = z.infer<typeof formSchema>;
