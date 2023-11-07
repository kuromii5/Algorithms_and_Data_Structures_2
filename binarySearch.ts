export function iterativeBinarySearch(array: number[], low: number, high: number, target: number): number {
    while (high >= low) {
        let mid = Math.floor(low + (high - low)/2);
        if (array[mid] === target) {
            return target;
        }
        else if (array[mid] > target) {
            high = mid - 1;
        }
        else {
            low = mid + 1;
        }
    }

    return -(low + 1);
}