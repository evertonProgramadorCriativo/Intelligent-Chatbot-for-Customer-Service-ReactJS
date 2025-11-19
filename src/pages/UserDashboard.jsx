
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    User,
    LogOut,
    MessageSquare,
    Package,
    ShoppingBag
} from 'lucide-react';

export default function UserDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-blue-500">
            {/* Header */}
            <div className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="w-8 h-8 text-green-500" />
                            <h1 className="text-2xl font-bold text-gray-800">Fashion Store</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg
               hover:bg-red-600 transition-all"
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
                        <div className="w-16 h-16 bg-gray-400  rounded-full 
             flex items-center justify-center text-white text-2xl font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Olá, {user.name.split(' ')[0]}!
                            </h2>
                            <p className="text-gray-600">
                                Bem-vindo ao seu painel de cliente
                            </p>
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-green-800">
                            <strong>Rota protegida funcionando!</strong><br />
                            Esta página só pode ser acessada por clientes autenticados.
                        </p>
                    </div>
                </div>

                {/* Cards de Funcionalidades */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all
           cursor-pointer">
                        <MessageSquare className="w-12 h-12 text-blue-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                            Novo Atendimento
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Iniciar uma conversa com nosso assistente virtual
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all 
          cursor-pointer">
                        <Package className="w-12 h-12 text-blue-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                            Meus Pedidos
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Acompanhar status dos seus pedidos
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl 
          transition-all cursor-pointer">
                        <User className="w-12 h-12 text-green-500 mb-4" />
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                            Meu Perfil
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Gerenciar informações da conta
                        </p>
                    </div>
                </div>

                {/* Debug Info */}
                <div className="mt-8 bg-gray-900 text-green-400 rounded-xl p-6 font-mono text-sm">
                    <p className="font-bold mb-3"> Informações de Debug</p>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
}

