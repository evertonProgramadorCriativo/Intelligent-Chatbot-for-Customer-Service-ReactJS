import React, { useState } from 'react';
import { MessageSquare, Clock, User, Filter, CheckCircle, AlertCircle, UserCheck } from 'lucide-react';
import { formatTimestamp, getLastMessage } from '../../utils/conversationHelper';

/**
 * EMPLOYEECONVERSATIONLIST
 * Lista de atendimentos para funcionários
 */

export default function EmployeeConversationList({
  conversations = [],
  activeConversationId,
  onSelectConversation,
  currentEmployeeId,
  clientsInfo = {}
}) {
  const [filter, setFilter] = useState('all'); // all, pending, assigned, closed

  // Filtrar conversas
  const filteredConversations = conversations.filter(conv => {
    switch (filter) {
      case 'pending':
        return !conv.assignedTo && conv.status !== 'closed';
      case 'assigned':
        return conv.assignedTo && conv.status !== 'closed';
      case 'my':
        return conv.assignedTo?.id === currentEmployeeId && conv.status !== 'closed';
      case 'closed':
        return conv.status === 'closed';
      default:
        return true;
    }
  });

  // Contar por status
  const counts = {
    all: conversations.length,
    pending: conversations.filter(c => !c.assignedTo && c.status !== 'closed').length,
    assigned: conversations.filter(c => c.assignedTo && c.status !== 'closed').length,
    my: conversations.filter(c => c.assignedTo?.id === currentEmployeeId && c.status !== 'closed').length,
    closed: conversations.filter(c => c.status === 'closed').length
  };

  // Função para obter status visual
  const getStatusBadge = (conversation) => {
    if (conversation.status === 'closed') {
      return (
        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <CheckCircle className="w-3 h-3" />
          Finalizado
        </span>
      );
    }
    
    if (conversation.assignedTo) {
      const isMe = conversation.assignedTo.id === currentEmployeeId;
      return (
        <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
          isMe 
            ? 'text-blue-600 bg-blue-50' 
            : 'text-purple-600 bg-purple-50'
        }`}>
          <UserCheck className="w-3 h-3" />
          {isMe ? 'Você' : conversation.assignedTo.name.split(' ')[0]}
        </span>
      );
    }
    
    return (
      <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
        <AlertCircle className="w-3 h-3" />
        Pendente
      </span>
    );
  };

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Fila de Atendimentos</h2>
        
        {/* Filtros */}
        <div className="flex items-center gap-2 text-xs overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              filter === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todos ({counts.all})
          </button>
          
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              filter === 'pending'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Pendentes ({counts.pending})
          </button>
          
          <button
            onClick={() => setFilter('my')}
            className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              filter === 'my'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Meus ({counts.my})
          </button>
          
          <button
            onClick={() => setFilter('closed')}
            className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              filter === 'closed'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Finalizados ({counts.closed})
          </button>
        </div>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Filter className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm font-medium">Nenhum atendimento</p>
            <p className="text-xs mt-1">
              {filter === 'pending' && 'Não há atendimentos pendentes'}
              {filter === 'my' && 'Você não tem atendimentos ativos'}
              {filter === 'closed' && 'Nenhum atendimento finalizado'}
              {filter === 'all' && 'Nenhum atendimento no sistema'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredConversations.map((conversation) => {
              const client = clientsInfo[conversation.userId];
              
              return (
                <div
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation)}
                  className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                    activeConversationId === conversation.id
                      ? 'bg-purple-50 border-l-4 border-purple-500'
                      : 'border-l-4 border-transparent'
                  }`}
                >
                  {/* Cliente */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {client?.name?.charAt(0).toUpperCase() || 'C'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {client?.name || 'Cliente Desconhecido'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {client?.email || 'Email não disponível'}
                      </p>
                    </div>
                  </div>

                  {/* Status e Categoria */}
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(conversation)}
                    {conversation.category && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {conversation.category}
                      </span>
                    )}
                  </div>

                  {/* Última mensagem */}
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {getLastMessage(conversation)}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(conversation.updatedAt)}
                    </div>
                    <span>
                      {conversation.messages?.length || 0} msg
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer com estatísticas */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <div className="text-orange-600 font-bold">{counts.pending}</div>
            <div className="text-gray-600">Pendentes</div>
          </div>
          <div>
            <div className="text-blue-600 font-bold">{counts.my}</div>
            <div className="text-gray-600">Meus</div>
          </div>
          <div>
            <div className="text-green-600 font-bold">{counts.closed}</div>
            <div className="text-gray-600">Finalizados</div>
          </div>
        </div>
      </div>
    </div>
  );
}