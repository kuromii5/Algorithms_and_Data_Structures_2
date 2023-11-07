function heapify(arr: number[], n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        const temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        heapify(arr, n, largest);
    }
}

function buildMaxHeap(array: number[], length: number): void {
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        heapify(array, array.length, i);
    }
}

export function heapSort(array: number[], low: number, high: number): number[] {
    //const length = array.length;
    const length = high - low + 1;

    buildMaxHeap(array, length);

    for (let i = length - 1; i > 0; i--) {
        
        const temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        heapify(array, i, 0);
    }

    return array;
}