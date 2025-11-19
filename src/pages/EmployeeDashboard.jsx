
import React from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserCheck, 
    LogOut,
     MessageSquare,
      Users,
       BarChart } from 'lucide-react';

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-200 ">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Painel Funcionário</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 
              rounded-lg hover:bg-red-600 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-500  rounded-full flex
             items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Olá, {user.name.split(' ')[0]}! 
              </h2>
              <p className="text-gray-600">
                Painel de atendimento
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
               <strong>Área de funcionário funcionando!</strong><br/>
              Esta página só pode ser acessada por funcionários autenticados.
            </p>
          </div>
        </div>

        {/* Cards de Funcionalidades */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl 
          transition-all cursor-pointer">
            <MessageSquare className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Atendimentos
            </h3>
            <p className="text-gray-600 text-sm">
              Ver fila de atendimentos pendentes
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl 
          transition-all cursor-pointer">
            <Users className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Clientes
            </h3>
            <p className="text-gray-600 text-sm">
              Histórico de conversas com clientes
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all
           cursor-pointer">
            <BarChart className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Analytics
            </h3>
            <p className="text-gray-600 text-sm">
              Métricas de atendimento
            </p>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 bg-gray-900 text-green-400 rounded-xl p-6 font-mono text-sm">
          <p className="font-bold mb-3">Informações de Debug</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}