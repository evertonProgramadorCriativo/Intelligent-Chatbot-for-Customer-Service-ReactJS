import React, { useState } from 'react';
import { loginUser,
     registerUser, 
     validateEmail,
      validatePassword, 
      resetDatabase } from '../services/authService';

/**
 * COMPONENTE DE TESTE DO AUTHSERVICE
 * Testa todas as funcionalidades de login e registro
 */

export default function TestAuthService() {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados do formulário de login
  const [loginEmail, setLoginEmail] = useState('joao@cliente.com');
  const [loginPassword, setLoginPassword] = useState('123456');

  // Estados do formulário de registro
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerType, setRegisterType] = useState('customer');

    
  // FUNÇÃO: Adicionar resultado ao log
    
  const addResult = (test, result, type = 'info') => {
    const newResult = {
      id: Date.now(),
      test,
      result: JSON.stringify(result, null, 2),
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => [newResult, ...prev]);
  };

    
  // TESTE: Validações
    
  const testValidations = () => {
    console.clear();
    addResult('Validação de Email Válido', validateEmail('teste@email.com'), 'success');
    addResult('Validação de Email Inválido', validateEmail('email-invalido'), 'error');
    addResult('Validação de Senha Válida', validatePassword('123456'), 'success');
    addResult('Validação de Senha Inválida', validatePassword('123'), 'error');
  };

    
  // TESTE: Login
    
  const testLogin = async () => {
    setLoading(true);
    console.log('Testando login...');
    
    try {
      const result = await loginUser(loginEmail, loginPassword);
      
      if (result.success) {
        addResult('LOGIN BEM-SUCEDIDO', result, 'success');
        alert('Login realizado com sucesso!\n\nUsuário: ' + result.user.name);
      } else {
        addResult('LOGIN FALHOU', result, 'error');
        alert('Erro no login:\n\n' + result.error);
      }
    } catch (error) {
      addResult('ERRO NO LOGIN', { error: error.message }, 'error');
    } finally {
      setLoading(false);
    }
  };

    
  // TESTE: Registro
    
  const testRegister = async () => {
    setLoading(true);
    console.log('Testando registro...');
    
    try {
      const result = await registerUser({
        name: registerName,
        email: registerEmail,
        phone: registerPhone,
        password: registerPassword,
        confirmPassword: registerConfirmPassword,
        type: registerType
      });
      
      if (result.success) {
        addResult('REGISTRO BEM-SUCEDIDO', result, 'success');
        alert('Usuário cadastrado com sucesso!\n\nNome: ' + result.user.name);
        
        // Limpar formulário
        setRegisterName('');
        setRegisterEmail('');
        setRegisterPhone('');
        setRegisterPassword('');
        setRegisterConfirmPassword('');
      } else {
        addResult('REGISTRO FALHOU', result, 'error');
        alert('Erro no cadastro:\n\n' + result.error);
      }
    } catch (error) {
      addResult('ERRO NO REGISTRO', { error: error.message }, 'error');
    } finally {
      setLoading(false);
    }
  };

    
  // TESTE: Cenários de erro
    
  const testErrorScenarios = async () => {
    setLoading(true);
    
    // Teste 1: Login com email inexistente
    const test1 = await loginUser('naoexiste@email.com', '123456');
    addResult('Login com email inexistente', test1, test1.success ? 'success' : 'warning');
    
    // Teste 2: Login com senha errada
    const test2 = await loginUser('joao@cliente.com', 'senha-errada');
    addResult('Login com senha errada', test2, test2.success ? 'success' : 'warning');
    
    // Teste 3: Registro com email duplicado
    const test3 = await registerUser({
      name: 'Teste',
      email: 'joao@cliente.com',
      phone: '21999999999',
      password: '123456',
      confirmPassword: '123456',
      type: 'customer'
    });
    addResult('Registro com email duplicado', test3, test3.success ? 'success' : 'warning');
    
    setLoading(false);
    alert('Testes de cenários de erro concluídos!\nVerifique os resultados abaixo.');
  };

    
  // RESETAR BANCO
    
  const handleResetDatabase = () => {
    if (confirm('Isso vai resetar todos os usuários de teste.\n\nDeseja continuar?')) {
      resetDatabase();
      addResult('BANCO DE DADOS RESETADO', { message: 'Usuários de teste recriados' }, 'warning');
      alert('Banco de dados resetado!');
    }
  };

    
  // RENDERIZAR
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
             Teste - AuthService
          </h1>
          <p className="text-gray-600">
            Teste completo de login, registro e validações
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PAINEL DE TESTES */}
          <div className="space-y-6">
            {/* Testes Rápidos */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                 Testes Rápidos
              </h2>
              <div className="space-y-3">
                <button
                  onClick={testValidations}
                  className="w-full bg-blue-500 text-white font-bold py-3
                   rounded-lg hover:bg-blue-600 transition-all"
                >
                   Testar Validações
                </button>
                <button
                  onClick={testErrorScenarios}
                  disabled={loading}
                  className="w-full bg-orange-500 text-white font-bold py-3
                   rounded-lg hover:bg-orange-600 transition-all disabled:opacity-50"
                >
                   Testar Cenários de Erro
                </button>
                <button
                  onClick={handleResetDatabase}
                  className="w-full bg-red-500 text-white font-bold
                   py-3 rounded-lg hover:bg-red-600 transition-all"
                >
                   Resetar Banco de Dados
                </button>
              </div>
            </div>

            {/* Formulário de Login */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                 Teste de Login
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 
                    rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Digite o email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300
                     rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Digite a senha"
                  />
                </div>
                <button
                  onClick={testLogin}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500
                   text-white font-bold py-3 rounded-lg hover:from-purple-600
                    hover:to-pink-600 transition-all disabled:opacity-50"
                >
                  {loading ? 'Processando...' : ' FAZER LOGIN'}
                </button>
                <p className="text-xs text-gray-500 text-center">
                   Usuários de teste: joao@cliente.com / maria@cliente.com<br/>
                  Senha: 123456
                </p>
              </div>
            </div>

            {/* Formulário de Registro */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                 Teste de Registro
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300
                   rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Nome completo"
                />
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300
                   rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 
                  rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Telefone"
                />
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 
                  rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Senha"
                />
                <input
                  type="password"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300
                   rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Confirmar senha"
                />
                <select
                  value={registerType}
                  onChange={(e) => setRegisterType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300
                   rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="customer">Cliente</option>
                  <option value="employee">Funcionário</option>
                </select>
                <button
                  onClick={testRegister}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500
                   to-emerald-500 text-white font-bold py-3
                    rounded-lg hover:from-green-600 hover:to-emerald-600 
                    transition-all disabled:opacity-50"
                >
                  {loading ? ' Processando...' : ' REGISTRAR'}
                </button>
              </div>
            </div>
          </div>

          {/* PAINEL DE RESULTADOS */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                 Resultados dos Testes
              </h2>
              <button
                onClick={() => setTestResults([])}
                className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded
                 hover:bg-gray-300"
              >
                 Limpar
              </button>
            </div>
            
            <div className="space-y-3 max-h-[800px] overflow-y-auto">
              {testResults.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Nenhum teste executado ainda.<br/>
                  Clique nos botões acima para começar.
                </p>
              ) : (
                testResults.map((result) => (
                  <div
                    key={result.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      result.type === 'success'
                        ? 'bg-green-50 border-green-500'
                        : result.type === 'error'
                        ? 'bg-red-50 border-red-500'
                        : result.type === 'warning'
                        ? 'bg-yellow-50 border-yellow-500'
                        : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-sm">{result.test}</h3>
                      <span className="text-xs text-gray-500">{result.timestamp}</span>
                    </div>
                    <pre className="text-xs bg-gray-900 text-green-400 
                    p-2 rounded overflow-x-auto font-mono">
                      {result.result}
                    </pre>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="mt-6 bg-gray-900 text-green-400 rounded-xl shadow-lg p-6 font-mono text-sm">
          <h3 className="text-lg font-bold mb-3">Instruções de Teste</h3>
          <div className="space-y-2">
            <p>→ Use os formulários para testar login e registro</p>
            <p>→ Clique em "Testes Rápidos" para executar bateria de testes</p>
            <p>→ Abra o DevTools (F12) para ver logs detalhados</p>
            <p>→ Veja em Application &gt; Local Storage os dados salvos</p>
            <p>→ Use "Resetar Banco" se quiser começar do zero</p>
          </div>
        </div>
      </div>
    </div>
  );
}