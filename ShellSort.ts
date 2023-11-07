export function shellSort(array: number[], gaps: number[]): void {
    let i = 0;
    for (gaps[i]; i <= gaps.length; i++) {

        for (let j = gaps[i]; j < array.length; j++) {

            for (let k = j - gaps[i]; k >= 0; k -= gaps[i]) {

                if (array[k + gaps[i]] > array[k]) 
                    break;
                else {
                    let temp = array[k + gaps[i]];
                    array[k + gaps[i]] = array[k];
                    array[k] = temp;
                }
            }
        }
    }
}

export function defineBinaryGaps(length: number): number[] { // n^2 worst case
    let gaps: number[] = [];
    while (length > 2) {
        gaps.push(Math.floor(length /= 2));
    }

    return gaps;
}

export function defineKnuthGaps(length: number): number[] { // n^(3/2) worst case
    let gaps: number[] = [];
    let gap = 1;

    while(gap <= length) {
        gaps.push(gap);
        gap = 3*gap + 1;
    }

    gaps.reverse();
    return gaps;
}

export function defineSedgewickGaps(length: number): number[] { // n^(4/3) worst case
    let gaps: number[] = [];
    let i = 0;
    let j = 0;

    while(true) {
        const gap1 = 1 + 3 * (Math.pow(2,i) - 1);
        
        if (gap1 > length) break;
        gaps.push(gap1);

        const gap2 = Math.pow(2, j) * (Math.pow(2, j) - 1) + 1;

        if (gap2 > length) break;
        gaps.push(gap2);

        i++;
        j++;
    }

    gaps.reverse();
    return gaps;
}