import { array, number, object, string } from 'yup';

export const itemSchema = object({
    id: string().required(),
    json: array(number()).required().test('is-square-matrix', 'not a square matrix', (p) => Math.sqrt(p.length) * Math.sqrt(p.length) === p.length)
});

export const argvSchema = array(string()).length(3);