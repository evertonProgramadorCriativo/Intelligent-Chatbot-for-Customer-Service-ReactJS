import ChatMessage from './components/ChatMessage';

function App() {
  // Mensagens de teste
  const testMessages = [
    {
      role: 'assistant',
      content: 'Olá! Bem-vindo à Fashion Store! Como posso ajudá-lo?',
      timestamp: new Date(),
      isTransfer: false
    },
    {
      role: 'user',
      content: 'Olá! Gostaria de saber sobre os tamanhos disponíveis.',
      timestamp: new Date(),
      isTransfer: false
    },
    {
      role: 'assistant',
      content: 'Claro! Temos tamanhos de P a GG disponíveis. Qual peça você está procurando?',
      timestamp: new Date(),
      isTransfer: false
    },
    {
      role: 'assistant',
      content: 'Transferindo para atendimento humano...\n\nUm de nossos atendentes entrará em contato em breve.',
      timestamp: new Date(),
      isTransfer: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
           Teste - ChatMessage Component
        </h1>
        
        <div className="space-y-4">
          {testMessages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2"> Teste Passou se:</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>- Mensagens do assistente à esquerda (roxo/rosa)</li>
            <li>- Mensagens do usuário à direita (azul)</li>
            <li>- Mensagem de transferência em verde</li>
            <li>- Ícones diferentes (Bot, User, Headphones)</li>
            <li>- Horários exibidos abaixo de cada mensagem</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;