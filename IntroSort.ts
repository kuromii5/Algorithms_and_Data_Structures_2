import { insertionSort } from "./InsertionSort";
import { partition } from "./QuickSort";
import { heapSort } from "./HeapSort";

function medianOfThree(a: number, b: number, c: number): number {
    if (a < b && b < c) {
        return b;
    }

    if (a < c && c <= b) {
        return c;
    }

    if (b <= a && a < c) {
        return a;
    }

    if (b < c && c <= a) {
        return c;
    }

    if (c <= a && a < b) {
        return a;
    }

    if (c <= b && b <= a) {
        return b;
    }

    return a;
}

function swap(arr: number[], a: number, b: number): void {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

export function introSort(array: number[]): void {
    const start = 0;
    const end = array.length - 1;
    const depthLimit = 2 * Math.log(end - start);

    const stack: [number, number, number] = [start, end, depthLimit];

    while (stack.length) {
        const depthLimit = stack.pop() || 0;
        const high = stack.pop() || 0;
        const low = stack.pop() || 0;

        const length = high - low;

        if (length < 16) {
            insertionSort(array, low, high);
        } else if (depthLimit <= 0) {
            heapSort(array, low, high);
        } else {
            let pivotIndex = medianOfThree(array[low], array[low + high / 2], array[high]);
            swap(array, high, pivotIndex);

            const partitionIndex = partition(array, low, high);

            if (partitionIndex - 1 > low) {
                stack.push(low, partitionIndex - 1, depthLimit - 1);
            }
            if (partitionIndex + 1 < high) {
                stack.push(partitionIndex + 1, high, depthLimit - 1);
            }
        }
    }
}