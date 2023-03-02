const swap = (matrixArray: number[], posA: number, posB: number) => {
    const aux = matrixArray[posA];
    matrixArray[posA] = matrixArray[posB];
    matrixArray[posB] = aux;
}

const getArrayIndex = (n: number, row: number, column: number) => {
    return n * row + column;
}

export const rotate = (n: number, matrixArray: number[], k: number = 0) => {
    if (k >= Math.floor(n / 2)) return;

    for (let j = k; j < n - k - 1; j++) {
        swap(matrixArray, getArrayIndex(n, k, j), getArrayIndex(n, k, j + 1))
    }

    for (let i = k; i < n - k - 1; i++) {
        swap(matrixArray, getArrayIndex(n, i, n - k - 1), getArrayIndex(n, i + 1, n - k - 1))
    }

    for (let j = n - k - 1; j > k; j--) {
        swap(matrixArray, getArrayIndex(n, n - k - 1, j), getArrayIndex(n, n - k - 1, j - 1))
    }

    for (let i = n - k - 1; i > k + 1; i--) {
        swap(matrixArray, getArrayIndex(n, i, k), getArrayIndex(n, i - 1, k))
    }

    rotate(n, matrixArray, k + 1);
}

export const runRotation = (matrixArray: number[]) => {
    const dimension = Math.sqrt(matrixArray.length);
    
    rotate(dimension, matrixArray);
    
    return matrixArray;
}