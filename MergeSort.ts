// Recursive approach
export function recMergeSort(array: number[]): void {
    if(array.length <= 1) {
        return;
    }
    
    const mid = Math.floor(array.length / 2);
    let leftArray: number[] = [];
    let rightArray: number[] = [];
    
    for (let i = 0; i < array.length; i++) {
        if (i < mid) {
            leftArray.push(array[i]);
        } else {
            rightArray.push(array[i]);
        }
    }
    
    recMergeSort(leftArray);
    recMergeSort(rightArray);
    recMerge(leftArray, rightArray, array);
}

function recMerge(leftArray: number[], rightArray: number[], array: number[]) {
    let i = 0, l = 0, r = 0; // i for main array
    while (l < leftArray.length || r < rightArray.length) {
        if (l < leftArray.length && (leftArray[l] < rightArray[r] || r === rightArray.length)) {
            array[i] = leftArray[l];
            i++;
            l++;
        } else {
            array[i] = rightArray[r];
            i++;
            r++;
        }
    }
}

// Iterative approach
export function iterativeMergeSort(array: number[]): void {
    const length = array.length;
    for (let currSize = 1; currSize < length; currSize *= 2) {
        for (let low = 0; low < length - 1; low += 2 * currSize) {
          const mid = Math.min(low + currSize - 1, length - 1);
          const high = Math.min(low + 2 * currSize - 1, length - 1);

          iterativeMerge(array, low, mid, high);
        }
    }
}

export function iterativeMerge(array: number[], low: number, mid: number, high: number): void {
    const lenLeft = mid - low + 1;
    const lenRight = high - mid;

    const leftArray = new Array(lenLeft);
    const rightArray = new Array(lenRight);

    for (let i = 0; i < lenLeft; i++) {
        leftArray[i] = array[low + i];
    }

    for (let i = 0; i < lenRight; i++) {
        rightArray[i] = array[mid + 1 + i];
    }

    let l = 0, r = 0;
    let i = low;

    while (l < leftArray.length || r < rightArray.length) {
        if (l < leftArray.length && (leftArray[l] < rightArray[r] || r === rightArray.length)) {
            array[i] = leftArray[l];
            i++;
            l++;
        } else {
            array[i] = rightArray[r];
            i++;
            r++;
        }
    }
}