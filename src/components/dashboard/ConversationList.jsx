import React from 'react';
import { MessageSquare, Plus, Trash2, Clock } from 'lucide-react';
import { formatTimestamp, getLastMessage } from '../../utils/conversationHelper';

/**
 * CONVERSATIONLIST
 * Sidebar com lista de conversas do usuário
 * 
 * Props:
 * - conversations: array de conversas
 * - activeConversationId: ID da conversa ativa
 * - onSelectConversation: função chamada ao selecionar conversa
 * - onNewConversation: função chamada ao criar nova conversa
 * - onDeleteConversation: função chamada ao deletar conversa
 */

export default function ConversationList({
  conversations = [],
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation
}) {
  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onNewConversation}
          className="w-full bg-gray-300  text-white font-semibold 
          py-3 rounded-lg hover:from-gray-600  transition-all 
          shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nova Conversa
        </button>
      </div>

      {/* Lista de Conversas */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm font-medium">Nenhuma conversa ainda</p>
            <p className="text-xs mt-1">Clique em "Nova Conversa" para começar</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                  activeConversationId === conversation.id
                    ? 'bg-purple-50 border-l-4 border-blue-500'
                    : 'border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-semibold text-gray-800 truncate">
                        {conversation.category || 'Conversa Geral'}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {getLastMessage(conversation)}
                    </p>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(conversation.updatedAt)}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Deseja deletar esta conversa?')) {
                        onDeleteConversation(conversation.id);
                      }
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {conversation.messages && (
                  <div className="mt-2 text-xs text-gray-500">
                    {conversation.messages.length} mensagem{conversation.messages.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer com contador */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600 text-center">
          {conversations.length} conversa{conversations.length !== 1 ? 's' : ''} total
        </div>
      </div>
    </div>
  );
}