import React from 'react';
import { Loader2, ShoppingBag } from 'lucide-react';

export default function Loading({ 
  variant = 'spinner', 
  size = 'md',
  message = 'Carregando...',
  color = 'purple'
}) {
  
  // Tamanhos
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  // Cores
  const colors = {
    purple: 'text-purple-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600'
  };

  
  // VARIAÇÃO: SPINNER (Padrão)
  
  if (variant === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <Loader2 className={`${sizes[size]} ${colors[color]} animate-spin`} />
        {message && (
          <p className={`text-sm font-medium ${colors[color]}`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  
  // VARIAÇÃO: DOTS (Três pontos animados)
  
  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex gap-2">
          <div className={`w-3 h-3 bg-${color}-600 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
          <div className={`w-3 h-3 bg-${color}-600 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
          <div className={`w-3 h-3 bg-${color}-600 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
        </div>
        {message && (
          <p className={`text-sm font-medium ${colors[color]}`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  
  // VARIAÇÃO: PULSE (Logo pulsando)
  
  if (variant === 'pulse') {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className={`relative ${sizes[size]}`}>
          <div className={`absolute inset-0 bg-${color}-400 rounded-full animate-ping opacity-25`}></div>
          <div className={`relative bg-gradient-to-br from-${color}-500 to-green-800 rounded-full ${sizes[size]} flex items-center justify-center`}>
            <ShoppingBag className="w-1/2 h-1/2 text-white" />
          </div>
        </div>
        {message && (
          <p className={`text-sm font-medium ${colors[color]}`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  
  // VARIAÇÃO: FULLSCREEN (Tela cheia)
  
  if (variant === 'fullscreen') {
    return (
      <div className={`fixed inset-0 bg-gradient-to-br from-${color}-500 to-green-600 flex items-center justify-center z-50`}>
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-25"></div>
            <div className="relative bg-white rounded-full w-24 h-24 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-black animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Fashion Store</h2>
          {message && (
            <p className="text-white text-lg font-semibold opacity-90">
              {message}
            </p>
          )}
          <div className="flex gap-2 justify-center mt-4">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`${sizes[size]} ${colors[color]} animate-spin`} />
    </div>
  );
}

/**
 * VARIAÇÕES PRÉ-CONFIGURADAS
 * Exports rápidos para uso comum
 */

// Loading pequeno inline
export function LoadingInline({ message = 'Carregando...' }) {
  return <Loading variant="spinner" size="sm" message={message} />;
}

// Loading de página
export function LoadingPage({ message = 'Carregando...' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loading variant="pulse" size="lg" message={message} />
    </div>
  );
}

// Loading fullscreen (para transições)
export function LoadingFullscreen({ message = 'Carregando...' }) {
  return <Loading variant="fullscreen" message={message} />;
}

// Loading de botão
export function LoadingButton() {
  return <Loader2 className="w-5 h-5 animate-spin" />;
}