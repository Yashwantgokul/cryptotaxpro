import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Gift, AlertTriangle, CheckCircle } from 'lucide-react';

const TaxSavingTips: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<'IN' | 'US' | 'UK'>('IN');

  const countryTips = {
    IN: {
      name: 'India',
      flag: '🇮🇳',
      tips: [
        {
          icon: <TrendingUp className="h-8 w-8 text-green-600" />,
          title: 'Use Crypto Losses Strategically',
          description: 'Crypto losses can only be set off against other crypto gains. Plan your sells to optimize this benefit.',
          risk: 'low'
        },
        {
          icon: <Calendar className="h-8 w-8 text-blue-600" />,
          title: 'Timing Your Sales',
          description: 'Since there\'s no long-term benefit, focus on managing your total annual crypto income to stay in lower tax brackets.',
          risk: 'low'
        },
        {
          icon: <AlertTriangle className="h-8 w-8 text-orange-600" />,
          title: 'Avoid Airdrop Traps',
          description: 'Be cautious with airdrops as they may be considered income at fair market value.',
          risk: 'medium'
        },
        {
          icon: <DollarSign className="h-8 w-8 text-purple-600" />,
          title: 'Keep Detailed Records',
          description: 'Maintain comprehensive transaction records to accurately calculate gains and losses.',
          risk: 'low'
        }
      ]
    },
    US: {
      name: 'United States',
      flag: '🇺🇸',
      tips: [
        {
          icon: <Calendar className="h-8 w-8 text-green-600" />,
          title: 'Long-Term Holding Strategy',
          description: 'Hold crypto for more than 1 year to qualify for lower long-term capital gains rates (0%, 15%, or 20%).',
          risk: 'low'
        },
        {
          icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
          title: 'Tax-Loss Harvesting',
          description: 'Sell losing positions to offset gains. Unlike stocks, crypto isn\'t subject to wash sale rules.',
          risk: 'medium'
        },
        {
          icon: <Gift className="h-8 w-8 text-purple-600" />,
          title: 'Donate Appreciated Crypto',
          description: 'Donate crypto held for more than 1 year to charity to avoid capital gains tax and get a deduction.',
          risk: 'low'
        },
        {
          icon: <DollarSign className="h-8 w-8 text-orange-600" />,
          title: 'Specific Identification Method',
          description: 'Use specific identification to choose which coins to sell for optimal tax outcomes.',
          risk: 'medium'
        }
      ]
    },
    UK: {
      name: 'United Kingdom',
      flag: '🇬🇧',
      tips: [
        {
          icon: <DollarSign className="h-8 w-8 text-green-600" />,
          title: 'Utilize CGT Allowance',
          description: 'Make sure to use your £6,000 annual Capital Gains Tax allowance effectively.',
          risk: 'low'
        },
        {
          icon: <Gift className="h-8 w-8 text-blue-600" />,
          title: 'Spouse Transfers',
          description: 'Transfer crypto to your spouse to utilize both CGT allowances (£12,000 total).',
          risk: 'low'
        },
        {
          icon: <Calendar className="h-8 w-8 text-purple-600" />,
          title: 'Bed and Spouse Strategy',
          description: 'Sell to realize gains, then have your spouse buy back to reset the cost basis.',
          risk: 'medium'
        },
        {
          icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
          title: 'Tax Year Planning',
          description: 'Time your disposals across tax years to maximize allowance usage.',
          risk: 'low'
        }
      ]
    }
  };

  const currentTips = countryTips[selectedCountry];

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Low Risk
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Medium Risk
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Tax Saving Strategies</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Country-specific optimization strategies to minimize your crypto tax liability while staying compliant with local regulations.
        </p>
      </div>

      {/* Country Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-md p-2 inline-flex">
          {Object.entries(countryTips).map(([code, data]) => (
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

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentTips.tips.map((tip, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                {tip.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{tip.title}</h3>
              </div>
              {getRiskBadge(tip.risk)}
            </div>
            <p className="text-gray-600 leading-relaxed">{tip.description}</p>
          </div>
        ))}
      </div>

      {/* General Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Universal Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Keep Records</h3>
            <p className="text-gray-600 text-sm">Maintain detailed transaction records including dates, amounts, and fees for all trades.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Plan Ahead</h3>
            <p className="text-gray-600 text-sm">Review your positions regularly and plan transactions for optimal tax outcomes.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get Professional Help</h3>
            <p className="text-gray-600 text-sm">Consult with tax professionals for complex situations and portfolio optimization.</p>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-800 mb-2">Important Warning</h3>
            <p className="text-red-700">
              These strategies are for educational purposes only. Tax laws are complex and constantly evolving. 
              Always consult with a qualified tax professional before implementing any tax strategy. 
              Improper implementation could result in penalties or legal issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSavingTips;