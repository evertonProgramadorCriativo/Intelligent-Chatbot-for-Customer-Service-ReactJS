import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

/**
 * ========================================
 * TOAST NOTIFICATION SYSTEM
 * ========================================
 * 
 * 📂 Locais:
 * - src/contexts/ToastContext.jsx (este arquivo)
 * - src/components/ToastContainer.jsx (componente visual)
 * 
 * Como usar:
 * 
 * 1. Envolver App com ToastProvider
 * 2. Usar hook useToast() em qualquer componente
 * 
 * Exemplo:
 * ```jsx
 * const { showToast } = useToast();
 * 
 * showToast('Sucesso!', 'success');
 * showToast('Erro ao salvar', 'error');
 * showToast('Atenção!', 'warning');
 * showToast('Informação', 'info');
 * ```
 */

// ==========================================
// CONTEXT
// ==========================================

const ToastContext = createContext();

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider');
  }
  return context;
}

// ==========================================
// PROVIDER
// ==========================================

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Adicionar toast
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    
    const newToast = {
      id,
      message,
      type,
      duration
    };

    setToasts(prev => [...prev, newToast]);

    // Remover automaticamente após duração
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  // Remover toast
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Limpar todos
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Funções de atalho
  const success = useCallback((message, duration) => {
    return showToast(message, 'success', duration);
  }, [showToast]);

  const error = useCallback((message, duration) => {
    return showToast(message, 'error', duration);
  }, [showToast]);

  const warning = useCallback((message, duration) => {
    return showToast(message, 'warning', duration);
  }, [showToast]);

  const info = useCallback((message, duration) => {
    return showToast(message, 'info', duration);
  }, [showToast]);

  const value = {
    toasts,
    showToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

// ==========================================
// TOAST CONTAINER COMPONENT
// ==========================================

function ToastContainer({ toasts, onRemove }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm">
      {toasts.map(toast => (
        <Toast 
          key={toast.id} 
          toast={toast} 
          onRemove={() => onRemove(toast.id)} 
        />
      ))}
    </div>
  );
}

// ==========================================
// INDIVIDUAL TOAST COMPONENT
// ==========================================

function Toast({ toast, onRemove }) {
  const { message, type } = toast;

  // Configurações por tipo
  const configs = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-500',
      textColor: 'text-white',
      borderColor: 'border-green-600'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-500',
      textColor: 'text-white',
      borderColor: 'border-red-600'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-500',
      textColor: 'text-white',
      borderColor: 'border-yellow-600'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  };

  const config = configs[type] || configs.info;
  const Icon = config.icon;

  return (
    <div 
      className={`${config.bgColor} ${config.textColor} rounded-lg shadow-lg border-l-4 ${config.borderColor} p-4 flex items-start gap-3 min-w-[300px] animate-slide-in`}
      style={{
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      {/* Ícone */}
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />

      {/* Mensagem */}
      <p className="flex-1 text-sm font-medium">
        {message}
      </p>

      {/* Botão Fechar */}
      <button
        onClick={onRemove}
        className="flex-shrink-0 hover:opacity-75 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ==========================================
// CSS ANIMATIONS (adicionar ao index.css)
// ==========================================

/**
 * Adicione ao seu src/index.css:
 * 
 * @keyframes slideIn {
 *   from {
 *     transform: translateX(100%);
 *     opacity: 0;
 *   }
 *   to {
 *     transform: translateX(0);
 *     opacity: 1;
 *   }
 * }
 * 
 * .animate-slide-in {
 *   animation: slideIn 0.3s ease-out;
 * }
 */

// ==========================================
// EXEMPLO DE USO
// ==========================================

/**
 * 1. No App.jsx, envolva com ToastProvider:
 * 
 * ```jsx
 * import { ToastProvider } from './contexts/ToastContext';
 * 
 * function App() {
 *   return (
 *     <ToastProvider>
 *       <BrowserRouter>
 *         <AuthProvider>
 *           <Routes>
 *             ...
 *           </Routes>
 *         </AuthProvider>
 *       </BrowserRouter>
 *     </ToastProvider>
 *   );
 * }
 * ```
 * 
 * 2. Em qualquer componente:
 * 
 * ```jsx
 * import { useToast } from '../contexts/ToastContext';
 * 
 * function MeuComponente() {
 *   const { success, error, warning, info } = useToast();
 * 
 *   const handleSave = async () => {
 *     try {
 *       await saveData();
 *       success('Dados salvos com sucesso!');
 *     } catch (err) {
 *       error('Erro ao salvar dados');
 *     }
 *   };
 * 
 *   return <button onClick={handleSave}>Salvar</button>;
 * }
 * ```
 */

export default ToastProvider;