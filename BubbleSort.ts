export function bubbleSort(array: number[]): void {
    let swapped: boolean;
    for(let i = 0; i < array.length - 1; i++) {
        swapped = false;
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j+1]) {
                let tmp = array[j]
                array[j] = array[j+1]
                array[j+1] = tmp
                swapped = true;
            }
        }

        if (swapped == false) break;
    }
}