import { TransactionData, TaxCalculation, CountryTaxRules } from '../types/transaction';

const TAX_RULES: Record<'IN' | 'US' | 'UK', CountryTaxRules> = {
  IN: {
    shortTermRate: 0.30,
    longTermRate: 0.30,
    allowance: 0,
    tds: 0.01,
    name: 'India',
    flag: '🇮🇳'
  },
  US: {
    shortTermRate: 0.22, // Average rate
    longTermRate: 0.15,
    allowance: 0,
    name: 'United States',
    flag: '🇺🇸'
  },
  UK: {
    shortTermRate: 0.20,
    longTermRate: 0.20,
    allowance: 6000,
    name: 'United Kingdom',
    flag: '🇬🇧'
  }
};

interface Position {
  asset: string;
  quantity: number;
  price: number;
  timestamp: Date;
  fee: number;
}

export const calculateTax = (
  transactions: TransactionData[],
  country: 'IN' | 'US' | 'UK',
  method: 'FIFO' | 'LIFO' | 'HIFO'
): TaxCalculation => {
  const rules = TAX_RULES[country];
  const positions: Position[] = [];
  let shortTermGains = 0;
  let longTermGains = 0;

  // Sort transactions by timestamp
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  for (const transaction of sortedTransactions) {
    const transactionDate = new Date(transaction.timestamp);

    if (transaction.type === 'buy') {
      // Add to positions
      positions.push({
        asset: transaction.asset,
        quantity: transaction.quantity,
        price: transaction.price,
        timestamp: transactionDate,
        fee: transaction.fee
      });
    } else if (transaction.type === 'sell') {
      // Find matching positions to sell
      let remainingQuantity = transaction.quantity;
      const assetPositions = positions.filter(p => p.asset === transaction.asset && p.quantity > 0);

      // Apply method sorting
      if (method === 'FIFO') {
        assetPositions.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      } else if (method === 'LIFO') {
        assetPositions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      } else if (method === 'HIFO') {
        assetPositions.sort((a, b) => b.price - a.price);
      }

      for (const position of assetPositions) {
        if (remainingQuantity <= 0) break;

        const sellQuantity = Math.min(remainingQuantity, position.quantity);
        const costBasis = position.price * sellQuantity + (position.fee * sellQuantity / position.quantity);
        const sellAmount = transaction.price * sellQuantity - (transaction.fee * sellQuantity / transaction.quantity);
        const gain = sellAmount - costBasis;

        // Determine if short-term or long-term
        const holdingPeriod = transactionDate.getTime() - position.timestamp.getTime();
        const isLongTerm = holdingPeriod > 365 * 24 * 60 * 60 * 1000; // 1 year

        if (isLongTerm) {
          longTermGains += gain;
        } else {
          shortTermGains += gain;
        }

        // Update position
        position.quantity -= sellQuantity;
        remainingQuantity -= sellQuantity;
      }
    }
  }

  // Calculate tax
  const totalGains = shortTermGains + longTermGains;
  const taxableAmount = Math.max(0, totalGains - rules.allowance);
  
  let totalTax = 0;
  if (taxableAmount > 0) {
    const shortTermTax = Math.max(0, shortTermGains) * rules.shortTermRate;
    const longTermTax = Math.max(0, longTermGains) * rules.longTermRate;
    totalTax = shortTermTax + longTermTax;

    // Add TDS for India
    if (country === 'IN' && rules.tds) {
      totalTax += totalGains * rules.tds;
    }

    // Add cess for India (4%)
    if (country === 'IN') {
      totalTax += totalTax * 0.04;
    }
  }

  return {
    shortTermGains,
    longTermGains,
    totalTax,
    realEarnings: 0, // Will be calculated separately
    inflationAdjustedReturn: 0
  };
};