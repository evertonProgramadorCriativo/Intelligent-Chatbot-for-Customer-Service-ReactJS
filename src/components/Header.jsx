import React from 'react';
import { ShoppingBag, BarChart3, Headphones } from 'lucide-react';

export default function Header({ showAnalytics, setShowAnalytics, transferRequested, onTransfer }) {
  return (
    <div className="bg-white rounded-t-2xl shadow-lg p-3 sm:p-4 md:p-6 border-b border-gray-200">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-yellow-200 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Fashion Store</h1>
            <p className="text-xs sm:text-sm text-gray-500">Atendimento Virtual • Online 24/7</p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex-1 sm:flex-initial text-sm"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Analytics</span>
          </button>
          {!transferRequested && (
            <button
              onClick={onTransfer}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex-1 sm:flex-initial text-sm"
            >
              <Headphones className="w-4 h-4" />
              <span className="hidden sm:inline">Falar com Humano</span>
              <span className="sm:hidden">Humano</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}