import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';


export default function NotFound() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [countdown, setCountdown] = useState(10);
  const [autoRedirect, setAutoRedirect] = useState(true);

  // Determinar para onde redirecionar baseado no usuário
  const getRedirectPath = () => {
    if (!isAuthenticated) {
      return '/login';
    }
    
    if (user?.type === 'employee') {
      return '/employee-dashboard';
    }
    
    return '/dashboard';
  };

  const getRedirectLabel = () => {
    if (!isAuthenticated) {
      return 'Login';
    }
    
    if (user?.type === 'employee') {
      return 'Painel de Atendimento';
    }
    
    return 'Meu Dashboard';
  };

  // Countdown automático
  useEffect(() => {
    if (!autoRedirect) return;

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate(getRedirectPath());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRedirect, navigate]);

  // Cancelar auto-redirect
  const cancelAutoRedirect = () => {
    setAutoRedirect(false);
  };

  // Navegação manual
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate(getRedirectPath());
  };

  return (
    <div className="min-h-screen bg-yellow-700 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Ícone de Erro Animado */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-25"></div>
            <div className="relative bg-gradient-to-br from-red-500 to-pink-600 rounded-full w-32 h-32 flex items-center justify-center">
              <AlertCircle className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Código de Erro */}
          <div className="mb-6">
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
              404
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-pink-600 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Mensagem Principal */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Página Não Encontrada
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>

          {/* Countdown */}
          {autoRedirect && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <Search className="w-5 h-5" />
                <p className="text-sm font-semibold">
                  Redirecionando para <span className="text-blue-600">{getRedirectLabel()}</span> em{' '}
                  <span className="text-2xl font-bold text-blue-600">{countdown}</span>s
                </p>
              </div>
              <button
                onClick={cancelAutoRedirect}
                className="mt-3 text-xs text-blue-600 hover:text-blue-700 underline"
              >
                Cancelar redirecionamento
              </button>
            </div>
          )}

          {/* Botões de Navegação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>

            <button
              onClick={handleGoHome}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Ir para {getRedirectLabel()}
            </button>
          </div>

          {/* Sugestões */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Que tal tentar uma destas opções?
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Fazer Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Criar Conta
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate(user?.type === 'employee' ? '/employee-dashboard' : '/dashboard')}
                    className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      navigate('/login');
                    }}
                    className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Fazer Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer com Info Técnica */}
        <div className="mt-6 text-center">
          <p className="text-white text-sm opacity-75">
            Fashion Store © 2024 • Todos os direitos reservados
          </p>
          <p className="text-white text-xs opacity-50 mt-2">
            Erro 404 - Página não encontrada
          </p>
        </div>
      </div>
    </div>
  );
}