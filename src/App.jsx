import { useState } from 'react';
import ChatInput from './components/ChatInput';

function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    console.log(' Mensagem enviada:', input);
    setMessages([...messages, { text: input, time: new Date().toLocaleTimeString() }]);
    setInput('');
    
    // Simular loading
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-t-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
             Teste - ChatInput Component
          </h1>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4 min-h-[200px]">
            <h3 className="font-semibold mb-2">Mensagens Enviadas:</h3>
            {messages.length === 0 ? (
              <p className="text-gray-400 text-sm">Nenhuma mensagem ainda...</p>
            ) : (
              <ul className="space-y-2">
                {messages.map((msg, i) => (
                  <li key={i} className="text-sm bg-white p-2 rounded">
                    <span className="font-medium">{msg.time}</span>: {msg.text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          
        </div>

        <ChatInput 
          input={input}
          setInput={setInput}
          onSend={handleSend}
          loading={loading}
          transferRequested={false}
        />
      </div>
    </div>
  );
}

export default App;