import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { validateEmail, validatePassword } from '../../services/authService';

/**
 * LOGINFORM
 * Formulário de login com validação em tempo real
 * Props:
 * - onSubmit: função chamada ao fazer login (recebe email e password)
 * - onRegisterClick: função chamada ao clicar em "Criar conta"
 */

export default function LoginForm({ onSubmit, onRegisterClick }) {
  // Estados do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Estados de validação
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  
  // Estados de "touched" (campo foi tocado?)
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

   
  // FUNÇÃO: Validar email em tempo real
   
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (emailTouched) {
      const validation = validateEmail(value);
      setEmailError(validation.valid ? '' : validation.error);
    }
  };

   
  // FUNÇÃO: Validar senha em tempo real
   
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    if (passwordTouched) {
      const validation = validatePassword(value);
      setPasswordError(validation.valid ? '' : validation.error);
    }
  };

   
  // FUNÇÃO: Marcar campo como "tocado"
   
  const handleEmailBlur = () => {
    setEmailTouched(true);
    const validation = validateEmail(email);
    setEmailError(validation.valid ? '' : validation.error);
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    const validation = validatePassword(password);
    setPasswordError(validation.valid ? '' : validation.error);
  };

   
  // FUNÇÃO: Submeter formulário
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('LoginForm: Submetendo formulário...');
    
    // Marcar todos os campos como tocados
    setEmailTouched(true);
    setPasswordTouched(true);
    
    // Validar todos os campos
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    
    setEmailError(emailValidation.valid ? '' : emailValidation.error);
    setPasswordError(passwordValidation.valid ? '' : passwordValidation.error);
    
    // Se houver erros, não submeter
    if (!emailValidation.valid || !passwordValidation.valid) {
      console.log('LoginForm: Formulário com erros');
      return;
    }
    
    // Limpar erro geral
    setGeneralError('');
    setLoading(true);
    
    try {
      console.log('LoginForm: Chamando onSubmit...');
      const result = await onSubmit(email, password);
      
      if (!result.success) {
        setGeneralError(result.error);
        console.log('LoginForm: Erro no login:', result.error);
      } else {
        console.log('LoginForm: Login bem-sucedido!');
      }
    } catch (error) {
      console.error('LoginForm: Erro ao submeter:', error);
      setGeneralError('Erro ao processar login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

   
  // RENDERIZAR
   
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Bem-vindo de volta! 
        </h1>
        <p className="text-gray-600">
          Entre com sua conta para continuar
        </p>
      </div>

      {/* Erro Geral */}
      {generalError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">Erro no login</p>
            <p className="text-sm text-red-600">{generalError}</p>
          </div>
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                emailError
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-purple-500'
              }`}
              placeholder="seu@email.com"
              disabled={loading}
            />
          </div>
          {emailError && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {emailError}
            </p>
          )}
        </div>

        {/* Campo Senha */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                passwordError
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-purple-500'
              }`}
              placeholder="Digite sua senha"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {passwordError && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {passwordError}
            </p>
          )}
        </div>

        {/* Link "Esqueci a senha" */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            disabled={loading}
          >
            Esqueci minha senha
          </button>
        </div>

        {/* Botão de Login */}
        <button
          type="submit"
          disabled={loading || emailError || passwordError}
          className="w-full bg-green-500  text-white font-bold py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </button>
      </form>

      {/* Divisor */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">ou</span>
        </div>
      </div>

      {/* Link para Criar Conta */}
      <div className="text-center">
        <p className="text-gray-600">
          Ainda não tem uma conta?{' '}
          <button
            type="button"
            onClick={onRegisterClick}
            className="text-purple-600 hover:text-purple-700 font-bold"
            disabled={loading}
          >
            Criar conta
          </button>
        </p>
      </div>

      {/* Credenciais de Teste */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-blue-800 mb-2">
           Credenciais de Teste
        </p>
        <div className="text-sm text-blue-700 space-y-1">
          <p><strong>Email:</strong> joao@cliente.com</p>
          <p><strong>Senha:</strong> 123456</p>
        </div>
      </div>
    </div>
  );
}