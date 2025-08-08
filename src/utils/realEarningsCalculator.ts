import { TaxCalculation } from '../types/transaction';

const INFLATION_RATES = {
  IN: 0.05, // 5%
  US: 0.03, // 3%
  UK: 0.028 // 2.8%
};

export const calculateRealEarnings = (
  taxCalculation: TaxCalculation,
  country: 'IN' | 'US' | 'UK'
): { realEarnings: number; inflationAdjustedReturn: number } => {
  const inflationRate = INFLATION_RATES[country];
  const totalGains = taxCalculation.shortTermGains + taxCalculation.longTermGains;
  const netProfit = totalGains - taxCalculation.totalTax;
  
  // Assume average holding period of 1 year for inflation calculation
  const inflationImpact = Math.abs(totalGains) * inflationRate;
  const realEarnings = netProfit - inflationImpact;
  
  // Calculate inflation-adjusted return as percentage
  const inflationAdjustedReturn = Math.abs(totalGains) > 0 
    ? (realEarnings / Math.abs(totalGains)) * 100
    : 0;

  return {
    realEarnings,
    inflationAdjustedReturn
  };
};