import React from 'react';
import { User, Mail, Phone, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { calculateStats } from '../../services/sentimentAnalysis';

/**
 * CLIENTINFO
 * Painel lateral com informações do cliente
 */

export default function ClientInfo({ client, conversation }) {
  if (!client || !conversation) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center p-6">
        <p className="text-gray-500 text-sm text-center">
          Selecione um atendimento para ver informações do cliente
        </p>
      </div>
    );
  }

  // Calcular estatísticas de sentimento
  const stats = calculateStats(conversation.messages || []);

  return (
    <div className="h-full bg-white border-l border-gray-200 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6">
        <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold">
          {client.name.charAt(0).toUpperCase()}
        </div>
        <h3 className="text-center font-bold text-lg">{client.name}</h3>
        <p className="text-center text-sm opacity-90">Cliente</p>
      </div>

      {/* Informações do Cliente */}
      <div className="p-6 space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
            Informações de Contato
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm text-gray-800 font-medium">{client.email}</p>
              </div>
            </div>

            {client.phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Telefone</p>
                  <p className="text-sm text-gray-800 font-medium">{client.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Cliente desde</p>
                <p className="text-sm text-gray-800 font-medium">
                  {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Informações da Conversa */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
            Esta Conversa
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Categoria</p>
                <p className="text-sm text-gray-800 font-medium capitalize">
                  {conversation.category || 'Não definida'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Iniciada em</p>
                <p className="text-sm text-gray-800 font-medium">
                  {new Date(conversation.createdAt).toLocaleDateString('pt-BR')} às{' '}
                  {new Date(conversation.createdAt).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {conversation.assignedTo && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Atendente</p>
                  <p className="text-sm text-gray-800 font-medium">
                    {conversation.assignedTo.name}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Análise de Sentimento */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Análise de Sentimento
          </h4>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.positive}</p>
              <p className="text-xs text-green-700">Positivo</p>
              <p className="text-xs text-green-600">
                {stats.total > 0 ? Math.round((stats.positive / stats.total) * 100) : 0}%
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-gray-600">{stats.neutral}</p>
              <p className="text-xs text-gray-700">Neutro</p>
              <p className="text-xs text-gray-600">
                {stats.total > 0 ? Math.round((stats.neutral / stats.total) * 100) : 0}%
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-red-600">{stats.negative}</p>
              <p className="text-xs text-red-700">Negativo</p>
              <p className="text-xs text-red-600">
                {stats.total > 0 ? Math.round((stats.negative / stats.total) * 100) : 0}%
              </p>
            </div>
          </div>

          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              <strong>Total:</strong> {stats.total} mensagens do cliente
            </p>
          </div>
        </div>

        {/* Histórico de Transferências */}
        {conversation.transferHistory && conversation.transferHistory.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
              Histórico de Transferências
            </h4>
            <div className="space-y-2">
              {conversation.transferHistory.map((transfer, index) => (
                <div key={index} className="text-xs bg-gray-50 rounded p-2">
                  <p className="text-gray-700">
                    <strong>{transfer.from?.name}</strong> → <strong>{transfer.to.name}</strong>
                  </p>
                  <p className="text-gray-500">
                    {new Date(transfer.at).toLocaleString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}