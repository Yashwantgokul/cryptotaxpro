import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { TransactionData } from '../types/transaction';

interface CSVUploaderProps {
  transactions: TransactionData[];
  setTransactions: (transactions: TransactionData[]) => void;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ transactions, setTransactions }) => {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleData = `timestamp,asset,type,quantity,price,fee,exchange
2024-01-15 10:30:00,BTC,buy,0.5,45000,25.0,Binance
2024-02-20 14:15:00,ETH,buy,2.0,3200,15.0,Coinbase
2024-03-10 09:45:00,BTC,sell,0.25,52000,30.0,Binance
2024-03-25 16:20:00,ETH,sell,1.0,3800,20.0,Coinbase`;

  const downloadSample = () => {
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crypto-transactions-sample.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const parseCSV = (csvText: string): TransactionData[] => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
    
    // Validate headers
    const requiredHeaders = ['timestamp', 'asset', 'type', 'quantity', 'price', 'fee', 'exchange'];
    const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
    
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`);
    }

    const data: TransactionData[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      if (values.length !== headers.length) {
        throw new Error(`Row ${i + 1} has incorrect number of columns`);
      }

      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });

      // Validate and convert data types
      const transaction: TransactionData = {
        timestamp: row.timestamp,
        asset: row.asset.toUpperCase(),
        type: row.type.toLowerCase() as 'buy' | 'sell' | 'transfer',
        quantity: parseFloat(row.quantity),
        price: parseFloat(row.price),
        fee: parseFloat(row.fee) || 0,
        exchange: row.exchange
      };

      // Validate transaction type
      if (!['buy', 'sell', 'transfer'].includes(transaction.type)) {
        throw new Error(`Invalid transaction type "${row.type}" in row ${i + 1}. Must be buy, sell, or transfer`);
      }

      // Validate numeric values
      if (isNaN(transaction.quantity) || isNaN(transaction.price)) {
        throw new Error(`Invalid numeric values in row ${i + 1}`);
      }

      data.push(transaction);
    }

    return data;
  };

  const handleFileUpload = (file: File) => {
    setError(null);
    setSuccess(null);

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const parsedTransactions = parseCSV(csvText);
        setTransactions(parsedTransactions);
        setSuccess(`Successfully uploaded ${parsedTransactions.length} transactions`);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error parsing CSV file');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drop your CSV file here or click to browse
        </p>
        <p className="text-gray-500 mb-4">
          Supports CSV files with transaction data
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Choose File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Messages */}
      {error && (
        <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Sample CSV */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="font-medium text-gray-900">Sample CSV Format</h3>
          </div>
          <button
            onClick={downloadSample}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Download Sample
          </button>
        </div>
        <div className="bg-white rounded border p-3 text-sm font-mono text-gray-700 overflow-x-auto">
          <pre>{sampleData}</pre>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Required columns: timestamp, asset, type (buy/sell/transfer), quantity, price, fee, exchange
        </p>
      </div>
    </div>
  );
};

export default CSVUploader;