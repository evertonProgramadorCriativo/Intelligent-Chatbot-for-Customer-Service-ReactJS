import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

//  COLOQUE SUA API KEY DO GROQ AQUI const GROQ_API_KEY = 'SUA_API_KEY_AQUI';
// Pegue em: https://console.groq.com/keys

const GROQ_API_KEY = process.env.GROQ_API_KEY;
// Verificar se a API key foi configurada
if (!GROQ_API_KEY || GROQ_API_KEY === 'SUA_API_KEY_AQUI') {
  console.error(' ERRO: Configure sua API Key do Groq!');
  console.error(' Pegue sua chave em: https://console.groq.com/keys');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor do chatbot rodando!',
    api: 'Groq',
    model: 'llama-3.3-70b-versatile',
    features: ' Super rápido e gratuito!',
    timestamp: new Date().toISOString()
  });
});

// Rota principal do chat
app.post('/api/chat', async (req, res) => {
  try {
    console.log('\n ---+- NOVA REQUISIÇÃO ---+-');
    console.log(' Requisição recebida');
    
    const { messages, systemPrompt } = req.body;

    // Validações
    if (!messages || !Array.isArray(messages)) {
      console.error(' Erro: messages não é um array');
      return res.status(400).json({ 
        error: 'Formato inválido: messages deve ser um array' 
      });
    }

    if (!systemPrompt) {
      console.error(' Erro: systemPrompt não fornecido');
      return res.status(400).json({ 
        error: 'systemPrompt é obrigatório' 
      });
    }

    console.log(' Validações OK');
    console.log(' Mensagens recebidas:', messages.length);
    console.log(' System Prompt (primeiros 100 chars):', systemPrompt.substring(0, 100) + '...');
    
    // Preparar mensagens para Groq
    console.log(' Preparando mensagens para Groq...');
    
    // Adicionar system prompt como primeira mensagem
    const groqMessages = [
      {
        role: 'system',
        content: systemPrompt
      },
      ...messages.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))
    ];

    console.log(' Chamando API do Groq (super rápida)...');
    
    // Chamar a API do Groq
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", 
        messages: groqMessages,
        max_tokens: 1000,
        temperature: 0.7,
      })
    });

    console.log(' Status da resposta:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(' Erro da API:', errorText);
      
      if (response.status === 401) {
        return res.status(401).json({ 
          error: 'API Key inválida',
          details: 'Verifique sua chave em https://console.groq.com/keys'
        });
      }
      
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(' Resposta recebida da API Groq');
    
    // Extrair o texto da resposta
    const text = data.choices[0].message.content;
    
    console.log(' Texto extraído:', text.substring(0, 100) + '...');
    console.log(' Tamanho da resposta:', text.length, 'caracteres');
    console.log(' Tokens usados:', data.usage?.total_tokens || 'N/A');

    // Retornar no formato esperado pelo frontend
    const responseData = { 
      content: [{ 
        type: 'text', 
        text: text 
      }] 
    };
    
    console.log(' Enviando resposta para frontend');
    console.log(' ---+- REQUISIÇÃO CONCLUÍDA ---+-\n');
    
    res.json(responseData);

  } catch (error) {
    console.error('\n ---+- ERRO NA REQUISIÇÃO ---+-');
    console.error(' Tipo do erro:', error.constructor.name);
    console.error(' Mensagem:', error.message);
    console.error(' Stack:', error.stack);
    console.error(' ---+- FIM DO ERRO ---+-\n');
    
    // Tratamento de erros específicos
    if (error.message && error.message.includes('401')) {
      return res.status(401).json({ 
        error: 'API Key inválida',
        details: 'Verifique sua chave do Groq em https://console.groq.com/keys'
      });
    }
    
    if (error.message && error.message.includes('429')) {
      return res.status(429).json({ 
        error: 'Limite de requisições excedido',
        details: 'Aguarde um momento e tente novamente'
      });
    }

    if (error.message && error.message.includes('Failed to fetch')) {
      return res.status(503).json({ 
        error: 'Erro de conexão',
        details: 'Não foi possível conectar à API do Groq'
      });
    }

    res.status(500).json({ 
      error: 'Erro ao processar requisição',
      details: error.message,
      type: error.constructor.name
    });
  }
});

// Middleware para erros não capturados
app.use((err, req, res, next) => {
  console.error(' Erro não capturado:', err);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    details: err.message 
  });
});

// Iniciar servidor
app.listen(PORT, () => {

  console.log(' Servidor iniciado com sucesso!');
  console.log(' URL: http://localhost:' + PORT);
  console.log(' API: Groq (Super Rápida!)');
  console.log(' Modelo: Llama 3.3 70B Versatile');
  
  console.log(' Velocidade: ~300 tokens/seg');
  console.log(' API Key: ' + GROQ_API_KEY.substring(0, 10) + '...' + GROQ_API_KEY.substring(GROQ_API_KEY.length - 4));
  console.log(' Horário:', new Date().toLocaleString('pt-BR'));



});