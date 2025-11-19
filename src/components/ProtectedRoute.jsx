import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * PROTECTEDROUTE
 * Componente que protege rotas que precisam de autenticação
 * 
 * Props:
 * - children: componente a ser renderizado
 * - requiredType: tipo de usuário necessário ('customer' ou 'employee')
 * 
 * Comportamento:
 * - Se loading: mostra tela de loading
 * - Se não autenticado: redireciona para /login
 * - Se autenticado mas tipo errado: redireciona para rota correta
 * - Se tudo OK: renderiza o children
 */

export default function ProtectedRoute({ children, requiredType = null }) {
  const { user, loading, isAuthenticated } = useAuth();

  console.log('ProtectedRoute: Verificando acesso...', {
    isAuthenticated,
    loading,
    userType: user?.type,
    requiredType
  });

   
  //  LOADING: Mostra tela de carregamento
   
  if (loading) {
    console.log('ProtectedRoute: Carregando...');
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-semibold">
            Verificando autenticação...
          </p>
        </div>
      </div>
    );
  }

   
  // NÃO AUTENTICADO: Redireciona para login
   
  if (!isAuthenticated) {
    console.log('ProtectedRoute: Não autenticado, redirecionando para /login');
    return <Navigate to="/login" replace />;
  }

   
  // TIPO ERRADO: Redireciona para rota correta
   
  if (requiredType && user.type !== requiredType) {
    console.log('ProtectedRoute: Tipo de usuário incorreto');
    
    // Se é cliente tentando acessar área de funcionário
    if (user.type === 'customer') {
      console.log('Redirecionando cliente para /dashboard');
      return <Navigate to="/dashboard" replace />;
    }
    
    // Se é funcionário tentando acessar área de cliente
    if (user.type === 'employee') {
      console.log(' Redirecionando funcionário para /employee-dashboard');
      return <Navigate to="/employee-dashboard" replace />;
    }
  }

   
  // TUDO OK: Renderiza o componente
   
  console.log(' ProtectedRoute: Acesso autorizado');
  return children;
}