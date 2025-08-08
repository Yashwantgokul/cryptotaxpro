import React from 'react';
import { Globe } from 'lucide-react';

interface CountrySelectorProps {
  selectedCountry: 'IN' | 'US' | 'UK';
  setSelectedCountry: (country: 'IN' | 'US' | 'UK') => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  setSelectedCountry
}) => {
  const countries = [
    { code: 'IN', name: 'India', flag: '🇮🇳', rate: '30% + 4% cess' },
    { code: 'US', name: 'United States', flag: '🇺🇸', rate: '0-37% (varies)' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', rate: '10% or 20%' }
  ];

  return (
    <div>
      <div className="flex items-center mb-3">
        <Globe className="h-5 w-5 text-blue-600 mr-2" />
        <label className="text-sm font-medium text-gray-900">
          Select Tax Jurisdiction
        </label>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {countries.map((country) => (
          <button
            key={country.code}
            onClick={() => setSelectedCountry(country.code as 'IN' | 'US' | 'UK')}
            className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
              selectedCountry === country.code
                ? 'border-blue-600 bg-blue-50 text-blue-900'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{country.flag}</span>
              <div className="text-left">
                <div className="font-medium">{country.name}</div>
                <div className="text-sm text-gray-500">{country.rate}</div>
              </div>
            </div>
            {selectedCountry === country.code && (
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountrySelector;