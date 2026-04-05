export type Block = CamelCaseConversion<DatabaseBlock>;

export type DatabaseBlock = {
  active_days: number[];
  id: string;
  name: string;
  time_end: string;
  time_start: string;
};

export type FormBlock = Omit<Block, 'id'>;

type CamelCase<S extends string> = S extends `${infer A}_${infer B}`
  ? `${A}${Capitalize<CamelCase<B>>}`
  : S;

type CamelCaseConversion<T> = {
  [K in keyof T as CamelCase<K & string>]: T[K];
};

export function isFormBlock(targetObject: unknown): targetObject is FormBlock {
  return (
    typeof targetObject === 'object' &&
    'name' in targetObject &&
    'activeDays' in targetObject &&
    'timeEnd' in targetObject &&
    'timeStart' in targetObject
  );
}

export function toCamelCase<T extends Record<string, unknown>>(
  targetObject: T
): CamelCaseConversion<T> {
  return Object.fromEntries(
    Object.entries(targetObject).map(([objectKey, objectValue]) => [
      objectKey.replace(/_([a-z])/g, (_, keyCharacter) =>
        keyCharacter.toUpperCase()
      ),
      objectValue,
    ])
  ) as CamelCaseConversion<T>;
}
