export interface TransactionData {
  timestamp: string;
  asset: string;
  type: 'buy' | 'sell' | 'transfer';
  quantity: number;
  price: number;
  fee: number;
  exchange: string;
}

export interface TaxCalculation {
  shortTermGains: number;
  longTermGains: number;
  totalTax: number;
  realEarnings: number;
  inflationAdjustedReturn: number;
}

export interface CountryTaxRules {
  shortTermRate: number;
  longTermRate: number;
  allowance: number;
  tds?: number;
  name: string;
  flag: string;
}