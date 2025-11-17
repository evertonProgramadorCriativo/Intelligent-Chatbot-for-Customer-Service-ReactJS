import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveUser, getUser, removeUser, isAuthenticated } from '../services/storageService';

/*
 * Gerencia o estado de autenticação em toda a aplicação
 * Usa React Context API para compartilhar dados entre componentes
 */

  
// CRIAR O CONTEXT
  
const AuthContext = createContext({});

  
// HOOK PERSONALIZADO para usar o contexto
  
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  
  return context;
};

  
// PROVIDER - Componente que envolve a aplicação
  
export const AuthProvider = ({ children }) => {
  // Estados
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  // EFEITO: Carregar usuário ao iniciar
  
  useEffect(() => {
    console.log('AuthContext: Verificando autenticação...');
    
    try {
      const savedUser = getUser();
      
      if (savedUser) {
        setUser(savedUser);
        console.log('AuthContext: Usuário carregado', savedUser);
      } else {
        console.log('AuthContext: Nenhum usuário logado');
      }
    } catch (error) {
      console.error(' AuthContext: Erro ao carregar usuário', error);
    } finally {
      setLoading(false);
      console.log('AuthContext: Verificação concluída');
    }
  }, []);

  
  //  FUNÇÃO: Login
  
  const login = async (userData) => {
    try {
      console.log('AuthContext: Fazendo login...', userData);
      
      // Simular delay de API (remover depois)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Salvar no localStorage
      const success = saveUser(userData);
      
      if (success) {
        setUser(userData);
        console.log('AuthContext: Login realizado com sucesso!');
        return { success: true };
      } else {
        throw new Error('Erro ao salvar usuário');
      }
      
    } catch (error) {
      console.error('AuthContext: Erro no login', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  };

  
  // FUNÇÃO: Logout
  
  const logout = () => {
    try {
      console.log(' AuthContext: Fazendo logout...');
      
      removeUser();
      setUser(null);
      
      console.log(' AuthContext: Logout realizado com sucesso!');
      return { success: true };
      
    } catch (error) {
      console.error(' AuthContext: Erro no logout', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  };

  
  //  FUNÇÃO: Atualizar dados do usuário
  
  const updateUser = (newData) => {
    try {
      console.log(' AuthContext: Atualizando usuário...', newData);
      
      const updatedUser = { ...user, ...newData };
      
      saveUser(updatedUser);
      setUser(updatedUser);
      
      console.log(' AuthContext: Usuário atualizado com sucesso!');
      return { success: true };
      
    } catch (error) {
      console.error('AuthContext: Erro ao atualizar usuário', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  };

  
  //  VALORES QUE SERÃO COMPARTILHADOS
  
  const value = {
    // Estados
    user,              // Dados do usuário logado (ou null)
    loading,           // Se está carregando
    isAuthenticated: !!user,  // Boolean: está logado?
    
    // Funções
    login,             // Fazer login
    logout,            // Fazer logout
    updateUser,        // Atualizar dados do usuário
  };

  
  //  LOGS DE DEBUG
  
  useEffect(() => {
    console.log(' AuthContext STATE:', {
      user: user?.name || 'Nenhum',
      isAuthenticated: !!user,
      loading
    });
  }, [user, loading]);

  
  //  RENDERIZAR
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

  
//   EXPORT PADRÃO
  
export default AuthContext;