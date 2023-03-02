import { runRotation } from "../rotate";

describe("matrix rotation", () => {
    it("should rotate correctly 1x1 matrix", () => {
        const input = [1];

        const output = runRotation(input);

        expect(output).toStrictEqual([1]);
    })

    it("should rotate correctly 2x2 matrix", () => {
        const input = [40, 20, 90, 10];

        const output = runRotation(input);

        expect(output).toStrictEqual([20, 10, 40, 90]);
    })

    it("should rotate correctly 3x3 matrix", () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const output = runRotation(input);

        expect(output).toStrictEqual([2, 3, 6, 1, 5, 9, 4, 7, 8]);
    })

    it("should rotate correctly 4x4 matrix", () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

        const output = runRotation(input);

        expect(output).toStrictEqual([
            2, 3, 4, 8, 1, 7, 11, 12, 5, 6, 10, 16, 9, 13, 14, 15,
        ]);
    })

    it("should rotate correctly 5x5 matrix", () => {
        const input = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
            22, 23, 24, 25,
        ];

        const output = runRotation(input);

        expect(output).toStrictEqual([
            2, 3, 4, 5, 10, 1, 8, 9, 14, 15, 6, 7, 13, 19, 20, 11, 12, 17, 18, 25, 16,
            21, 22, 23, 24,
        ]);
    })
})