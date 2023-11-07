import * as fs from 'fs';

const XLSX = require('xlsx');

export function convertTSVToExcel(tsvFileName: string, excelFileName: string) {
    const workbook = XLSX.utils.book_new();
    const data = fs.readFileSync(tsvFileName, 'utf-8');

    const ws = XLSX.utils.aoa_to_sheet(data.split('\n').map(line => line.split('\t')));
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');

    XLSX.writeFile(workbook, excelFileName);
}