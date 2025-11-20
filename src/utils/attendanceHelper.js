/**
 * ATTENDANCE HELPER
 * Funções para gerenciar sistema de atendimentos
 * Funcionários podem ver e assumir conversas de clientes
 */

const STORAGE_KEY = 'fashionstore_conversations';

  
//  FUNÇÃO: Buscar TODAS as conversas (todos os usuários)
  
export const getAllConversations = () => {
  try {
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    
    // Transformar objeto em array com informações do usuário
    const conversationsArray = [];
    
    Object.keys(allConversations).forEach(userId => {
      allConversations[userId].forEach(conversation => {
        conversationsArray.push({
          ...conversation,
          userId // Adicionar userId para identificar o cliente
        });
      });
    });
    
    console.log('Total de conversas de todos os clientes:', conversationsArray.length);
    return conversationsArray;
  } catch (error) {
    console.error('Erro ao buscar conversas:', error);
    return [];
  }
};

  
// FUNÇÃO: Buscar informações do cliente
  
export const getClientInfo = (userId) => {
  try {
    const usersKey = 'fashionstore_db_users';
    const users = JSON.parse(localStorage.getItem(usersKey) || '[]');
    
    const client = users.find(user => user.id === userId);
    
    if (client) {
      console.log('Cliente encontrado:', client.name);
      return client;
    }
    
    console.log('Cliente não encontrado:', userId);
    return null;
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return null;
  }
};

  
// FUNÇÃO: Assumir atendimento
  
export const assignAttendance = (conversation, employeeId, employeeName) => {
  try {
    const updatedConversation = {
      ...conversation,
      assignedTo: {
        id: employeeId,
        name: employeeName,
        assignedAt: new Date().toISOString()
      },
      status: 'in_progress'
    };
    
    // Salvar no localStorage
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const userId = conversation.userId;
    
    if (allConversations[userId]) {
      const index = allConversations[userId].findIndex(c => c.id === conversation.id);
      if (index >= 0) {
        allConversations[userId][index] = updatedConversation;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));
        console.log('Atendimento assumido:', conversation.id);
        return updatedConversation;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao assumir atendimento:', error);
    return null;
  }
};

  
// FUNÇÃO: Finalizar atendimento
  
export const closeAttendance = (conversation, employeeId) => {
  try {
    const updatedConversation = {
      ...conversation,
      status: 'closed',
      closedAt: new Date().toISOString(),
      closedBy: employeeId
    };
    
    // Salvar no localStorage
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const userId = conversation.userId;
    
    if (allConversations[userId]) {
      const index = allConversations[userId].findIndex(c => c.id === conversation.id);
      if (index >= 0) {
        allConversations[userId][index] = updatedConversation;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));
        console.log('Atendimento finalizado:', conversation.id);
        return updatedConversation;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao finalizar atendimento:', error);
    return null;
  }
};

  
// FUNÇÃO: Transferir atendimento
  
export const transferAttendance = (conversation, newEmployeeId, newEmployeeName) => {
  try {
    const updatedConversation = {
      ...conversation,
      assignedTo: {
        id: newEmployeeId,
        name: newEmployeeName,
        assignedAt: new Date().toISOString()
      },
      transferHistory: [
        ...(conversation.transferHistory || []),
        {
          from: conversation.assignedTo,
          to: { id: newEmployeeId, name: newEmployeeName },
          at: new Date().toISOString()
        }
      ]
    };
    
    // Salvar no localStorage
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const userId = conversation.userId;
    
    if (allConversations[userId]) {
      const index = allConversations[userId].findIndex(c => c.id === conversation.id);
      if (index >= 0) {
        allConversations[userId][index] = updatedConversation;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));
        console.log('Atendimento transferido:', conversation.id);
        return updatedConversation;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao transferir atendimento:', error);
    return null;
  }
};

  
//  FUNÇÃO: Atualizar conversa (funcionário)
  
export const updateConversationAsEmployee = (conversation) => {
  try {
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const userId = conversation.userId;
    
    if (!allConversations[userId]) {
      console.error('Usuário não encontrado:', userId);
      return false;
    }
    
    const index = allConversations[userId].findIndex(c => c.id === conversation.id);
    
    if (index >= 0) {
      allConversations[userId][index] = {
        ...conversation,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));
      console.log('Conversa atualizada (funcionário):', conversation.id);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erro ao atualizar conversa:', error);
    return false;
  }
};

  
// FUNÇÃO: Filtrar conversas por status
  
export const filterConversationsByStatus = (conversations, status) => {
  if (!status || status === 'all') return conversations;
  
  return conversations.filter(conv => {
    switch (status) {
      case 'pending':
        return !conv.assignedTo && conv.status !== 'closed';
      case 'assigned':
        return conv.assignedTo && conv.status !== 'closed';
      case 'closed':
        return conv.status === 'closed';
      default:
        return true;
    }
  });
};

  
// FUNÇÃO: Buscar conversas por funcionário
  
export const getConversationsByEmployee = (employeeId) => {
  const allConversations = getAllConversations();
  return allConversations.filter(conv => 
    conv.assignedTo?.id === employeeId && conv.status !== 'closed'
  );
};

  
// FUNÇÃO: Estatísticas de atendimento
  
export const getAttendanceStats = (employeeId = null) => {
  const allConversations = getAllConversations();
  
  const stats = {
    total: allConversations.length,
    pending: 0,
    inProgress: 0,
    closed: 0,
    myAttendances: 0
  };
  
  allConversations.forEach(conv => {
    if (!conv.assignedTo && conv.status !== 'closed') {
      stats.pending++;
    } else if (conv.assignedTo && conv.status !== 'closed') {
      stats.inProgress++;
    } else if (conv.status === 'closed') {
      stats.closed++;
    }
    
    if (employeeId && conv.assignedTo?.id === employeeId) {
      stats.myAttendances++;
    }
  });
  
  return stats;
};

// Exportar tudo
export default {
  getAllConversations,
  getClientInfo,
  assignAttendance,
  closeAttendance,
  transferAttendance,
  updateConversationAsEmployee,
  filterConversationsByStatus,
  getConversationsByEmployee,
  getAttendanceStats
};