/**
 * CONVERSATION HELPER
 * Funções auxiliares para gerenciar conversas do usuário
 * Salva conversas no localStorage organizadas por usuário
 */

const STORAGE_KEY = 'fashionstore_conversations';

 
// FUNÇÃO: Buscar todas as conversas do usuário
 
export const getUserConversations = (userId) => {
  try {
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const userConversations = allConversations[userId] || [];
    
    console.log(`Conversas do usuário ${userId}:`, userConversations.length);
    return userConversations;
  } catch (error) {
    console.error('Erro ao buscar conversas:', error);
    return [];
  }
};

 
//  FUNÇÃO: Salvar conversa
 
export const saveConversation = (userId, conversation) => {
  try {
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    
    if (!allConversations[userId]) {
      allConversations[userId] = [];
    }
    
    // Buscar índice da conversa existente
    const existingIndex = allConversations[userId].findIndex(
      conv => conv.id === conversation.id
    );
    
    if (existingIndex >= 0) {
      // Atualizar conversa existente
      allConversations[userId][existingIndex] = conversation;
      console.log('Conversa atualizada:', conversation.id);
    } else {
      // Adicionar nova conversa
      allConversations[userId].push(conversation);
      console.log('Nova conversa salva:', conversation.id);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));
    return true;
  } catch (error) {
    console.error('Erro ao salvar conversa:', error);
    return false;
  }
};

 
// FUNÇÃO: Criar nova conversa
 
export const createConversation = (userId, category = null) => {
  const newConversation = {
    id: `conv_${Date.now()}`,
    userId,
    category,
    status: 'active',
    messages: [
      {
        role: 'assistant',
        content: 'Olá! Bem-vindo à nossa loja! \n\nSou o assistente virtual e estou aqui para ajudá-lo. Como posso te auxiliar hoje?',
        timestamp: new Date().toISOString(),
        sentiment: 'neutral'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  console.log(' Nova conversa criada:', newConversation.id);
  return newConversation;
};

 
// FUNÇÃO: Adicionar mensagem à conversa
 
export const addMessageToConversation = (conversation, message) => {
  const updatedConversation = {
    ...conversation,
    messages: [...conversation.messages, message],
    updatedAt: new Date().toISOString()
  };
  
  console.log(' Mensagem adicionada à conversa:', conversation.id);
  return updatedConversation;
};

 
// FUNÇÃO: Deletar conversa
 
export const deleteConversation = (userId, conversationId) => {
  try {
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    
    if (allConversations[userId]) {
      allConversations[userId] = allConversations[userId].filter(
        conv => conv.id !== conversationId
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));
      console.log(' Conversa deletada:', conversationId);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erro ao deletar conversa:', error);
    return false;
  }
};

 
// FUNÇÃO: Buscar conversa por ID
 
export const getConversationById = (userId, conversationId) => {
  const conversations = getUserConversations(userId);
  return conversations.find(conv => conv.id === conversationId) || null;
};

 
//  FUNÇÃO: Formatar data/hora
 
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Agora';
  if (diffMins < 60) return `${diffMins}m atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays < 7) return `${diffDays}d atrás`;
  
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
};

 
//  FUNÇÃO: Obter última mensagem
 
export const getLastMessage = (conversation) => {
  if (!conversation.messages || conversation.messages.length === 0) {
    return 'Sem mensagens';
  }
  
  const lastMsg = conversation.messages[conversation.messages.length - 1];
  const content = lastMsg.content;
  
  // Truncar se muito longo
  return content.length > 50 ? content.substring(0, 50) + '...' : content;
};

// Exportar tudo
export default {
  getUserConversations,
  saveConversation,
  createConversation,
  addMessageToConversation,
  deleteConversation,
  getConversationById,
  formatTimestamp,
  getLastMessage
};