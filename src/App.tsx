import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import TaxSavingTips from './pages/TaxSavingTips';
import { TransactionData } from './types/transaction';

function App() {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<'IN' | 'US' | 'UK'>('IN');
  const [calculationMethod, setCalculationMethod] = useState<'FIFO' | 'LIFO' | 'HIFO'>('FIFO');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                transactions={transactions}
                setTransactions={setTransactions}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                calculationMethod={calculationMethod}
                setCalculationMethod={setCalculationMethod}
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                transactions={transactions}
                selectedCountry={selectedCountry}
                calculationMethod={calculationMethod}
              />
            } 
          />
          <Route path="/learn" element={<Learn />} />
          <Route path="/tax-saving-tips" element={<TaxSavingTips />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;