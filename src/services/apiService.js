

const getSystemPrompt = (category) => {
  const basePrompt = `Você é um assistente virtual de uma loja de e-commerce
   de roupas chamada "Fashion Store". 

IMPORTANTE: Você deve ser prestativo, mas também identificar quando o 
cliente precisa de atendimento humano.

Situações que EXIGEM transferência para atendente humano:
- Reclamações graves ou insatisfação evidente
- Problemas com pagamento ou estorno
- Pedidos não recebidos ou com atraso significativo
- Produtos com defeito
- Solicitações de cancelamento ou reembolso
- Qualquer situação que o cliente demonstre frustração

Quando identificar essas situações, informe que você vai transferir para um
 atendente humano e pergunte: "Deseja que eu transfira você para um atendente humano agora?"
`;

  const categoryPrompts = {
    produtos: `Categoria: PRODUTOS E ROUPAS

Você pode ajudar com:
- Informações sobre tamanhos (temos do P ao GG)
- Cores e modelos disponíveis
- Tecidos e materiais
- Sugestões de looks e combinações
- Tabela de medidas
- Disponibilidade em estoque

Exemplos de produtos: Camisetas, Calças, Vestidos, Jaquetas, Acessórios.`,

    pedidos: `Categoria: MEUS PEDIDOS

Você pode ajudar com:
- Status de pedidos
- Código de rastreamento
- Prazo de entrega (padrão: 5-7 dias úteis)
- Consulta de histórico de compras

Para questões sobre atrasos ou problemas na entrega, ofereça
 transferir para atendente.`,

    reclamacoes: `Categoria: RECLAMAÇÕES

ATENÇÃO: Esta é uma categoria sensível. Seja muito empático e
 SEMPRE ofereça transferência para atendente humano.

Demonstre compreensão:
- "Lamento muito pelo inconveniente..."
- "Entendo sua frustração..."
- "Vamos resolver isso juntos..."

Após ouvir o problema, SEMPRE pergunte: "Gostaria que eu
 transferisse você para um atendente humano que poderá resolver isso imediatamente?"`,

    duvidas: `Categoria: DÚVIDAS GERAIS

Você pode ajudar com:
- Política de trocas (30 dias)
- Política de devoluções
- Formas de pagamento (Cartão, Boleto, Pix)
- Frete (Grátis acima de R$ 199)
- Cupons e promoções
- Cadastro e login

Para questões sobre trocas/devoluções de pedidos 
específicos, ofereça transferir para atendente.`
  };

  return basePrompt + (categoryPrompts[category] || '');
};

export const sendMessageToAI = async (messages, category) => {
  try {
    console.log(' Enviando para API...');
    
    const conversationHistory = messages
      .filter(msg => !msg.isTransfer)
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));

    console.log(' Histórico:', conversationHistory);

    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: conversationHistory,
        systemPrompt: getSystemPrompt(category)
      })
    });

    console.log(' Status da resposta:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(' Erro do servidor:', errorText);
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(' Dados recebidos:', data);

    // Verificar se a resposta tem o formato esperado
    if (!data || !data.content || !Array.isArray(data.content)) {
      console.error(' Formato de resposta inválido:', data);
      throw new Error('Formato de resposta inválido da API');
    }

    const assistantMessage = data.content
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('\n');

    if (!assistantMessage) {
      throw new Error('Resposta vazia da API');
    }

    console.log(' Mensagem extraída:', assistantMessage.substring(0, 50) + '...');
    return assistantMessage;

  } catch (error) {
    console.error(' Erro completo:', error);
    
    // Mensagens de erro mais específicas
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Não foi possível conectar ao servidor. Verifique se o servidor está rodando em http://localhost:3001');
    }
    
    throw error;
  }
};