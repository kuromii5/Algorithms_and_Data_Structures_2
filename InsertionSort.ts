export function insertionSort(array: number[], low: number, high: number): void {
    for (let i = low + 1; i <= high; i++) {
        let temp = array[i];
        let j = i - 1;

        while (temp < array[j] && j >= low) {
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = temp;
    }
}