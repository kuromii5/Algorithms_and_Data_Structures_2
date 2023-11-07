export function recQuickSort(arr: number[], low: number, high: number): void {
    if (low >= high) {
        return;
    }

    const pivotIndex = partition(arr, low, high);
    recQuickSort(arr, low, pivotIndex - 1);
    recQuickSort(arr, pivotIndex + 1, high);
}

export function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let index = low;

    for(let i = low; i < high; ++i) {
        if (arr[i] <= pivot) {
            const temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
            index++;
        }
    }

    arr[high] = arr[index];
    arr[index] = pivot;
    return index;
}

export function iterativeQuickSort(arr: number[]): number[] {
    const stack: [number, number] = [0, arr.length - 1];
  
    while (stack.length) {
      const high = stack.pop() || 0;
      const low = stack.pop() || 0;
  
      const pivotIndex = partition(arr, low, high);
  
      if (pivotIndex - 1 > low) {
        stack.push(low, pivotIndex - 1);
      }
  
      if (pivotIndex + 1 < high) {
        stack.push(pivotIndex + 1, high);
      }
    }
  
    return arr;
}