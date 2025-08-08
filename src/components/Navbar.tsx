import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, BookOpen, TrendingUp, FileText } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CryptoTax Pro</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>Calculator</span>
            </Link>
            <Link
              to="/learn"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/learn') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Learn</span>
            </Link>
            <Link
              to="/tax-saving-tips"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/tax-saving-tips') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Tax Tips</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;