import React from 'react';
import { FileText, Download } from 'lucide-react';
import { TaxCalculation, TransactionData } from '../types/transaction';
import { generatePDFReport } from '../utils/pdfGenerator';

interface PDFReportButtonProps {
  taxCalculation: TaxCalculation;
  selectedCountry: 'IN' | 'US' | 'UK';
  calculationMethod: 'FIFO' | 'LIFO' | 'HIFO';
  transactions: TransactionData[];
}

const PDFReportButton: React.FC<PDFReportButtonProps> = ({
  taxCalculation,
  selectedCountry,
  calculationMethod,
  transactions
}) => {
  const handleDownload = () => {
    generatePDFReport({
      taxCalculation,
      selectedCountry,
      calculationMethod,
      transactions
    });
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
    >
      <FileText className="h-5 w-5 mr-2" />
      Download PDF Report
      <Download className="h-4 w-4 ml-2" />
    </button>
  );
};

export default PDFReportButton;