import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * COMPONENTE DE TESTE DO AUTHCONTEXT
 * Use para testar todas as funcionalidades de autenticação
 */

export default function TestAuthContext() {
  const { user, isAuthenticated, loading, login, logout, updateUser } = useAuth();
  
  // Estado local para formulários de teste
  const [testName, setTestName] = useState('João Teste');
  const [testEmail, setTestEmail] = useState('joao@teste.com');
  const [testType, setTestType] = useState('customer');

   
  // FUNÇÃO: Simular Login
   
  const handleTestLogin = async () => {
    console.log('TESTE: Simulando login...');
    
    const userData = {
      id: Date.now().toString(),
      name: testName,
      email: testEmail,
      type: testType,
      createdAt: new Date().toISOString()
    };
    
    const result = await login(userData);
    
    if (result.success) {
      alert(' Login realizado com sucesso!\n\nVerifique o console para detalhes.');
    } else {
      alert(' Erro no login: ' + result.error);
    }
  };

   
  // FUNÇÃO: Simular Logout
   
  const handleTestLogout = () => {
    console.log(' TESTE: Simulando logout...');
    
    if (confirm(' Deseja fazer logout?')) {
      logout();
      alert(' Logout realizado com sucesso!');
    }
  };

   
  // FUNÇÃO: Atualizar Usuário
   
  const handleUpdateUser = () => {
    console.log('TESTE: Atualizando usuário...');
    
    const newName = prompt('Digite o novo nome:', user?.name);
    
    if (newName) {
      updateUser({ name: newName });
      alert('Usuário atualizado com sucesso!');
    }
  };

   
  // RENDERIZAR
   
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-500 to-blue-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
             Teste - AuthContext
          </h1>
          <p className="text-gray-600">
            Componente para testar todas as funcionalidades de autenticação
          </p>
        </div>

        {/* Status do Loading */}
        {loading && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded">
            <p className="text-yellow-700 font-semibold">
               Carregando autenticação...
            </p>
          </div>
        )}

        {/* Status de Autenticação */}
        <div className={`rounded-xl shadow-lg p-6 mb-6 ${
          isAuthenticated 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <h2 className="text-2xl font-bold mb-4">
            {isAuthenticated ? ' Usuário Autenticado' : ' Não Autenticado'}
          </h2>
          
          {isAuthenticated && user ? (
            <div className="space-y-2">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Tipo:</strong> {user.type === 'customer' ? 'Cliente' : 'Funcionário'}</p>
              <p><strong>Criado em:</strong> {new Date(user.createdAt).toLocaleString('pt-BR')}</p>
            </div>
          ) : (
            <p>Nenhum usuário logado no momento.</p>
          )}
        </div>

        {/* Painel de Testes */}
        {!isAuthenticated ? (
           
          // FORMULÁRIO DE LOGIN
           
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
               Simular Login
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Digite o nome"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Digite o email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Usuário
                </label>
                <select
                  value={testType}
                  onChange={(e) => setTestType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="customer">Cliente</option>
                  <option value="employee">Funcionário</option>
                </select>
              </div>

              <button
                onClick={handleTestLogin}
                className="w-full bg-gradient-to-r from-green-500 to-green-400
                 text-white font-bold py-3 rounded-lg hover:from-green-700
                  hover:to-grenn-600 transition-all shadow-lg"
              >
                 FAZER LOGIN
              </button>
            </div>
          </div>
        ) : (
           
          // AÇÕES DO USUÁRIO LOGADO
           
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
               Ações Disponíveis
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={handleUpdateUser}
                className="w-full bg-blue-500 text-white font-bold py-3 
                rounded-lg hover:bg-blue-600 transition-all shadow-md"
              >
                 Atualizar Nome
              </button>

              <button
                onClick={handleTestLogout}
                className="w-full bg-red-500 text-white
                 font-bold py-3 rounded-lg hover:bg-red-600 transition-all shadow-md"
              >
                 FAZER LOGOUT
              </button>
            </div>
          </div>
        )}

        {/* Instruções de Debug */}
        <div className="bg-gray-900 text-green-400 rounded-xl shadow-lg p-6 font-mono text-sm">
          <h3 className="text-lg font-bold mb-3"> Debug Console</h3>
          <div className="space-y-1">
            <p>→ Abra o DevTools (F12)</p>
            <p>→ Vá na aba Console</p>
            <p>→ Veja os logs detalhados de cada ação</p>
            <p>→ Vá em Application &gt; Local Storage</p>
            <p>→ Veja os dados sendo salvos/removidos</p>
          </div>
        </div>
      </div>
    </div>
  );
}