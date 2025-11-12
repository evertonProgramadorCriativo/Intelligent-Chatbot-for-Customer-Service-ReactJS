import React from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function ChatInput({ 
  input, 
  setInput, 
  onSend, 
  loading, 
  transferRequested 
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="bg-white rounded-b-2xl shadow-lg p-3 sm:p-4 border-t border-gray-200">
      <div className="flex gap-2 sm:gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={transferRequested ? "Aguardando atendente..." : "Digite sua mensagem..."}
          disabled={loading || transferRequested}
          className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 rounded-xl 
          focus:outline-none focus:ring-2 focus:ring-purple-500
           disabled:opacity-50 text-sm sm:text-base"
        />
        <button
          onClick={onSend}
          disabled={loading || !input.trim() || transferRequested}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white 
          rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50
           disabled:cursor-not-allowed transition-all flex items-center gap-2 
           font-medium shadow-md hover:shadow-lg"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Enviar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}