import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { loginUser, registerUser } from '../services/authService';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';

/**
 * TEST AUTH FORMS
 * Componente para testar LoginForm e RegisterForm integrados
 */

function TestAuthFormsInner() {
  const { login, user, logout, isAuthenticated } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

     
  // FUNÇÃO: Processar Login
     
  const handleLogin = async (email, password) => {
    console.log('TestAuthForms: Processando login...');
    
    try {
      // 1. Autenticar com authService
      const authResult = await loginUser(email, password);
      
      if (!authResult.success) {
        return authResult;
      }
      
      // 2. Salvar no AuthContext
      const loginResult = await login(authResult.user);
      
      return loginResult;
    } catch (error) {
      console.error('Erro no handleLogin:', error);
      return {
        success: false,
        error: 'Erro ao processar login'
      };
    }
  };

     
  // FUNÇÃO: Processar Registro
     
  const handleRegister = async (formData) => {
    console.log('TestAuthForms: Processando registro...');
    
    try {
      // 1. Registrar com authService
      const authResult = await registerUser(formData);
      
      if (!authResult.success) {
        return authResult;
      }
      
      // 2. Fazer login automático
      const loginResult = await login(authResult.user);
      
      return loginResult;
    } catch (error) {
      console.error('Erro no handleRegister:', error);
      return {
        success: false,
        error: 'Erro ao processar cadastro'
      };
    }
  };

     
  // RENDERIZAR
     
  
  // Se estiver logado, mostrar dashboard simples
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-green-500
      flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400
             to-emerald-500 rounded-full mx-auto mb-4 flex items-center 
             justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
               Login Bem-Sucedido!
            </h1>
            <p className="text-gray-600">
              Você está autenticado
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Nome:</span>
              <span className="font-semibold text-gray-800">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold text-gray-800">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tipo:</span>
              <span className="font-semibold text-gray-800">
                {user.type === 'customer' ? 'Cliente' : 'Funcionário'}
              </span>
            </div>
            {user.phone && (
              <div className="flex justify-between">
                <span className="text-gray-600">Telefone:</span>
                <span className="font-semibold text-gray-800">{user.phone}</span>
              </div>
            )}
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white font-bold py-3 
            rounded-lg hover:bg-red-600 transition-all"
          >
            Fazer Logout
          </button>

          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>Teste bem-sucedido!</strong><br/>
              O login e integração com AuthContext estão funcionando perfeitamente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Se não estiver logado, mostrar formulários
  return (
    <div className="min-h-screen bg-red-600
     flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        {showRegister ? (
          <RegisterForm
            onSubmit={handleRegister}
            onLoginClick={() => setShowRegister(false)}
          />
        ) : (
          <LoginForm
            onSubmit={handleLogin}
            onRegisterClick={() => setShowRegister(true)}
          />
        )}

    
      </div>
    </div>
  );
}

   

export default function TestAuthForms() {
  return (
    <AuthProvider>
      <TestAuthFormsInner />
    </AuthProvider>
  );
}