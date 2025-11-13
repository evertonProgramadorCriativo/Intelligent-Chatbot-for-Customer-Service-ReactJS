import React from 'react';

export default function AnalyticsPanel({ stats }) {
  return (
    <div className="bg-white border-b border-gray-200 p-3 sm:p-4 md:p-6">
      <h3 className="font-semibold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
        Análise de Satisfação do Cliente
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
          <p className="text-xs sm:text-sm font-semibold text-green-700 mb-1">Positivo</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.positive}</p>
          <p className="text-xs text-green-600">
            {stats.total > 0 ? Math.round((stats.positive / stats.total) * 100) : 0}%
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-200">
          <p className="text-xs sm:text-sm font-semibold text-red-700 mb-1">Negativo</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.negative}</p>
          <p className="text-xs text-red-600">
            {stats.total > 0 ? Math.round((stats.negative / stats.total) * 100) : 0}%
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">Neutro</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-600">{stats.neutral}</p>
          <p className="text-xs text-gray-600">
            {stats.total > 0 ? Math.round((stats.neutral / stats.total) * 100) : 0}%
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
          <p className="text-xs sm:text-sm font-semibold text-blue-700 mb-1">Total</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.total}</p>
          <p className="text-xs text-blue-600">mensagens</p>
        </div>
      </div>
    </div>
  );
}