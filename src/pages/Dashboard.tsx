import React, { useState, useEffect } from 'react';
import { TransactionData, TaxCalculation } from '../types/transaction';
import { calculateTax } from '../utils/taxCalculator';
import { calculateRealEarnings } from '../utils/realEarningsCalculator';
import TaxSummary from '../components/TaxSummary';
import InflationChart from '../components/InflationChart';
import AIInsightModal from '../components/AIInsightModal';
import PDFReportButton from '../components/PDFReportButton';
import { AlertTriangle, TrendingUp, Calculator, FileText } from 'lucide-react';

interface DashboardProps {
  transactions: TransactionData[];
  selectedCountry: 'IN' | 'US' | 'UK';
  calculationMethod: 'FIFO' | 'LIFO' | 'HIFO';
}

const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  selectedCountry,
  calculationMethod
}) => {
  const [taxCalculation, setTaxCalculation] = useState<TaxCalculation | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [fundingSource, setFundingSource] = useState<'savings' | 'borrowed' | null>(null);

  useEffect(() => {
    if (transactions.length > 0) {
      const calculation = calculateTax(transactions, selectedCountry, calculationMethod);
      const realEarnings = calculateRealEarnings(calculation, selectedCountry);
      setTaxCalculation({ ...calculation, ...realEarnings });
      
      // Show AI modal after calculation
      setTimeout(() => setShowAIModal(true), 1000);
    }
  }, [transactions, selectedCountry, calculationMethod]);

  if (transactions.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Transactions Found</h2>
          <p className="text-gray-600">Please upload your transaction data to view the dashboard.</p>
        </div>
      </div>
    );
  }

  if (!taxCalculation) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <Calculator className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Calculating...</h2>
          <p className="text-gray-600">Processing your transactions and calculating taxes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Dashboard</h1>
          <p className="text-gray-600">
            {selectedCountry} • {calculationMethod} Method • {transactions.length} Transactions
          </p>
        </div>
        <PDFReportButton 
          taxCalculation={taxCalculation}
          selectedCountry={selectedCountry}
          calculationMethod={calculationMethod}
          transactions={transactions}
        />
      </div>

      {/* Tax Summary Cards */}
      <TaxSummary 
        taxCalculation={taxCalculation}
        selectedCountry={selectedCountry}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <InflationChart 
          taxCalculation={taxCalculation}
          selectedCountry={selectedCountry}
        />
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Performance Metrics</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Gross Profit</span>
              <span className="font-semibold text-green-600">
                ${(taxCalculation.shortTermGains + taxCalculation.longTermGains).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Tax Paid</span>
              <span className="font-semibold text-red-600">
                ${taxCalculation.totalTax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Net Profit</span>
              <span className="font-semibold text-blue-600">
                ${(taxCalculation.shortTermGains + taxCalculation.longTermGains - taxCalculation.totalTax).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Real Earnings (Inflation Adjusted)</span>
              <span className={`font-bold text-lg ${taxCalculation.realEarnings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${taxCalculation.realEarnings.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight Modal */}
      <AIInsightModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onFundingSourceSelect={(source) => {
          setFundingSource(source);
          setShowAIModal(false);
        }}
        taxCalculation={taxCalculation}
        fundingSource={fundingSource}
      />
    </div>
  );
};

export default Dashboard;