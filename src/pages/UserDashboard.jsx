import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingBag, LogOut, MessageSquare } from 'lucide-react';
import ConversationList from '../components/dashboard/ConversationList';
import ChatWindow from '../components/dashboard/ChatWindow';
import {
  getUserConversations,
  saveConversation,
  createConversation,
  deleteConversation
} from '../utils/conversationHelper';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Estados
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

    
  // EFEITO: Carregar conversas ao montar
    
  useEffect(() => {
    console.log('Carregando conversas do usuário:', user.id);
    const userConversations = getUserConversations(user.id);
    
    // Ordenar por data de atualização (mais recente primeiro)
    const sortedConversations = userConversations.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    
    setConversations(sortedConversations);
    
    // Se houver conversas, selecionar a mais recente
    if (sortedConversations.length > 0) {
      setActiveConversation(sortedConversations[0]);
    }
  }, [user.id]);

    
  // FUNÇÃO: Criar nova conversa
    
  const handleNewConversation = () => {
    console.log('Criando nova conversa...');
    
    const newConversation = createConversation(user.id);
    
    // Salvar no localStorage
    saveConversation(user.id, newConversation);
    
    // Adicionar à lista
    setConversations(prev => [newConversation, ...prev]);
    
    // Selecionar a nova conversa
    setActiveConversation(newConversation);
  };

    
  // FUNÇÃO: Selecionar conversa
    
  const handleSelectConversation = (conversation) => {
    console.log('Conversa selecionada:', conversation.id);
    setActiveConversation(conversation);
  };

    
  // FUNÇÃO: Atualizar conversa
    
  const handleUpdateConversation = (updatedConversation) => {
    console.log('Atualizando conversa:', updatedConversation.id);
    
    // Salvar no localStorage
    saveConversation(user.id, updatedConversation);
    
    // Atualizar lista
    setConversations(prev =>
      prev.map(conv =>
        conv.id === updatedConversation.id ? updatedConversation : conv
      ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    );
    
    // Atualizar conversa ativa
    setActiveConversation(updatedConversation);
  };

    
  // FUNÇÃO: Deletar conversa
    
  const handleDeleteConversation = (conversationId) => {
    console.log('Deletando conversa:', conversationId);
    
    // Deletar do localStorage
    deleteConversation(user.id, conversationId);
    
    // Remover da lista
    const newConversations = conversations.filter(
      conv => conv.id !== conversationId
    );
    setConversations(newConversations);
    
    // Se era a conversa ativa, limpar ou selecionar outra
    if (activeConversation?.id === conversationId) {
      setActiveConversation(newConversations[0] || null);
    }
  };

    
  // FUNÇÃO: Logout
    
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

    
  // RENDERIZAR
    
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-gray-300" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Fashion Store</h1>
                <p className="text-xs text-gray-500">Dashboard do Cliente</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Botão Mobile para Sidebar */}
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden bg-purple-100 text-blue-600 p-2 rounded-lg"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              {/* Info do Usuário */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name.split(' ')[0]}
                  </p>
                  <p className="text-xs text-gray-500">Cliente</p>
                </div>
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Botão Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Lista de Conversas */}
        <div
          className={`w-80 border-r border-gray-200 bg-white ${
            showSidebar ? 'block' : 'hidden'
          } lg:block`}
        >
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversation?.id}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
            onDeleteConversation={handleDeleteConversation}
          />
        </div>

        {/* Área de Chat */}
        <div className="flex-1">
          <ChatWindow
            conversation={activeConversation}
            onUpdateConversation={handleUpdateConversation}
          />
        </div>
      </div>
    </div>
  );
}