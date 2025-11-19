
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { registerUser } from '../services/authService';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async (formData) => {
        const authResult = await registerUser(formData);
        if (!authResult.success) return authResult;

        const loginResult = await login(authResult.user);
        if (loginResult.success) {
            const redirectTo = authResult.user.type === 'employee'
                ? '/employee-dashboard'
                : '/dashboard';
            navigate(redirectTo);
        }
        return loginResult;
    };

    return (
        <div className="min-h-screen bg-green-600 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
                <RegisterForm
                    onSubmit={handleRegister}
                    onLoginClick={() => navigate('/login')}
                />
            </div>
        </div>
    );
}
