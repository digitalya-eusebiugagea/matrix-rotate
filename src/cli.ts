import * as csv from 'fast-csv';

import { runRotation } from './rotate';
import { InputRow, OutputRow } from './types';
import { getReadableStream } from './utils';
import { argvSchema, itemSchema } from './validationSchemas';

const run = async () => {
    try {
        const file = process.argv[2];
        await argvSchema.validate(process.argv);

        getReadableStream(file)
            .on("error", () => process.exit(1))
            .pipe(csv.parse({ headers: ['id', 'json'] }))
            .pipe(
                csv.format<InputRow, OutputRow>({ headers: ['id', 'json', 'is_valid'] }),
            )
            .transform(async (row, next): Promise<void> => {
                try {
                    const item = {
                        id: row.id,
                        json: JSON.parse(row.json)
                    }
                    await itemSchema.validate(item); 
                    const rotated = runRotation(item.json);

                    return next(null, {
                        id: item.id,
                        json: JSON.stringify(rotated),
                        is_valid: true
                    });
                } catch(e) {
                    return next(null, {
                        id: row.id,
                        json: JSON.stringify([]),
                        is_valid: false
                    });
                }
            })
            .pipe(process.stdout)
            .on('end', () => process.exit());
    } catch(e) {
        process.exit(1);
    }
}

run();