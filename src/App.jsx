import { useState } from 'react';
import Header from './components/Header';
import AnalyticsPanel from './components/AnalyticsPanel';

function App() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [transferRequested, setTransferRequested] = useState(false);

  const handleTransfer = () => {
    console.log(' Transferindo para atendimento humano...');
    setTransferRequested(true);
  };

  const mockStats = {
    positive: 8,
    negative: 1,
    neutral: 3,
    total: 12
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-blue-500 to-blue-200 p-6">
      <div className="max-w-3xl mx-auto">
        <Header 
          showAnalytics={showAnalytics}
          setShowAnalytics={setShowAnalytics}
          transferRequested={transferRequested}
          onTransfer={handleTransfer}
        />

        {showAnalytics && <AnalyticsPanel stats={mockStats} />}

        <div className="bg-white p-6 rounded-b-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4"> Teste - Header Component</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Status Atual:</h3>
              <p>Analytics: <span className={showAnalytics ? 'text-green-600 font-semibold' : 
                'text-gray-400'}>
                {showAnalytics ? 'VISÍVEL ' : 'OCULTO'}
              </span></p>
              <p>Transfer: <span className={transferRequested ? 'text-green-600 font-semibold' : 'text-gray-400'}>
                {transferRequested ? 'SOLICITADO ' : 'NÃO SOLICITADO'}
              </span></p>
            </div>

            {transferRequested && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700">
                   Botão de transferência desapareceu corretamente!
                </p>
                <button 
                  onClick={() => setTransferRequested(false)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Resetar Teste
                </button>
              </div>
            )}

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;