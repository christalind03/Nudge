import { CronExpressionParser } from 'cron-parser';
import { format } from 'date-fns';
import * as z from 'zod';

import { REQUIRED_MESSAGE } from '@/components/forms/constants';

const hoursSchema = z.number().min(0).max(23);
const minutesSchema = z.number().min(0).max(59);

const repeatDefaults = {
  repeatCron: {
    repeatData: {
      cronExpression: '',
    },
    repeatType: 'repeatCron',
  },
  repeatDaily: {
    repeatData: {
      days: 1,
      hours: 0,
      minutes: 0,
    },
    repeatType: 'repeatDaily',
  },
  repeatHourly: {
    repeatData: {
      hours: 0,
      minutes: 0,
    },
    repeatType: 'repeatHourly',
  },
  repeatMinutes: {
    repeatData: {
      minutes: 5,
    },
    repeatType: 'repeatMinutes',
  },
  repeatMonthly: {
    repeatData: {
      days: 1,
      hours: 0,
      minutes: 0,
    },
    repeatType: 'repeatMonthly',
  },
  repeatWeekly: {
    repeatData: {
      hours: 0,
      minutes: 0,
      weekdays: [] as number[],
    },
    repeatType: 'repeatWeekly',
  },
} as const;

const repeatSchema = z.discriminatedUnion('repeatType', [
  z.object({
    repeatData: z.object({
      cronExpression: z
        .string()
        .nonempty({ message: REQUIRED_MESSAGE })
        .superRefine((schemaData, schemaContext) => {
          const cronTerms = schemaData.trim().split(/\s+/);
          if (cronTerms.length !== 5) {
            schemaContext.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Expression must have exactly 5 fields',
            });

            return;
          }

          try {
            CronExpressionParser.parse(schemaData);
          } catch {
            schemaContext.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Unable to parse cron expression',
            });

            return;
          }
        }),
    }),
    repeatType: z.literal('repeatCron'),
  }),
  z.object({
    repeatData: z.object({
      days: z.number().min(1).max(365),
      hours: hoursSchema,
      minutes: minutesSchema,
    }),
    repeatType: z.literal('repeatDaily'),
  }),
  z.object({
    repeatData: z.object({
      hours: hoursSchema,
      minutes: minutesSchema,
    }),
    repeatType: z.literal('repeatHourly'),
  }),
  z.object({
    repeatData: z.object({
      minutes: minutesSchema.min(5),
    }),
    repeatType: z.literal('repeatMinutes'),
  }),
  z.object({
    repeatData: z.object({
      days: z.number().min(1).max(31),
      hours: hoursSchema,
      minutes: minutesSchema,
    }),
    repeatType: z.literal('repeatMonthly'),
  }),
  z.object({
    repeatData: z.object({
      hours: hoursSchema,
      minutes: minutesSchema,
      weekdays: z
        .array(z.number().min(0).max(6))
        .nonempty({ message: REQUIRED_MESSAGE }),
    }),
    repeatType: z.literal('repeatWeekly'),
  }),
]);

const reminderDefaults = {
  reminderOnce: {
    reminderData: {
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '',
    },
    reminderType: 'reminderOnce',
  },
  reminderRepeat: {
    reminderData: {
      dateStart: format(new Date(), 'yyyy-MM-dd'),
      ...repeatDefaults.repeatMinutes,
    },
    reminderType: 'reminderRepeat',
  },
} as const;

const reminderSchema = z.discriminatedUnion('reminderType', [
  z.object({
    reminderData: z.object({
      date: z.string().nonempty({ message: REQUIRED_MESSAGE }).date(),
      time: z.string().nonempty({ message: REQUIRED_MESSAGE }).time(),
    }),
    reminderType: z.literal('reminderOnce'),
  }),
  z.object({
    reminderData: z
      .object({
        dateEnd: z.string().nonempty().date().optional(),
        dateStart: z.string().nonempty({ message: REQUIRED_MESSAGE }).date(),
      })
      .and(repeatSchema),
    reminderType: z.literal('reminderRepeat'),
  }),
]);

const formSchema = z
  .object({
    label: z.string().nonempty({ message: REQUIRED_MESSAGE }),
  })
  .and(reminderSchema);

type FormSchema = z.infer<typeof formSchema>;

export { formSchema, FormSchema, reminderDefaults, repeatDefaults };
