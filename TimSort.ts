import { insertionSort } from "./InsertionSort";
import { iterativeMerge } from "./MergeSort";

const MINRUN = 32;

function calcMinRun(n: number): number {
    let r = 0;
    while (n >= MINRUN)
    {
        r |= (n & 1);
        n >>= 1;
    }

    return n + r;
}

export function timSort(array: number[]): number[] {
    const length = array.length;
    let minRun = calcMinRun(length);

    let i = 0;
    let runCount = 0;
    
    while (i < length) {
        runCount++;
        let runSize = 1;

        while (i + runSize < length && array[i + runSize - 1] <= array[i + runSize]) runSize++;
    
        if (runSize > 1) {
            if (runSize < minRun) {
                const remaining = Math.min(minRun - runSize, length - i - runSize);
                runSize += remaining;
                insertionSort(array, i, i + runSize - 1);
            }
        } else {
            while(i + runSize < length && array[i + runSize - 1] > array[i + runSize]) runSize++;

            for (let j = 0; j < runSize / 2; j++) {
                const temp = array[j];
                array[j] = array[runSize - j - 1];
                array[runSize - j - 1] = temp;
            }
        
            if (runSize < minRun) {
                const remaining = Math.min(minRun - runSize, length - i - runSize);
                runSize += remaining;
                insertionSort(array, i, i + runSize - 1);
            }
        }
    
        i += runSize;
    }

    if (runCount === 1) return array;

    for (let size = minRun; size < length; size = 2 * size) {
        for (let low = 0; low < length; low += 2 * size) {
            const mid = Math.min(low + size - 1, length - 1);
            const high = Math.min(low + 2 * size - 1, length - 1);
        
            if (mid < high) {
                iterativeMerge(array, low, mid, high);
            }
        }
    }

    return array;
}