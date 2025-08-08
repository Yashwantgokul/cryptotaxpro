import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Settings, FileSpreadsheet, Calculator } from 'lucide-react';
import { TransactionData } from '../types/transaction';
import CSVUploader from '../components/CSVUploader';
import CountrySelector from '../components/CountrySelector';
import MethodSelector from '../components/MethodSelector';

interface HomeProps {
  transactions: TransactionData[];
  setTransactions: (transactions: TransactionData[]) => void;
  selectedCountry: 'IN' | 'US' | 'UK';
  setSelectedCountry: (country: 'IN' | 'US' | 'UK') => void;
  calculationMethod: 'FIFO' | 'LIFO' | 'HIFO';
  setCalculationMethod: (method: 'FIFO' | 'LIFO' | 'HIFO') => void;
}

const Home: React.FC<HomeProps> = ({
  transactions,
  setTransactions,
  selectedCountry,
  setSelectedCountry,
  calculationMethod,
  setCalculationMethod
}) => {
  const navigate = useNavigate();

  const handleCalculate = () => {
    if (transactions.length > 0) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Crypto Tax Calculator
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Professional crypto tax calculations with real earnings analysis, inflation adjustments, 
          and AI-powered insights. Supporting India, USA, and UK tax regulations.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Upload className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">Upload Transactions</h2>
          </div>
          <CSVUploader 
            transactions={transactions}
            setTransactions={setTransactions}
          />
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Settings className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">Configuration</h2>
          </div>
          
          <div className="space-y-6">
            <CountrySelector 
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
            
            <MethodSelector 
              calculationMethod={calculationMethod}
              setCalculationMethod={setCalculationMethod}
            />
          </div>
        </div>
      </div>

      {/* Transaction Summary */}
      {transactions.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <FileSpreadsheet className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">Transaction Summary</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{transactions.length}</div>
              <div className="text-gray-600">Total Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {transactions.filter(t => t.type === 'buy').length}
              </div>
              <div className="text-gray-600">Buy Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {transactions.filter(t => t.type === 'sell').length}
              </div>
              <div className="text-gray-600">Sell Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(transactions.map(t => t.asset)).size}
              </div>
              <div className="text-gray-600">Unique Assets</div>
            </div>
          </div>
        </div>
      )}

      {/* Calculate Button */}
      <div className="text-center">
        <button
          onClick={handleCalculate}
          disabled={transactions.length === 0}
          className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all ${
            transactions.length > 0
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Calculator className="h-6 w-6 mr-2" />
          Calculate Tax & Real Earnings
        </button>
      </div>
    </div>
  );
};

export default Home;