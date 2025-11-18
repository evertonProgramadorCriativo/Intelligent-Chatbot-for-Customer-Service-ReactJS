import React, { useState, useRef, useEffect } from 'react';
import { Loader2, Bot } from 'lucide-react';
import { sendMessageToAI } from './services/apiService';
import { analyzeSentiment, calculateStats } from './services/sentimentAnalysis';

// Components
import Header from './components/Header';
import AnalyticsPanel from './components/AnalyticsPanel';
import CategoryMenu from './components/CategoryMenu';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TestAuthService from './components/TestAuthService';


export default function App() {
  // Estados principais
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Olá! Bem-vindo à nossa loja! \n\nSou o assistente virtual e estou aqui para ajudá-lo. Como posso te auxiliar hoje?',
      timestamp: new Date(),
      sentiment: 'neutral'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [transferRequested, setTransferRequested] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll automático
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Função temporária para testar
  const handleCategorySelect = (category) => {
    console.log(' Categoria selecionada:', category.id);
    setCurrentCategory(category.id);
    setShowMenu(false);
    
    const categoryMessage = {
      role: 'assistant',
      content: `Você selecionou: **${category.title}**\n\n${category.description}\n\nPor favor, descreva sua questão e farei o possível para ajudá-lo!`,
      timestamp: new Date(),
      sentiment: 'neutral'
    };
    
    setMessages(prev => [...prev, categoryMessage]);
  };

  const handleTransferToHuman = () => {
    console.log(' Transferindo para atendimento humano...');
    setTransferRequested(true);
    const transferMessage = {
      role: 'assistant',
      content: ' **Transferindo para atendimento humano...**\n\nUm de nossos atendentes especializados entrará em contato com você em instantes.\n\n**Informações do atendimento:**\n- Categoria: ' + (currentCategory || 'Não especificada') + '\n- Tempo estimado: 2-3 minutos\n- Posição na fila: 1º\n\nPor favor, aguarde um momento.',
      timestamp: new Date(),
      sentiment: 'neutral',
      isTransfer: true
    };
    
    setMessages(prev => [...prev, transferMessage]);
  };

  /**
 * Função para envio de mensagens com análise de sentimento em tempo real
 * - Valida entrada vazia e estado de loading
 * - Analisa sentimento do texto usando analyzeSentiment()
 * - Adiciona mensagem do usuário com metadata completo
 * - Simula resposta do assistente após 1.5s
 * - Atualiza estado de loading durante o processamento
 * 
 * Exemplo de uso:
 * // Console exibe:
 * //  Enviando: "Mensagem do usuário"
 * //  Sentimento detectado: "positive"
 */
const handleSendMessage = async () => {
  if (!input.trim() || loading) return;

  const userMessage = {
    role: 'user',
    content: input,
    timestamp: new Date(),
    sentiment: analyzeSentiment(input)
  };

  setMessages(prev => [...prev, userMessage]);
  const userInput = input;
  setInput('');
  setLoading(true);

  try {
    console.log(' Enviando para API Claude...');
    
    // Chamar API real
    const aiResponse = await sendMessageToAI(
      [...messages, userMessage], 
      currentCategory
    );

    console.log(' Resposta recebida:', aiResponse.substring(0, 50) + '...');

    const assistantMsg = {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
      sentiment: analyzeSentiment(aiResponse)
    };

    setMessages(prev => [...prev, assistantMsg]);
  } catch (error) {
    console.error(' Erro ao enviar mensagem:', error);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'Desculpe, ocorreu um erro. Vou transferir você para um atendente humano.',
      timestamp: new Date(),
      sentiment: 'neutral'
    }]);
    setTimeout(handleTransferToHuman, 1000);
  } finally {
    setLoading(false);
  }
};
  const stats = calculateStats(messages);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200
     via-blue-500 to-blue-200 p-2 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto w-full">

        <TestAuthService />
        <Header 
          showAnalytics={showAnalytics}
          setShowAnalytics={setShowAnalytics}
          transferRequested={transferRequested}
          onTransfer={handleTransferToHuman}
        />

        {showAnalytics && <AnalyticsPanel stats={stats} />}

        <div className="bg-white h-[400px] sm:h-[500px] md:h-[550px] overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
          {showMenu && <CategoryMenu onSelectCategory={handleCategorySelect} />}

          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          
          {loading && (
            <div className="flex gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-500 to-pink-300 flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-3 py-2 sm:px-4 sm:py-3">
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput 
          input={input}
          setInput={setInput}
          onSend={handleSendMessage}
          loading={loading}
          transferRequested={transferRequested}
        />
      </div>
    </div>
  );
}