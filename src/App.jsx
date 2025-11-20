import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Páginas
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import TestAttendanceHelper from './components/tests/TestAttendanceHelper';
import TestEmployeeFlow from './components/tests/TestEmployeeFlow';




/**
 * APP COM REACT ROUTER
 * Estrutura de rotas da aplicação
 */

export default function App() {
  console.log(' App: Inicializando com React Router...');

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/*Adicione na área de rotas:*/}
        <Route path="/test-flow" element={<TestEmployeeFlow />} />
          
          {/* ROTA DE TESTE: Helper para testes de presença */}
          <Route path="/test-attendance" element={<TestAttendanceHelper />} />

          {/* ROTA RAIZ: Redireciona para login */}
           
          <Route 
            path="/" 
            element={<Navigate to="/login" replace />} 
          />

           
          {/* ROTAS PÚBLICAS (Login e Registro) */}
           
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

           
          {/* ROTA PROTEGIDA: Dashboard do Cliente */}
           
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredType="customer">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

           
          {/* ROTA PROTEGIDA: Dashboard do Funcionário */}
           
          <Route
            path="/employee-dashboard"
            element={
              <ProtectedRoute requiredType="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

           
          {/* ROTA 404: Página não encontrada */}
           
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center p-6">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
                  <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Página não encontrada
                  </h2>
                  <p className="text-gray-600 mb-6">
                    A página que você está procurando não existe.
                  </p>
                  <a
                    href="/login"
                    className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    Voltar para Login
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}