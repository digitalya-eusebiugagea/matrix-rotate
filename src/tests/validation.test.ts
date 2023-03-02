import * as fs from 'fs';
import { ValidationError } from 'yup';
import { argvSchema, itemSchema } from '../validationSchemas';

jest.mock("fs");

class NoErrorThrownError extends Error {}

const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};

describe("validation", () => {
    describe("argv validation", () => {
        it('passes validation given correct input', async () => {
            const input = ['arg0', 'arg1', 'arg2'];

            const error = await getError(async () => argvSchema.validate(input));

            expect(error).toBeInstanceOf(NoErrorThrownError);
        })

        it('throws error given a wrong input', async () => {
            const input = ['arg0', 'arg1'];

            const error = await getError(async () => argvSchema.validate(input));

            expect(error).not.toBeInstanceOf(NoErrorThrownError);
        })
    })

    describe("row validation", () => {
        it("passes validation given a square matrix", async () => {
            const input = {
                id: '1',
                json: [1, 2, 3, 4]
            }

            const error = await getError(async () => itemSchema.validate(input));

            expect(error).toBeInstanceOf(NoErrorThrownError);
        })

        it("throws error given a non-square matrix", async () => {
            const input = {
                id: '1',
                json: [1, 2, 3]
            }

            const error = await getError(async () => itemSchema.validate(input));

            expect(error).toBeInstanceOf(ValidationError);
        })
    })
})