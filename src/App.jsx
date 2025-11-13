import { useState } from 'react';
import AnalyticsPanel from './components/AnalyticsPanel';

function App() {
  const [stats, setStats] = useState({
    positive: 5,
    negative: 2,
    neutral: 3,
    total: 10
  });

  const addPositive = () => {
    setStats(prev => ({
      ...prev,
      positive: prev.positive + 1,
      total: prev.total + 1
    }));
  };

  const addNegative = () => {
    setStats(prev => ({
      ...prev,
      negative: prev.negative + 1,
      total: prev.total + 1
    }));
  };

  const addNeutral = () => {
    setStats(prev => ({
      ...prev,
      neutral: prev.neutral + 1,
      total: prev.total + 1
    }));
  };

  const reset = () => {
    setStats({ positive: 0, negative: 0, neutral: 0, total: 0 });
  };

  return (
    <div className=" min-h-screen w-full bg-gradient-to-br from-blue-200 via-blue-500 to-blue-200 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400">
            <h1 className="text-2xl font-bold text-white">
               Teste - AnalyticsPanel Component
            </h1>
          </div>

          <AnalyticsPanel stats={stats} />

          <div className="p-6">
            <h3 className="font-semibold mb-4">Controles de Teste:</h3>
         <div className="flex flex-wrap justify-center mb-4" style={{ gap: '1rem' }}>
              <button 
                onClick={addPositive}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                 Positivo
              </button>
              <button 
                onClick={addNegative}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                 Negativo
              </button>
              <button 
                onClick={addNeutral}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Neutro
              </button>
              <button 
                onClick={reset}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;