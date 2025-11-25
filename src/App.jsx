import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Páginas principais
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

// Página 404
import NotFound from './pages/NotFound';

/**
 * Sistema completo de roteamento com:
 * - Rotas públicas (Login, Register)
 * - Rotas protegidas (Dashboards)
 * - Proteção por tipo de usuário
 * - Página 404
 * - Redirecionamentos inteligentes
 */

export default function App() {
  console.log('App: Inicializando aplicação...');

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ROTA RAIZ: Redireciona para Login */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* ROTAS PÚBLICAS
              Acessíveis apenas quando NÃO logado
                 */}

          {/* Login */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Registro */}
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/*   
              ROTAS PROTEGIDAS - CLIENTE
              Acessíveis apenas para usuários tipo 'customer'
                 */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredType="customer">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/*   
              ROTAS PROTEGIDAS - FUNCIONÁRIO
              Acessíveis apenas para usuários tipo 'employee'
                 */}

          <Route
            path="/employee-dashboard"
            element={
              <ProtectedRoute requiredType="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          {/*   
              PÁGINA 404 - NÃO ENCONTRADA
              Captura todas as rotas não definidas
                 */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}