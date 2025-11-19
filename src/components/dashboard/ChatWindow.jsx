import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, Headphones } from 'lucide-react';
import { sendMessageToAI } from '../../services/apiService';
import { analyzeSentiment } from '../../services/sentimentAnalysis';
import CategoryMenu from '../CategoryMenu';

/**
 * CHATWINDOW
 * Componente de chat integrado ao dashboard
 * 
 * Props:
 * - conversation: objeto da conversa atual
 * - onUpdateConversation: função para atualizar conversa
 */

export default function ChatWindow({ conversation, onUpdateConversation }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(!conversation?.category);
  const [currentCategory, setCurrentCategory] = useState(conversation?.category);
  const messagesEndRef = useRef(null);

  const messages = conversation?.messages || [];

  // Scroll automático
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

    
  // FUNÇÃO: Selecionar categoria
    
  const handleCategorySelect = (category) => {
    console.log('Categoria selecionada:', category.id);
    setCurrentCategory(category.id);
    setShowMenu(false);
    
    const categoryMessage = {
      role: 'assistant',
      content: `Você selecionou: **${category.title}**\n\n${category.description}\n\nPor favor, descreva sua questão e farei o possível para ajudá-lo!`,
      timestamp: new Date().toISOString(),
      sentiment: 'neutral'
    };
    
    const updatedConversation = {
      ...conversation,
      category: category.id,
      messages: [...messages, categoryMessage],
      updatedAt: new Date().toISOString()
    };
    
    onUpdateConversation(updatedConversation);
  };

    
  // FUNÇÃO: Enviar mensagem
    
  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
      sentiment: analyzeSentiment(input)
    };

    // Adicionar mensagem do usuário
    const conversationWithUserMsg = {
      ...conversation,
      messages: [...messages, userMessage],
      updatedAt: new Date().toISOString()
    };
    onUpdateConversation(conversationWithUserMsg);

    setInput('');
    setLoading(true);

    try {
      console.log('Enviando para API...');
      
      const aiResponse = await sendMessageToAI(
        [...messages, userMessage], 
        currentCategory
      );

      console.log('Resposta recebida');

      const assistantMsg = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
        sentiment: analyzeSentiment(aiResponse)
      };

      const finalConversation = {
        ...conversationWithUserMsg,
        messages: [...conversationWithUserMsg.messages, assistantMsg],
        updatedAt: new Date().toISOString()
      };

      onUpdateConversation(finalConversation);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      const errorMsg = {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro. Por favor, tente novamente.',
        timestamp: new Date().toISOString(),
        sentiment: 'neutral'
      };

      const errorConversation = {
        ...conversationWithUserMsg,
        messages: [...conversationWithUserMsg.messages, errorMsg],
        updatedAt: new Date().toISOString()
      };

      onUpdateConversation(errorConversation);
    } finally {
      setLoading(false);
    }
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
          <p className="text-lg font-semibold">Nenhuma conversa selecionada</p>
          <p className="text-sm mt-2">Selecione uma conversa ou crie uma nova</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-blue-700 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">Assistente Virtual</h3>
            <p className="text-xs opacity-90">
              {currentCategory || 'Selecione uma categoria'}
            </p>
          </div>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {/* Menu de Categorias */}
        {showMenu && <CategoryMenu onSelectCategory={handleCategorySelect} />}

        {/* Mensagens */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-500'
                  : message.isTransfer
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                  : 'bg-gradient-to-br from-yellow-500 to-yellow-600'
              }`}
            >
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : message.isTransfer ? (
                <Headphones className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>

            <div className={`flex flex-col max-w-[70%] ${message.role === 'user' ? 'items-end' : ''}`}>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'bg-white text-gray-800 shadow-md'
                }`}
              >
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
        ))}

        {/* Loading */}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full  bg-gray-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
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
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={loading}
            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800 disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-blue-700 text-white rounded-xl hover:from-yellow-600 hover:to-yellow-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}