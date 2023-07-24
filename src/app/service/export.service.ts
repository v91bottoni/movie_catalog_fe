import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx'

@Injectable({
  providedIn: 'root'
})
export class ExportService {

constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public exportAsPDFFile(json: any[], pdfFileName: string): void{
    const doc = new jsPDF();
    autoTable(doc, {
      body: json
    });
    doc.save(pdfFileName + '_export_' + new Date().getTime() + '.pdf');
  }
  
}
