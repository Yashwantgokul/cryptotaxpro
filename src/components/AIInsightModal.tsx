import React, { useState } from 'react';
import { Brain, X, AlertTriangle, CheckCircle, DollarSign, TrendingUp } from 'lucide-react';
import { TaxCalculation } from '../types/transaction';

interface AIInsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFundingSourceSelect: (source: 'savings' | 'borrowed') => void;
  taxCalculation: TaxCalculation;
  fundingSource: 'savings' | 'borrowed' | null;
}

const AIInsightModal: React.FC<AIInsightModalProps> = ({
  isOpen,
  onClose,
  onFundingSourceSelect,
  taxCalculation,
  fundingSource
}) => {
  const [showInsight, setShowInsight] = useState(false);

  if (!isOpen) return null;

  const generateInsight = (source: 'savings' | 'borrowed') => {
    const totalGains = taxCalculation.shortTermGains + taxCalculation.longTermGains;
    const netProfit = totalGains - taxCalculation.totalTax;
    const realEarnings = taxCalculation.realEarnings;

    let insight = '';
    let riskLevel = '';
    let color = '';
    let icon = null;

    if (source === 'borrowed') {
      if (realEarnings < 0) {
        insight = "⚠️ HIGH RISK: You used borrowed money and experienced losses. This is extremely dangerous financially. The borrowed funds still need repayment while your investment lost value. Consider avoiding leverage in crypto investments and focus on debt repayment.";
        riskLevel = 'High Risk';
        color = 'text-red-600';
        icon = <AlertTriangle className="h-6 w-6 text-red-600" />;
      } else if (realEarnings > 0 && realEarnings < totalGains * 0.1) {
        insight = "⚠️ MODERATE RISK: You made a small profit using borrowed money. While positive, the returns barely justify the risk of leverage. Consider whether the stress and risk were worth these modest gains.";
        riskLevel = 'Moderate Risk';
        color = 'text-yellow-600';
        icon = <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      } else {
        insight = "💰 PROFIT WITH CAUTION: You made good profits using borrowed money, but leverage is inherently risky. Consider taking profits to repay debt and reduce your risk exposure. Don't let success lead to overconfidence.";
        riskLevel = 'Moderate Risk';
        color = 'text-blue-600';
        icon = <DollarSign className="h-6 w-6 text-blue-600" />;
      }
    } else {
      if (realEarnings < 0) {
        insight = "📉 LEARNING EXPERIENCE: You experienced losses using your savings. While disappointing, you didn't compound the problem with debt. This is a valuable learning experience. Review your strategy and consider dollar-cost averaging for future investments.";
        riskLevel = 'Manageable Loss';
        color = 'text-orange-600';
        icon = <TrendingUp className="h-6 w-6 text-orange-600" />;
      } else {
        insight = "✅ WELL MANAGED: Excellent! You made profits using your own savings without taking on debt. This demonstrates good financial discipline. Your investment strategy appears sound and sustainable.";
        riskLevel = 'Well Managed';
        color = 'text-green-600';
        icon = <CheckCircle className="h-6 w-6 text-green-600" />;
      }
    }

    return { insight, riskLevel, color, icon };
  };

  const handleSourceSelect = (source: 'savings' | 'borrowed') => {
    onFundingSourceSelect(source);
    setShowInsight(true);
  };

  const insightData = fundingSource ? generateInsight(fundingSource) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">AI Financial Insight</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {!showInsight ? (
            <div>
              <p className="text-gray-700 mb-6">
                To provide personalized financial insights, please tell us about your funding source:
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleSourceSelect('savings')}
                  className="w-full p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all text-left"
                >
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Personal Savings</h4>
                      <p className="text-gray-600 text-sm">I used my own money that I could afford to lose</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleSourceSelect('borrowed')}
                  className="w-full p-4 border-2 border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all text-left"
                >
                  <div className="flex items-center">
                    <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Borrowed Money</h4>
                      <p className="text-gray-600 text-sm">I used loans, credit cards, or borrowed funds</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            insightData && (
              <div>
                <div className="flex items-center mb-4">
                  {insightData.icon}
                  <h4 className={`text-lg font-semibold ml-2 ${insightData.color}`}>
                    {insightData.riskLevel}
                  </h4>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {insightData.insight}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-900">Net Profit</div>
                    <div className="text-xl font-bold text-blue-600">
                      ${(taxCalculation.shortTermGains + taxCalculation.longTermGains - taxCalculation.totalTax).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-purple-900">Real Earnings</div>
                    <div className={`text-xl font-bold ${taxCalculation.realEarnings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${taxCalculation.realEarnings.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">Funding Source</div>
                    <div className="text-xl font-bold text-gray-600 capitalize">
                      {fundingSource}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Got it, thanks!
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInsightModal;