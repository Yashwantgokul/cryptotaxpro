import React, { useEffect, useRef } from 'react';
import { BarChart3 } from 'lucide-react';
import { TaxCalculation } from '../types/transaction';

interface InflationChartProps {
  taxCalculation: TaxCalculation;
  selectedCountry: 'IN' | 'US' | 'UK';
}

const InflationChart: React.FC<InflationChartProps> = ({ taxCalculation, selectedCountry }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const inflationRates = {
    IN: 5.0,
    US: 3.0,
    UK: 2.8
  };

  const countryNames = {
    IN: 'India',
    US: 'United States',
    UK: 'United Kingdom'
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Data
    const grossProfit = taxCalculation.shortTermGains + taxCalculation.longTermGains;
    const netProfit = grossProfit - taxCalculation.totalTax;
    const realEarnings = taxCalculation.realEarnings;
    const inflationRate = inflationRates[selectedCountry];

    const data = [
      { label: 'Gross Profit', value: grossProfit, color: '#10B981' },
      { label: 'After Tax', value: netProfit, color: '#3B82F6' },
      { label: 'Real Earnings', value: realEarnings, color: realEarnings >= 0 ? '#8B5CF6' : '#EF4444' },
    ];

    // Chart dimensions
    const padding = 40;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;
    const barWidth = chartWidth / data.length * 0.6;
    const maxValue = Math.max(...data.map(d => Math.abs(d.value)), 1000);

    // Draw bars
    data.forEach((item, index) => {
      const x = padding + (chartWidth / data.length) * index + (chartWidth / data.length - barWidth) / 2;
      const barHeight = Math.abs(item.value) / maxValue * chartHeight * 0.7;
      const y = item.value >= 0 
        ? padding + chartHeight * 0.7 - barHeight
        : padding + chartHeight * 0.7;

      // Draw bar
      ctx.fillStyle = item.color;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value label
      ctx.fillStyle = '#374151';
      ctx.font = '14px system-ui';
      ctx.textAlign = 'center';
      const valueText = `$${item.value.toFixed(0)}`;
      ctx.fillText(valueText, x + barWidth / 2, y - 8);

      // Draw category label
      ctx.fillStyle = '#6B7280';
      ctx.font = '12px system-ui';
      const labelY = padding + chartHeight * 0.8;
      ctx.fillText(item.label, x + barWidth / 2, labelY);
    });

    // Draw zero line
    ctx.strokeStyle = '#9CA3AF';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const zeroY = padding + chartHeight * 0.7;
    ctx.moveTo(padding, zeroY);
    ctx.lineTo(padding + chartWidth, zeroY);
    ctx.stroke();

  }, [taxCalculation, selectedCountry]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">Returns vs Inflation</h3>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {countryNames[selectedCountry]} inflation rate: {inflationRates[selectedCountry]}%
        </p>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-64"
        style={{ width: '100%', height: '256px' }}
      />
      <div className="mt-4 text-sm text-gray-600">
        <p>Real earnings show your profit after deducting taxes and adjusting for inflation impact.</p>
      </div>
    </div>
  );
};

export default InflationChart;