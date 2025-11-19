import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/authService';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (email, password) => {
        const authResult = await loginUser(email, password);
        if (!authResult.success) return authResult;

        const loginResult = await login(authResult.user);
        if (loginResult.success) {
            // Redirecionar baseado no tipo de usuário
            const redirectTo = authResult.user.type === 'employee'
                ? '/employee-dashboard'
                : '/dashboard';
            navigate(redirectTo);
        }
        return loginResult;
    };

    return (
        <div className="min-h-screen bg-yellow-100  flex items-center 
    justify-center p-6">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
                <LoginForm
                    onSubmit={handleLogin}
                    onRegisterClick={() => navigate('/register')}
                />
            </div>
        </div>
    );
}
