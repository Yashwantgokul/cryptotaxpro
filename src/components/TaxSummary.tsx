import React from 'react';
import { TrendingUp, TrendingDown, Calculator, DollarSign, AlertTriangle } from 'lucide-react';
import { TaxCalculation } from '../types/transaction';

interface TaxSummaryProps {
  taxCalculation: TaxCalculation;
  selectedCountry: 'IN' | 'US' | 'UK';
}

const TaxSummary: React.FC<TaxSummaryProps> = ({ taxCalculation, selectedCountry }) => {
  const countryFlags = {
    IN: '🇮🇳',
    US: '🇺🇸',
    UK: '🇬🇧'
  };

  const totalGains = taxCalculation.shortTermGains + taxCalculation.longTermGains;
  const netProfit = totalGains - taxCalculation.totalTax;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Short Term Gains */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-400">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Short-term Gains</p>
            <p className={`text-2xl font-bold ${taxCalculation.shortTermGains >= 0 ? 'text-orange-600' : 'text-red-600'}`}>
              ${taxCalculation.shortTermGains.toFixed(2)}
            </p>
          </div>
          <TrendingUp className="h-8 w-8 text-orange-400" />
        </div>
        <p className="text-xs text-gray-500 mt-2">≤ 1 year holding period</p>
      </div>

      {/* Long Term Gains */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-400">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Long-term Gains</p>
            <p className={`text-2xl font-bold ${taxCalculation.longTermGains >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${taxCalculation.longTermGains.toFixed(2)}
            </p>
          </div>
          <TrendingDown className="h-8 w-8 text-green-400" />
        </div>
        <p className="text-xs text-gray-500 mt-2">&gt; 1 year holding period</p>
      </div>

      {/* Tax Owed */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-400">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Tax Owed {countryFlags[selectedCountry]}</p>
            <p className="text-2xl font-bold text-red-600">
              ${taxCalculation.totalTax.toFixed(2)}
            </p>
          </div>
          <Calculator className="h-8 w-8 text-red-400" />
        </div>
        <p className="text-xs text-gray-500 mt-2">Including all applicable taxes</p>
      </div>

      {/* Real Earnings */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-400">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Real Earnings</p>
            <p className={`text-2xl font-bold ${taxCalculation.realEarnings >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              ${taxCalculation.realEarnings.toFixed(2)}
            </p>
          </div>
          <DollarSign className="h-8 w-8 text-blue-400" />
        </div>
        <p className="text-xs text-gray-500 mt-2">After tax & inflation</p>
      </div>

      {/* Performance Summary */}
      <div className="md:col-span-2 lg:col-span-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">
              {((netProfit / Math.abs(totalGains)) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Effective Return</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">
              {((taxCalculation.totalTax / Math.abs(totalGains)) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Tax Rate</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">
              {taxCalculation.inflationAdjustedReturn.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Inflation Impact</div>
          </div>
        </div>
        
        {taxCalculation.realEarnings < 0 && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              <p className="text-yellow-800 text-sm">
                Your real earnings are negative after accounting for taxes and inflation. 
                Consider reviewing your investment strategy.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxSummary;