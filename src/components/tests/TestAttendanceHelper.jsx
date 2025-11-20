import React, { useState } from 'react';
import { CheckCircle, XCircle, Play, Users, Package, AlertCircle } from 'lucide-react';

/**
 * COMPONENTE DE TESTE - ATTENDANCE HELPER
 * Testa todas as funções de gerenciamento de atendimentos
 * 
 *  
 */

export default function TestAttendanceHelper() {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simular dados de teste
  const mockEmployee = {
    id: 'emp_1',
    name: 'Ana Atendente'
  };

  const mockConversation = {
    id: 'conv_123',
    userId: 'user_1',
    category: 'produtos',
    messages: [
      { role: 'user', content: 'Olá!', timestamp: new Date().toISOString() }
    ],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Adicionar resultado ao log
  const addResult = (test, success, details) => {
    const result = {
      id: Date.now(),
      test,
      success,
      details,
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => [result, ...prev]);
  };

  // TESTE 1: Salvar conversa simulada
  const testSaveConversation = () => {
    try {
      // Simular salvamento
      const storageKey = 'fashionstore_conversations';
      const allConversations = JSON.parse(localStorage.getItem(storageKey) || '{}');
      
      if (!allConversations['user_1']) {
        allConversations['user_1'] = [];
      }
      
      allConversations['user_1'].push(mockConversation);
      localStorage.setItem(storageKey, JSON.stringify(allConversations));
      
      addResult(
        'Salvar Conversa Simulada',
        true,
        'Conversa salva com sucesso no localStorage'
      );
    } catch (error) {
      addResult('Salvar Conversa Simulada', false, error.message);
    }
  };

  // TESTE 2: Buscar todas as conversas
  const testGetAllConversations = () => {
    try {
      const storageKey = 'fashionstore_conversations';
      const allConversations = JSON.parse(localStorage.getItem(storageKey) || '{}');
      
      const conversationsArray = [];
      Object.keys(allConversations).forEach(userId => {
        allConversations[userId].forEach(conv => {
          conversationsArray.push({ ...conv, userId });
        });
      });
      
      addResult(
        'Buscar Todas as Conversas',
        true,
        `${conversationsArray.length} conversas encontradas`
      );
    } catch (error) {
      addResult('Buscar Todas as Conversas', false, error.message);
    }
  };

  // TESTE 3: Assumir atendimento
  const testAssignAttendance = () => {
    try {
      const storageKey = 'fashionstore_conversations';
      const allConversations = JSON.parse(localStorage.getItem(storageKey) || '{}');
      
      if (allConversations['user_1'] && allConversations['user_1'].length > 0) {
        const conversation = allConversations['user_1'][0];
        
        conversation.assignedTo = {
          id: mockEmployee.id,
          name: mockEmployee.name,
          assignedAt: new Date().toISOString()
        };
        conversation.status = 'in_progress';
        
        localStorage.setItem(storageKey, JSON.stringify(allConversations));
        
        addResult(
          'Assumir Atendimento',
          true,
          `Atendimento assumido por ${mockEmployee.name}`
        );
      } else {
        throw new Error('Nenhuma conversa disponível para assumir');
      }
    } catch (error) {
      addResult('Assumir Atendimento', false, error.message);
    }
  };

  // TESTE 4: Finalizar atendimento
  const testCloseAttendance = () => {
    try {
      const storageKey = 'fashionstore_conversations';
      const allConversations = JSON.parse(localStorage.getItem(storageKey) || '{}');
      
      if (allConversations['user_1'] && allConversations['user_1'].length > 0) {
        const conversation = allConversations['user_1'][0];
        
        conversation.status = 'closed';
        conversation.closedAt = new Date().toISOString();
        conversation.closedBy = mockEmployee.id;
        
        localStorage.setItem(storageKey, JSON.stringify(allConversations));
        
        addResult(
          'Finalizar Atendimento',
          true,
          'Atendimento finalizado com sucesso'
        );
      } else {
        throw new Error('Nenhuma conversa disponível para finalizar');
      }
    } catch (error) {
      addResult('Finalizar Atendimento', false, error.message);
    }
  };

  // TESTE 5: Estatísticas
  const testGetStats = () => {
    try {
      const storageKey = 'fashionstore_conversations';
      const allConversations = JSON.parse(localStorage.getItem(storageKey) || '{}');
      
      const conversationsArray = [];
      Object.keys(allConversations).forEach(userId => {
        allConversations[userId].forEach(conv => {
          conversationsArray.push(conv);
        });
      });
      
      const stats = {
        total: conversationsArray.length,
        pending: conversationsArray.filter(c => !c.assignedTo && c.status !== 'closed').length,
        inProgress: conversationsArray.filter(c => c.assignedTo && c.status !== 'closed').length,
        closed: conversationsArray.filter(c => c.status === 'closed').length
      };
      
      addResult(
        'Calcular Estatísticas',
        true,
        JSON.stringify(stats, null, 2)
      );
    } catch (error) {
      addResult('Calcular Estatísticas', false, error.message);
    }
  };

  // Limpar localStorage
  const clearStorage = () => {
    localStorage.removeItem('fashionstore_conversations');
    setTestResults([]);
    addResult('Limpar Storage', true, 'LocalStorage limpo com sucesso');
  };

  // Executar todos os testes
  const runAllTests = async () => {
    setLoading(true);
    setTestResults([]);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    testSaveConversation();
    
    await new Promise(resolve => setTimeout(resolve, 300));
    testGetAllConversations();
    
    await new Promise(resolve => setTimeout(resolve, 300));
    testAssignAttendance();
    
    await new Promise(resolve => setTimeout(resolve, 300));
    testGetStats();
    
    await new Promise(resolve => setTimeout(resolve, 300));
    testCloseAttendance();
    
    await new Promise(resolve => setTimeout(resolve, 300));
    testGetStats();
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-600 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        

        {/* Botões de Controle */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={runAllTests}
            disabled={loading}
            className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            {loading ? 'Executando...' : 'Executar Todos'}
          </button>

          <button
            onClick={testSaveConversation}
            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            Salvar Conversa
          </button>

          <button
            onClick={testGetAllConversations}
            className="bg-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-600 transition-all flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            Buscar Todas
          </button>

          <button
            onClick={testAssignAttendance}
            className="bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Assumir
          </button>

          <button
            onClick={testGetStats}
            className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-all flex items-center justify-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            Estatísticas
          </button>

          <button
            onClick={clearStorage}
            className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            Limpar
          </button>
        </div>

        {/* Resultados */}
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
             Resultados dos Testes ({testResults.length})
          </h2>

          {testResults.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="font-semibold">Nenhum teste executado</p>
              <p className="text-sm mt-2">Clique em um dos botões acima para começar</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {testResults.map(result => (
                <div
                  key={result.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    result.success
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {result.success ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <h3 className="font-bold text-sm">{result.test}</h3>
                    </div>
                    <span className="text-xs text-gray-500">{result.timestamp}</span>
                  </div>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto font-mono">
{result.details}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
}