import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserCheck, LogOut, BarChart } from 'lucide-react';
import EmployeeConversationList from '../components/dashboard/EmployeeConversationList';
import EmployeeChatWindow from '../components/dashboard/EmployeeChatWindow';
import ClientInfo from '../components/dashboard/ClientInfo';
import {
  getAllConversations,
  getClientInfo,
  assignAttendance,
  closeAttendance,
  updateConversationAsEmployee,
  getAttendanceStats
} from '../utils/attendanceHelper';

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Estados
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [clientsInfo, setClientsInfo] = useState({});
  const [stats, setStats] = useState({});
  const [showClientInfo, setShowClientInfo] = useState(true);

   
  // EFEITO: Carregar dados
   
  useEffect(() => {
    loadData();
    
    // Atualizar a cada 10 segundos
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [user.id]);

  const loadData = () => {
    console.log('Carregando atendimentos...');
    
    // Buscar todas as conversas
    const allConversations = getAllConversations();
    
    // Ordenar por data (mais recentes primeiro)
    const sortedConversations = allConversations.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    
    setConversations(sortedConversations);
    
    // Buscar informações dos clientes
    const clients = {};
    sortedConversations.forEach(conv => {
      if (!clients[conv.userId]) {
        clients[conv.userId] = getClientInfo(conv.userId);
      }
    });
    setClientsInfo(clients);
    
    // Calcular estatísticas
    const attendanceStats = getAttendanceStats(user.id);
    setStats(attendanceStats);
    
    console.log('Dados carregados:', {
      conversas: sortedConversations.length,
      clientes: Object.keys(clients).length,
      stats: attendanceStats
    });
  };

   
  // FUNÇÃO: Selecionar conversa
   
  const handleSelectConversation = (conversation) => {
    console.log('Conversa selecionada:', conversation.id);
    setActiveConversation(conversation);
  };

   
  // FUNÇÃO: Assumir atendimento
   
  const handleAssignToMe = () => {
    if (!activeConversation) return;
    
    console.log('Assumindo atendimento:', activeConversation.id);
    
    const updated = assignAttendance(
      activeConversation,
      user.id,
      user.name
    );
    
    if (updated) {
      setActiveConversation(updated);
      loadData(); // Recarregar lista
    }
  };

   
  // FUNÇÃO: Finalizar atendimento
   
  const handleCloseAttendance = () => {
    if (!activeConversation) return;
    
    console.log('Finalizando atendimento:', activeConversation.id);
    
    const updated = closeAttendance(activeConversation, user.id);
    
    if (updated) {
      setActiveConversation(updated);
      loadData(); // Recarregar lista
    }
  };

   
  // FUNÇÃO: Atualizar conversa
   
  const handleUpdateConversation = (updatedConversation) => {
    console.log('Atualizando conversa:', updatedConversation.id);
    
    updateConversationAsEmployee(updatedConversation);
    setActiveConversation(updatedConversation);
    loadData();
  };

   
  // FUNÇÃO: Logout
   
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const activeClient = activeConversation 
    ? clientsInfo[activeConversation.userId] 
    : null;

   
  // RENDERIZAR
   
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Painel de Atendimento
                </h1>
                <p className="text-xs text-gray-500">Fashion Store</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Estatísticas rápidas */}
              <div className="hidden md:flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-2">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Pendentes</p>
                  <p className="text-lg font-bold text-orange-600">{stats.pending || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Meus</p>
                  <p className="text-lg font-bold text-blue-600">{stats.myAttendances || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-lg font-bold text-gray-600">{stats.total || 0}</p>
                </div>
              </div>

              {/* Info do Funcionário */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name.split(' ')[0]}
                  </p>
                  <p className="text-xs text-gray-500">Atendente</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
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
        {/* Sidebar - Fila de Atendimentos */}
        <div className="w-80 border-r border-gray-200 bg-white">
          <EmployeeConversationList
            conversations={conversations}
            activeConversationId={activeConversation?.id}
            onSelectConversation={handleSelectConversation}
            currentEmployeeId={user.id}
            clientsInfo={clientsInfo}
          />
        </div>

        {/* Área de Chat */}
        <div className="flex-1">
          <EmployeeChatWindow
            conversation={activeConversation}
            client={activeClient}
            currentEmployee={user}
            onUpdateConversation={handleUpdateConversation}
            onAssignToMe={handleAssignToMe}
            onCloseAttendance={handleCloseAttendance}
          />
        </div>

        {/* Sidebar Direita - Info do Cliente */}
        <div className={`w-80 ${showClientInfo ? 'block' : 'hidden'} lg:block`}>
          <ClientInfo
            client={activeClient}
            conversation={activeConversation}
          />
        </div>
      </div>
    </div>
  );
}