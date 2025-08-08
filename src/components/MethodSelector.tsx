import React from 'react';
import { Calculator } from 'lucide-react';

interface MethodSelectorProps {
  calculationMethod: 'FIFO' | 'LIFO' | 'HIFO';
  setCalculationMethod: (method: 'FIFO' | 'LIFO' | 'HIFO') => void;
}

const MethodSelector: React.FC<MethodSelectorProps> = ({
  calculationMethod,
  setCalculationMethod
}) => {
  const methods = [
    {
      code: 'FIFO',
      name: 'First In, First Out',
      description: 'Sell oldest coins first (most common)'
    },
    {
      code: 'LIFO',
      name: 'Last In, First Out',
      description: 'Sell newest coins first'
    },
    {
      code: 'HIFO',
      name: 'Highest In, First Out',
      description: 'Sell highest cost coins first (minimize gains)'
    }
  ];

  return (
    <div>
      <div className="flex items-center mb-3">
        <Calculator className="h-5 w-5 text-blue-600 mr-2" />
        <label className="text-sm font-medium text-gray-900">
          Calculation Method
        </label>
      </div>
      <div className="space-y-2">
        {methods.map((method) => (
          <button
            key={method.code}
            onClick={() => setCalculationMethod(method.code as 'FIFO' | 'LIFO' | 'HIFO')}
            className={`w-full text-left p-3 border rounded-lg transition-all ${
              calculationMethod === method.code
                ? 'border-blue-600 bg-blue-50 text-blue-900'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{method.name}</div>
                <div className="text-sm text-gray-500">{method.description}</div>
              </div>
              {calculationMethod === method.code && (
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MethodSelector;