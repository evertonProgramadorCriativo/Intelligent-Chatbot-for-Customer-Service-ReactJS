import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * PUBLICROUTE
 * Componente para rotas públicas (login, register)
 * Se usuário já está logado, redireciona para dashboard
 * 
 * Props:
 * - children: componente a ser renderizado
 * 
 * Comportamento:
 * - Se loading: mostra tela de loading
 * - Se autenticado: redireciona para dashboard
 * - Se não autenticado: renderiza o children
 */

export default function PublicRoute({ children }) {
  const { user, loading, isAuthenticated } = useAuth();

  console.log('PublicRoute: Verificando acesso...', {
    isAuthenticated,
    loading,
    userType: user?.type
  });

  
  //  LOADING: Mostra tela de carregamento
  
  if (loading) {
    console.log('PublicRoute: Carregando...');
    return (
      <div className="min-h-screen bg-blue-400 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-semibold">
            Carregando...
          </p>
        </div>
      </div>
    );
  }

  
  //  JÁ AUTENTICADO: Redireciona para dashboard
  
  if (isAuthenticated) {
    console.log('PublicRoute: Usuário já autenticado, redirecionando...');
    
    // Redirecionar baseado no tipo de usuário
    const redirectTo = user.type === 'employee' 
      ? '/employee-dashboard' 
      : '/dashboard';
    
    console.log('Redirecionando para:', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  
  // NÃO AUTENTICADO: Renderiza o componente
  
  console.log('PublicRoute: Acesso autorizado');
  return children;
}