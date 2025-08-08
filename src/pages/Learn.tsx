import React, { useState } from 'react';
import { BookOpen, Flag, AlertCircle, Info } from 'lucide-react';

const Learn: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<'IN' | 'US' | 'UK'>('IN');

  const countryData = {
    IN: {
      name: 'India',
      flag: '🇮🇳',
      taxRates: {
        shortTerm: '30% flat rate + 4% cess + applicable surcharge',
        longTerm: '30% flat rate + 4% cess + applicable surcharge',
        tds: '1% TDS on transactions above ₹10,000'
      },
      reporting: [
        'Report crypto gains in Income Tax Return (ITR)',
        'Use Schedule OS (Other Sources) for crypto income',
        'TDS is deducted by exchanges on high-value transactions',
        'No indexation benefit available for crypto assets',
        'Losses can only be set off against other crypto gains'
      ],
      tips: [
        'Keep detailed records of all transactions',
        'Consider timing of sales for tax planning',
        'Consult a tax professional for complex portfolios',
        'Be aware of gift tax implications on crypto transfers'
      ]
    },
    US: {
      name: 'United States',
      flag: '🇺🇸',
      taxRates: {
        shortTerm: 'Ordinary income tax rates (10% - 37%)',
        longTerm: 'Capital gains rates (0%, 15%, or 20%)',
        threshold: 'Assets held for more than 1 year qualify for long-term rates'
      },
      reporting: [
        'Report on Form 8949 and Schedule D',
        'Use Form 1040 for individual returns',
        'Cryptocurrency is treated as property for tax purposes',
        'Each transaction may be a taxable event',
        'FIFO method is commonly used but others are allowed'
      ],
      tips: [
        'Hold assets for over 1 year to qualify for lower long-term rates',
        'Consider tax-loss harvesting strategies',
        'Donate appreciated crypto to charity for tax benefits',
        'Use specific identification for optimal tax outcomes'
      ]
    },
    UK: {
      name: 'United Kingdom',
      flag: '🇬🇧',
      taxRates: {
        shortTerm: 'Capital Gains Tax: 10% or 20% based on income',
        longTerm: 'Same rates apply regardless of holding period',
        allowance: '£6,000 annual CGT allowance (2023-24)'
      },
      reporting: [
        'Report gains above the annual allowance',
        'Use the share pooling method for identical assets',
        'File additional SA form if gains exceed allowance',
        'Keep records for at least 4 years after disposal',
        'Consider spouse transfers to utilize both allowances'
      ],
      tips: [
        'Utilize annual CGT allowance effectively',
        'Consider bed and spouse strategies',
        'Time disposals across tax years',
        'Keep detailed records of all transactions and fees'
      ]
    }
  };

  const currentData = countryData[selectedCountry];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Learn Crypto Taxation</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Understanding cryptocurrency taxation rules across different countries to help you stay compliant and optimize your tax strategy.
        </p>
      </div>

      {/* Country Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-md p-2 inline-flex">
          {Object.entries(countryData).map(([code, data]) => (
            <button
              key={code}
              onClick={() => setSelectedCountry(code as 'IN' | 'US' | 'UK')}
              className={`flex items-center px-6 py-3 rounded-md font-medium transition-all ${
                selectedCountry === code
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <span className="text-2xl mr-2">{data.flag}</span>
              {data.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tax Rates */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Flag className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Tax Rates in {currentData.name}
            </h2>
          </div>
          <div className="space-y-4">
            {Object.entries(currentData.taxRates).map(([key, value]) => (
              <div key={key} className="border-l-4 border-blue-200 pl-4">
                <h3 className="font-semibold text-gray-900 capitalize mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <p className="text-gray-600">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reporting Requirements */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-orange-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">Reporting Requirements</h2>
          </div>
          <ul className="space-y-3">
            {currentData.reporting.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
          <div className="flex items-center mb-4">
            <Info className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">Optimization Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentData.tips.map((tip, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-green-800">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
            <p className="text-yellow-700">
              This information is for educational purposes only and should not be considered as tax advice. 
              Tax laws are complex and subject to change. Always consult with a qualified tax professional 
              or accountant for personalized advice regarding your specific situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;