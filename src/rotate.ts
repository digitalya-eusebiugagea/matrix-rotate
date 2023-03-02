const swap = (matrixArray: number[], posA: number, posB: number) => {
    const aux = matrixArray[posA];
    matrixArray[posA] = matrixArray[posB];
    matrixArray[posB] = aux;
}

const getArrayIndex = (dimension: number, row: number, column: number) => {
    return dimension * row + column;
}

export const rotate = (dimension: number, matrixArray: number[], borderDepth: number = 0) => {
    if (borderDepth >= Math.floor(dimension / 2)) return;

    for (let j = borderDepth; j < dimension - borderDepth - 1; j++) {
        swap(matrixArray, getArrayIndex(dimension, borderDepth, j), getArrayIndex(dimension, borderDepth, j + 1))
    }

    for (let i = borderDepth; i < dimension - borderDepth - 1; i++) {
        swap(matrixArray, getArrayIndex(dimension, i, dimension - borderDepth - 1), getArrayIndex(dimension, i + 1, dimension - borderDepth - 1))
    }

    for (let j = dimension - borderDepth - 1; j > borderDepth; j--) {
        swap(matrixArray, getArrayIndex(dimension, dimension - borderDepth - 1, j), getArrayIndex(dimension, dimension - borderDepth - 1, j - 1))
    }

    for (let i = dimension - borderDepth - 1; i > borderDepth + 1; i--) {
        swap(matrixArray, getArrayIndex(dimension, i, borderDepth), getArrayIndex(dimension, i - 1, borderDepth))
    }

    rotate(dimension, matrixArray, borderDepth + 1);
}

export const runRotation = (matrixArray: number[]) => {
    const dimension = Math.sqrt(matrixArray.length);
    
    rotate(dimension, matrixArray);
    
    return matrixArray;
}