import * as fs from 'fs';
import { convertTSVToExcel } from './TSVtoXLSX';

import { bubbleSort } from "./BubbleSort";
import { heapSort } from "./HeapSort";
import { insertionSort } from "./InsertionSort";
import { introSort } from "./IntroSort";
import { iterativeMergeSort } from "./MergeSort";
import { iterativeQuickSort } from "./QuickSort";
import { selectionSort } from "./SelectionSort";
import { defineBinaryGaps, defineKnuthGaps, defineSedgewickGaps, shellSort } from "./ShellSort";
import { timSort } from "./TimSort";

function measureExecutionTime(func: (...args: number[]) => void): number {
    const startTime = performance.now();
    func();
    const endTime = performance.now();

    const executionTime = endTime - startTime;
    return executionTime;
}

function exportResultsToTextFile(results: {[key: number]: number}, fileName: string) {
    const content = Object.entries(results)
        .map(([key, value]) => `${key}\t${value}`)
        .join('\n');

    fs.writeFileSync(fileName, content, 'utf-8');
}

function createSorted(length: number): number[] {
    let array: number[] = [];
    let i = 1;

    while (array.length != length) {
        array.push(i);
        i++;
    }

    return array;
}

function createRandom(length: number): number[] {
    let array: number[] = [];

    while(array.length != length) {
        array.push(Math.floor(Math.random() * 1000));
    }

    return array;
}

function createReverseSorted(length: number): number[] {
    let array: number[] = [];
    let i = length;

    while (array.length != length) {
        array.push(i);
        i--;
    }

    return array;
}

function createNearlySorted(length: number): number[] {

    let array: number[] = [];
    let i = 1;

    while (array.length != length) {
        array.push(i);
        i++;
    }

    const mid = Math.floor(length / 2);
    const end = length - 1;

    for (let i = 0; i < length; i++) {
        switch (i) {
            case 1:
                array.splice(1, 0, 200);
                break;
            case mid:
                array.splice(mid, 0, 150);
                break; 
            case end:
                array.splice(end, 0, 100);
                break;
            default: continue
        }
    }

    return array;

}

function main() {
    const fs = require('fs');
    const results1: { [key: number]: number } = {};
    const results2: { [key: number]: number } = {};
    const results3: { [key: number]: number } = {};
    const results4: { [key: number]: number } = {};

    const startLength = 10000;
    const arrayLengths: number[] = [];

    // for small array
    const small = 100;
    const resultsSmall: { [key: number]: number } = {};
    let smallArray: number[] = [];
    smallArray = createRandom(small);
    const executionTime = measureExecutionTime(() => timSort(smallArray));
    resultsSmall[small] = executionTime;
    exportResultsToTextFile(resultsSmall, 'smallData.tsv');
    convertTSVToExcel('smallData.tsv', 'resultsSmall.xlsx');

    for (let i = 0, length = startLength; i < 46; i++, length += 2000) {
        arrayLengths.push(length);
    }

    for (const length of arrayLengths) {
        let unsortedArray1: number[] = [];
        let unsortedArray2: number[] = [];
        let unsortedArray3: number[] = [];
        let unsortedArray4: number[] = [];

        unsortedArray1 = createNearlySorted(length);
        unsortedArray2 = createSorted(length);
        unsortedArray3 = createReverseSorted(length);
        unsortedArray4 = createRandom(length)

        const executionTime1 = measureExecutionTime(() => timSort(unsortedArray1));
        const executionTime2 = measureExecutionTime(() => timSort(unsortedArray2));
        const executionTime3 = measureExecutionTime(() => timSort(unsortedArray3));
        const executionTime4 = measureExecutionTime(() => iterativeQuickSort(unsortedArray4));

        results1[length] = executionTime1;
        results2[length] = executionTime2;
        results3[length] = executionTime3;
        results4[length] = executionTime4;
    }

    exportResultsToTextFile(results1, 'data1.tsv');
    exportResultsToTextFile(results2, 'data2.tsv');
    exportResultsToTextFile(results3, 'data3.tsv');
    exportResultsToTextFile(results4, 'data4.tsv');
    
    convertTSVToExcel('data1.tsv', 'results1.xlsx');
    convertTSVToExcel('data2.tsv', 'results2.xlsx');
    convertTSVToExcel('data3.tsv', 'results3.xlsx');
    convertTSVToExcel('data4.tsv', 'results4.xlsx');
}

main();