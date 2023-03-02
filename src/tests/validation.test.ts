import * as fs from 'fs';
import { ValidationError } from 'yup';
import { argvSchema, itemSchema } from '../validationSchemas';

jest.mock("fs");

describe("validation", () => {
    describe("argv validation", () => {
        it('passes validation given correct input', async () => {
            const input = ['arg0', 'arg1', 'arg2'];

            const output = await argvSchema.validate(input);

            expect(output).toEqual(input);
        })

        it('throws error given a wrong input', async () => {
            const input = ['arg0', 'arg1'];

            expect(() => argvSchema.validate(input)).rejects.toThrow(ValidationError);
        })
    })

    describe("row validation", () => {
        it("passes validation given a square matrix", async () => {
            const input = {
                id: '1',
                json: [1, 2, 3, 4]
            }

            const output = await itemSchema.validate(input);

            expect(output).toEqual(input);
        })

        it("throws error given a non-square matrix", async () => {
            const input = {
                id: '1',
                json: [1, 2, 3]
            }

            expect(itemSchema.validate(input)).rejects.toThrow(ValidationError);
        })
    })
})