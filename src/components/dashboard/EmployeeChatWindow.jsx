import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, UserCheck, CheckCircle, X } from 'lucide-react';
import { sendMessageToAI } from '../../services/apiService';
import { analyzeSentiment } from '../../services/sentimentAnalysis';

/**
 * EMPLOYEECHATWINDOW
 * Janela de chat para funcionários com controles de atendimento
 */

export default function EmployeeChatWindow({
  conversation,
  client,
  currentEmployee,
  onUpdateConversation,
  onAssignToMe,
  onCloseAttendance
}) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const messages = conversation?.messages || [];
  const isAssignedToMe = conversation?.assignedTo?.id === currentEmployee?.id;
  const canInteract = isAssignedToMe && conversation?.status !== 'closed';

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

   
  // FUNÇÃO: Enviar mensagem
   
  const handleSendMessage = async () => {
    if (!input.trim() || loading || !canInteract) return;

    const userMessage = {
      role: 'assistant', // Funcionário responde como assistant
      content: input,
      timestamp: new Date().toISOString(),
      sentiment: analyzeSentiment(input),
      sentBy: {
        id: currentEmployee.id,
        name: currentEmployee.name,
        type: 'employee'
      }
    };

    const updatedConversation = {
      ...conversation,
      messages: [...messages, userMessage],
      updatedAt: new Date().toISOString()
    };

    onUpdateConversation(updatedConversation);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

   
  // RENDERIZAR
   

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <Bot className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-semibold">Nenhum atendimento selecionado</p>
          <p className="text-sm mt-2">Selecione um atendimento da fila</p>
        </div>
      </div>
    );
  }

  const isClosed = conversation.status === 'closed';
  const isAssignedToOther = conversation.assignedTo && !isAssignedToMe;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">{client?.name || 'Cliente'}</h3>
              <p className="text-xs opacity-90">
                {conversation.category || 'Categoria não definida'}
              </p>
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            {!conversation.assignedTo && !isClosed && (
              <button
                onClick={onAssignToMe}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                Assumir
              </button>
            )}

            {isAssignedToMe && !isClosed && (
              <button
                onClick={() => {
                  if (confirm('Deseja finalizar este atendimento?')) {
                    onCloseAttendance();
                  }
                }}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Finalizar
              </button>
            )}

            {isClosed && (
              <span className="bg-green-500/20 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Finalizado
              </span>
            )}
          </div>
        </div>

        {/* Status do Atendimento */}
        {isAssignedToOther && (
          <div className="mt-3 bg-yellow-500/20 rounded-lg p-2 text-xs">
             Atendimento assumido por <strong>{conversation.assignedTo.name}</strong>
          </div>
        )}
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => {
          const isEmployee = message.sentBy?.type === 'employee';
          const isClient = message.role === 'user';
          
          return (
            <div
              key={index}
              className={`flex gap-3 ${isClient ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isClient
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-500'
                    : isEmployee
                    ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                }`}
              >
                {isClient ? (
                  <User className="w-4 h-4 text-white" />
                ) : isEmployee ? (
                  <UserCheck className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              <div className={`flex flex-col max-w-[70%] ${isClient ? 'items-end' : ''}`}>
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    isClient
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                      : isEmployee
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-white text-gray-800 shadow-md'
                  }`}
                >
                  {isEmployee && (
                    <p className="text-xs opacity-75 mb-1">
                      {message.sentBy.name.split(' ')[0]}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
                <span className="text-xs text-gray-400 mt-1 px-2">
                  {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
              <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        {!canInteract ? (
          <div className="bg-gray-100 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600">
              {isClosed && ' Atendimento finalizado'}
              {isAssignedToOther && ' Atendimento assumido por outro funcionário'}
              {!conversation.assignedTo && !isClosed && 'Clique em "Assumir" para responder'}
            </p>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua resposta..."
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}