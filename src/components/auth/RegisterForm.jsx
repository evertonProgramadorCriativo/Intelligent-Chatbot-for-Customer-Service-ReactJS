import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle, Loader2, UserCheck } from 'lucide-react';
import { validateName, validateEmail, validatePhone, validatePassword } from '../../services/authService';

/**
 * REGISTERFORM
 * Formulário de registro com validação em tempo real
 * Props:
 * - onSubmit: função chamada ao registrar (recebe todos os dados)
 * - onLoginClick: função chamada ao clicar em "Já tenho conta"
 */

export default function RegisterForm({ onSubmit, onLoginClick }) {
  // Estados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    type: 'customer'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Estados de validação
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [generalError, setGeneralError] = useState('');

    
  // FUNÇÃO: Atualizar campo
    
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validar em tempo real se o campo foi tocado
    if (touched[field]) {
      validateField(field, value);
    }
  };

    
  // FUNÇÃO: Validar campo individual
    
  const validateField = (field, value) => {
    let validation;
    
    switch (field) {
      case 'name':
        validation = validateName(value);
        break;
      case 'email':
        validation = validateEmail(value);
        break;
      case 'phone':
        if (formData.type === 'customer') {
          validation = validatePhone(value);
        } else {
          validation = { valid: true };
        }
        break;
      case 'password':
        validation = validatePassword(value);
        break;
      case 'confirmPassword':
        validation = value === formData.password
          ? { valid: true }
          : { valid: false, error: 'As senhas não coincidem' };
        break;
      default:
        validation = { valid: true };
    }
    
    setErrors(prev => ({
      ...prev,
      [field]: validation.valid ? '' : validation.error
    }));
  };

    
  // FUNÇÃO: Marcar campo como tocado
    
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

    
  // FUNÇÃO: Submeter formulário
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('RegisterForm: Submetendo formulário...');
    
    // Marcar todos os campos como tocados
    const allFields = ['name', 'email', 'phone', 'password', 'confirmPassword'];
    const newTouched = {};
    allFields.forEach(field => { newTouched[field] = true; });
    setTouched(newTouched);
    
    // Validar todos os campos
    const newErrors = {};
    allFields.forEach(field => {
      const value = formData[field];
      
      // Pular validação de telefone se for funcionário
      if (field === 'phone' && formData.type === 'employee') {
        return;
      }
      
      let validation;
      switch (field) {
        case 'name':
          validation = validateName(value);
          break;
        case 'email':
          validation = validateEmail(value);
          break;
        case 'phone':
          validation = validatePhone(value);
          break;
        case 'password':
          validation = validatePassword(value);
          break;
        case 'confirmPassword':
          validation = value === formData.password
            ? { valid: true }
            : { valid: false, error: 'As senhas não coincidem' };
          break;
        default:
          validation = { valid: true };
      }
      
      if (!validation.valid) {
        newErrors[field] = validation.error;
      }
    });
    
    setErrors(newErrors);
    
    // Se houver erros, não submeter
    if (Object.keys(newErrors).length > 0) {
      console.log('RegisterForm: Formulário com erros', newErrors);
      return;
    }
    
    // Limpar erro geral
    setGeneralError('');
    setLoading(true);
    
    try {
      console.log('RegisterForm: Chamando onSubmit...');
      const result = await onSubmit(formData);
      
      if (!result.success) {
        setGeneralError(result.error);
        console.log('RegisterForm: Erro no registro:', result.error);
      } else {
        console.log('RegisterForm: Registro bem-sucedido!');
      }
    } catch (error) {
      console.error('RegisterForm: Erro ao submeter:', error);
      setGeneralError('Erro ao processar cadastro. Tente novamente.');
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
          Criar Nova Conta
        </h1>
        <p className="text-gray-600">
          Preencha os dados para se cadastrar
        </p>
      </div>

      {/* Erro Geral */}
      {generalError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 
        flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">Erro no cadastro</p>
            <p className="text-sm text-red-600">{generalError}</p>
          </div>
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo Nome */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nome Completo *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none 
                focus:ring-2 transition-all ${
                errors.name
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-purple-500'
              }`}
              placeholder="João Silva"
              disabled={loading}
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2
                 transition-all ${
                errors.email
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-purple-500'
              }`}
              placeholder="seu@email.com"
              disabled={loading}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Tipo de Usuário */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tipo de Conta *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChange('type', 'customer')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2
                 transition-all ${
                formData.type === 'customer'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
              disabled={loading}
            >
              <User className="w-5 h-5" />
              <span className="font-semibold">Cliente</span>
            </button>
            <button
              type="button"
              onClick={() => handleChange('type', 'employee')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 
                transition-all ${
                formData.type === 'employee'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
              disabled={loading}
            >
              <UserCheck className="w-5 h-5" />
              <span className="font-semibold">Funcionário</span>
            </button>
          </div>
        </div>

        {/* Campo Telefone (apenas para clientes) */}
        {formData.type === 'customer' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Telefone *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none 
                    focus:ring-2 transition-all ${
                  errors.phone
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-purple-500'
                }`}
                placeholder="+55 21 98765-4321"
                disabled={loading}
              />
            </div>
            {errors.phone && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.phone}
              </p>
            )}
          </div>
        )}

        {/* Campo Senha */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Senha *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none 
                focus:ring-2 transition-all ${
                errors.password
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-purple-500'
              }`}
              placeholder="Mínimo 6 caracteres"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
               hover:text-gray-600"
              disabled={loading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Campo Confirmar Senha */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Confirmar Senha *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none
                 focus:ring-2 transition-all ${
                errors.confirmPassword
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-purple-500'
              }`}
              placeholder="Digite a senha novamente"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
               hover:text-gray-600"
              disabled={loading}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Botão de Registro */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500
           text-white font-bold py-3 rounded-lg hover:from-green-600
            hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl
             disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Cadastrando...
            </>
          ) : (
            'Criar Conta'
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

      {/* Link para Login */}
      <div className="text-center">
        <p className="text-gray-600">
          Já tem uma conta?{' '}
          <button
            type="button"
            onClick={onLoginClick}
            className="text-purple-600 hover:text-purple-700 font-bold"
            disabled={loading}
          >
            Fazer login
          </button>
        </p>
      </div>
    </div>
  );
}