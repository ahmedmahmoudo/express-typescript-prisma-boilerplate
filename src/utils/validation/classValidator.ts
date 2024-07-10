import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export const validateInput = async <T>(
  cls: ClassConstructor<T>,
  inputData: unknown,
): Promise<[T, ValidationError[] | null]> => {
  const input = plainToInstance<T, unknown>(cls, inputData) as object;

  const errors = await validate(input);

  return [input as T, errors.length > 0 ? errors : null];
};
