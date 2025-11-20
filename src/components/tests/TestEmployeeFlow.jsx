import React, { useState } from 'react';
import { CheckCircle, XCircle, Play, Users, MessageSquare, UserCheck, Package } from 'lucide-react';

/**
 * TESTE COMPLETO DE FLUXO - EMPLOYEE DASHBOARD
 * Simula todo o ciclo de atendimento
 */

export default function TestEmployeeFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Criar Cliente de Teste',
      icon: Users,
      color: 'blue',
      action: createTestClient
    },
    {
      id: 2,
      title: 'Criar Conversa do Cliente',
      icon: MessageSquare,
      color: 'purple',
      action: createTestConversation
    },
    {
      id: 3,
      title: 'Criar Funcionário',
      icon: UserCheck,
      color: 'green',
      action: createTestEmployee
    },
    {
      id: 4,
      title: 'Simular Assumir Atendimento',
      icon: Package,
      color: 'orange',
      action: simulateAssignAttendance
    },
    {
      id: 5,
      title: 'Simular Resposta',
      icon: MessageSquare,
      color: 'indigo',
      action: simulateResponse
    },
    {
      id: 6,
      title: 'Simular Finalização',
      icon: CheckCircle,
      color: 'yellow',
      action: simulateClose
    }
  ];

  const addResult = (step, success, message) => {
    setTestResults(prev => [...prev, {
      id: Date.now(),
      step,
      success,
      message,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  // STEP 1: Criar Cliente
  function createTestClient() {
    try {
      const testUser = {
        id: 'user_test_' + Date.now(),
        name: 'Maria Cliente Teste',
        email: 'maria.teste@email.com',
        phone: '+55 21 98888-8888',
        password: '123456',
        type: 'customer',
        createdAt: new Date().toISOString()
      };

      const users = JSON.parse(localStorage.getItem('fashionstore_db_users') || '[]');
      users.push(testUser);
      localStorage.setItem('fashionstore_db_users', JSON.stringify(users));
      
      // Salvar no sessionStorage para usar nos próximos steps
      sessionStorage.setItem('test_user_id', testUser.id);
      
      addResult(1, true, `Cliente criado: ${testUser.name} (ID: ${testUser.id})`);
      return true;
    } catch (error) {
      addResult(1, false, error.message);
      return false;
    }
  }

  // STEP 2: Criar Conversa
  function createTestConversation() {
    try {
      const userId = sessionStorage.getItem('test_user_id');
      if (!userId) throw new Error('Execute o Step 1 primeiro!');

      const testConversation = {
        id: 'conv_test_' + Date.now(),
        userId: userId,
        category: 'produtos',
        status: 'active',
        messages: [
          {
            role: 'user',
            content: 'Olá! Gostaria de saber sobre tamanhos de camisetas.',
            timestamp: new Date().toISOString(),
            sentiment: 'neutral'
          },
          {
            role: 'assistant',
            content: 'Olá! Claro, posso ajudar com isso. Temos tamanhos P, M, G e GG disponíveis.',
            timestamp: new Date().toISOString(),
            sentiment: 'positive'
          },
          {
            role: 'user',
            content: 'Perfeito! Mas tenho uma reclamação sobre meu último pedido...',
            timestamp: new Date().toISOString(),
            sentiment: 'negative'
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const conversations = JSON.parse(localStorage.getItem('fashionstore_conversations') || '{}');
      conversations[userId] = [testConversation];
      localStorage.setItem('fashionstore_conversations', JSON.stringify(conversations));
      
      sessionStorage.setItem('test_conv_id', testConversation.id);
      
      addResult(2, true, `Conversa criada com 3 mensagens (ID: ${testConversation.id})`);
      return true;
    } catch (error) {
      addResult(2, false, error.message);
      return false;
    }
  }

  // STEP 3: Criar Funcionário
  function createTestEmployee() {
    try {
      const testEmployee = {
        id: 'emp_test_' + Date.now(),
        name: 'João Atendente Teste',
        email: 'joao.teste@fashionstore.com',
        password: '123456',
        type: 'employee',
        department: 'support',
        status: 'online',
        createdAt: new Date().toISOString()
      };

      const employees = JSON.parse(localStorage.getItem('fashionstore_db_employees') || '[]');
      employees.push(testEmployee);
      localStorage.setItem('fashionstore_db_employees', JSON.stringify(employees));
      
      sessionStorage.setItem('test_emp_id', testEmployee.id);
      sessionStorage.setItem('test_emp_name', testEmployee.name);
      
      addResult(3, true, `Funcionário criado: ${testEmployee.name} (ID: ${testEmployee.id})`);
      return true;
    } catch (error) {
      addResult(3, false, error.message);
      return false;
    }
  }

  // STEP 4: Assumir Atendimento
  function simulateAssignAttendance() {
    try {
      const userId = sessionStorage.getItem('test_user_id');
      const convId = sessionStorage.getItem('test_conv_id');
      const empId = sessionStorage.getItem('test_emp_id');
      const empName = sessionStorage.getItem('test_emp_name');
      
      if (!userId || !convId || !empId) {
        throw new Error('Execute os steps anteriores primeiro!');
      }

      const conversations = JSON.parse(localStorage.getItem('fashionstore_conversations'));
      const conversation = conversations[userId].find(c => c.id === convId);
      
      conversation.assignedTo = {
        id: empId,
        name: empName,
        assignedAt: new Date().toISOString()
      };
      conversation.status = 'in_progress';
      conversation.updatedAt = new Date().toISOString();
      
      localStorage.setItem('fashionstore_conversations', JSON.stringify(conversations));
      
      addResult(4, true, `Atendimento assumido por ${empName}`);
      return true;
    } catch (error) {
      addResult(4, false, error.message);
      return false;
    }
  }

  // STEP 5: Enviar Resposta
  function simulateResponse() {
    try {
      const userId = sessionStorage.getItem('test_user_id');
      const convId = sessionStorage.getItem('test_conv_id');
      const empId = sessionStorage.getItem('test_emp_id');
      const empName = sessionStorage.getItem('test_emp_name');
      
      if (!userId || !convId || !empId) {
        throw new Error('Execute os steps anteriores primeiro!');
      }

      const conversations = JSON.parse(localStorage.getItem('fashionstore_conversations'));
      const conversation = conversations[userId].find(c => c.id === convId);
      
      const newMessage = {
        role: 'assistant',
        content: 'Entendo sua preocupação. Vou transferir você para um atendente humano que pode resolver isso imediatamente.',
        timestamp: new Date().toISOString(),
        sentiment: 'neutral',
        sentBy: {
          id: empId,
          name: empName,
          type: 'employee'
        }
      };
      
      conversation.messages.push(newMessage);
      conversation.updatedAt = new Date().toISOString();
      
      localStorage.setItem('fashionstore_conversations', JSON.stringify(conversations));
      
      addResult(5, true, `Mensagem enviada pelo funcionário`);
      return true;
    } catch (error) {
      addResult(5, false, error.message);
      return false;
    }
  }

  // STEP 6: Finalizar Atendimento
  function simulateClose() {
    try {
      const userId = sessionStorage.getItem('test_user_id');
      const convId = sessionStorage.getItem('test_conv_id');
      const empId = sessionStorage.getItem('test_emp_id');
      
      if (!userId || !convId || !empId) {
        throw new Error('Execute os steps anteriores primeiro!');
      }

      const conversations = JSON.parse(localStorage.getItem('fashionstore_conversations'));
      const conversation = conversations[userId].find(c => c.id === convId);
      
      conversation.status = 'closed';
      conversation.closedAt = new Date().toISOString();
      conversation.closedBy = empId;
      conversation.updatedAt = new Date().toISOString();
      
      localStorage.setItem('fashionstore_conversations', JSON.stringify(conversations));
      
      addResult(6, true, `Atendimento finalizado com sucesso`);
      return true;
    } catch (error) {
      addResult(6, false, error.message);
      return false;
    }
  }

  // Executar step individual
  const runStep = async (stepIndex) => {
    setLoading(true);
    setCurrentStep(stepIndex);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const step = steps[stepIndex];
    const success = step.action();
    
    if (success) {
      setCurrentStep(stepIndex + 1);
    }
    
    setLoading(false);
  };

  // Executar todos os steps
  const runAllSteps = async () => {
    setLoading(true);
    setTestResults([]);
    setCurrentStep(0);
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      const success = steps[i].action();
      if (!success) break;
      setCurrentStep(i + 1);
    }
    
    setLoading(false);
  };

  // Limpar tudo
  const clearAll = () => {
    sessionStorage.clear();
    setTestResults([]);
    setCurrentStep(0);
    addResult(0, true, 'Dados de teste limpos');
  };

  return (
    <div className="min-h-screen bg-blue-800  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
             Teste Completo - Fluxo de Atendimento
          </h1>
          <p className="text-gray-600">
            Simula todo o ciclo: Cliente → Conversa → Funcionário → Atendimento
          </p>
        </div>

        {/* Controles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={runAllSteps}
            disabled={loading}
            className="bg-green-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6" />
            {loading ? 'Executando...' : 'Executar Tudo'}
          </button>

          <button
            onClick={clearAll}
            className="bg-red-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2"
          >
            <XCircle className="w-6 h-6" />
            Limpar
          </button>

          <button
            onClick={() => window.location.href = '/employee-dashboard'}
            className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
          >
            <UserCheck className="w-6 h-6" />
            Ir para Dashboard
          </button>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > index;
            const isCurrent = currentStep === index;
            
            return (
              <button
                key={step.id}
                onClick={() => runStep(index)}
                disabled={loading}
                className={`p-6 rounded-xl transition-all ${
                  isCompleted
                    ? `bg-${step.color}-500 text-white`
                    : isCurrent
                    ? `bg-${step.color}-100 border-2 border-${step.color}-500`
                    : 'bg-white text-gray-800'
                } hover:shadow-lg disabled:opacity-50`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-6 h-6" />
                  <span className="font-bold">Step {step.id}</span>
                </div>
                <p className="text-sm">{step.title}</p>
                {isCompleted && (
                  <CheckCircle className="w-5 h-5 mt-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Resultados */}
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
             Log de Execução ({testResults.length})
          </h2>

          {testResults.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="font-semibold">Nenhum teste executado</p>
              <p className="text-sm mt-2">Clique em "Executar Tudo" para começar</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {testResults.map(result => (
                <div
                  key={result.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    result.success
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {result.success ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="font-bold text-sm">Step {result.step}</span>
                    </div>
                    <span className="text-xs text-gray-500">{result.timestamp}</span>
                  </div>
                  <p className="text-sm mt-2 text-gray-700">{result.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instruções */}
        <div className="mt-6 bg-gray-900 text-green-400 rounded-xl p-6 font-mono text-sm">
          <h3 className="text-lg font-bold mb-3">Como funciona:</h3>
          <div className="space-y-2">
            <p>1. Clique em "Executar Tudo" para simular fluxo completo</p>
            <p>2. Ou clique em cada Step individual para testar separadamente</p>
            <p>3. Depois, clique em "Ir para Dashboard" para ver o resultado</p>
            <p>4. Faça login como funcionário (ana@fashionstore.com / 123456)</p>
            <p>5. Você verá o atendimento criado na fila</p>
            <p>6. Use "Limpar" para resetar e testar novamente</p>
          </div>
        </div>
      </div>
    </div>
  );
}