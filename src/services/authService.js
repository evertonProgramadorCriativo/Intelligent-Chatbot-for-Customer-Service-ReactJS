/*
 * Gerencia toda a lógica de autenticação:
 * - Validações (email, senha, etc)
 * - Login (verificar credenciais)
 * - Registro (criar novo usuário)
 * - Simulação de "banco de dados" local
 */

 
// BANCO DE DADOS SIMULADO (LocalStorage)
 
const DB_KEYS = {
  USERS: 'fashionstore_db_users',
  EMPLOYEES: 'fashionstore_db_employees'
};

 
//  FUNÇÃO: Inicializar Banco de Dados
 
const initDatabase = () => {
  console.log(' AuthService: Inicializando banco de dados...');
  
  // Verificar se já existe
  const users = localStorage.getItem(DB_KEYS.USERS);
  const employees = localStorage.getItem(DB_KEYS.EMPLOYEES);
  
  // Criar usuários de teste se não existir
  if (!users) {
    const defaultUsers = [
      {
        id: '1',
        name: 'João Cliente',
        email: 'joao@cliente.com',
        phone: '+55 21 98765-4321',
        password: '123456', // Em produção, usar hash!
        type: 'customer',
        createdAt: new Date().toISOString(),
        avatar: null
      },
      {
        id: '2',
        name: 'Maria Cliente',
        email: 'maria@cliente.com',
        phone: '+55 21 98765-1234',
        password: '123456',
        type: 'customer',
        createdAt: new Date().toISOString(),
        avatar: null
      }
    ];
    
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(defaultUsers));
    console.log('Usuários de teste criados:', defaultUsers.length);
  }
  
  // Criar funcionários de teste se não existir
  if (!employees) {
    const defaultEmployees = [
      {
        id: '1',
        name: 'Ana Atendente',
        email: 'ana@fashionstore.com',
        password: '123456',
        type: 'employee',
        department: 'support',
        status: 'online',
        createdAt: new Date().toISOString()
      }
    ];
    
    localStorage.setItem(DB_KEYS.EMPLOYEES, JSON.stringify(defaultEmployees));
    console.log('Funcionários de teste criados:', defaultEmployees.length);
  }
  
  console.log('AuthService: Banco de dados pronto!');
};

// Inicializar ao carregar
initDatabase();

 
// FUNÇÃO: Buscar Todos os Usuários
 
const getAllUsers = () => {
  try {
    const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
    const employees = JSON.parse(localStorage.getItem(DB_KEYS.EMPLOYEES) || '[]');
    return [...users, ...employees];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
};

 
// VALIDAÇÃO: Email
 
export const validateEmail = (email) => {
  console.log('Validando email:', email);
  
  if (!email) {
    return { valid: false, error: 'Email é obrigatório' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Email inválido' };
  }
  
  console.log('Email válido');
  return { valid: true };
};

 
// VALIDAÇÃO: Senha
 
export const validatePassword = (password) => {
  console.log('Validando senha...');
  
  if (!password) {
    return { valid: false, error: 'Senha é obrigatória' };
  }
  
  if (password.length < 6) {
    return { valid: false, error: 'Senha deve ter no mínimo 6 caracteres' };
  }
  
  console.log('Senha válida');
  return { valid: true };
};

 
// 5️⃣ VALIDAÇÃO: Nome
 
export const validateName = (name) => {
  console.log('Validando nome:', name);
  
  if (!name) {
    return { valid: false, error: 'Nome é obrigatório' };
  }
  
  if (name.length < 3) {
    return { valid: false, error: 'Nome deve ter no mínimo 3 caracteres' };
  }
  
  console.log('Nome válido');
  return { valid: true };
};

 
// VALIDAÇÃO: Telefone
 
export const validatePhone = (phone) => {
  console.log('Validando telefone:', phone);
  
  if (!phone) {
    return { valid: false, error: 'Telefone é obrigatório' };
  }
  
  // Remover caracteres não numéricos
  const phoneNumbers = phone.replace(/\D/g, '');
  
  if (phoneNumbers.length < 10) {
    return { valid: false, error: 'Telefone inválido' };
  }
  
  console.log('Telefone válido');
  return { valid: true };
};

 
// FUNÇÃO: Verificar se email já existe
 
const emailExists = (email) => {
  const allUsers = getAllUsers();
  return allUsers.some(user => user.email.toLowerCase() === email.toLowerCase());
};

 
// FUNÇÃO: LOGIN
 
export const loginUser = async (email, password) => {
  console.log('\n AuthService: Tentando fazer login...');
  console.log('Email:', email);
  
  try {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 1. Validar email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      console.error('Email inválido:', emailValidation.error);
      return {
        success: false,
        error: emailValidation.error
      };
    }
    
    // 2. Validar senha
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      console.error('Senha inválida:', passwordValidation.error);
      return {
        success: false,
        error: passwordValidation.error
      };
    }
    
    // 3. Buscar usuário no "banco de dados"
    const allUsers = getAllUsers();
    const user = allUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase()
    );
    
    if (!user) {
      console.error('Usuário não encontrado');
      return {
        success: false,
        error: 'Email não cadastrado'
      };
    }
    
    // 4. Verificar senha
    if (user.password !== password) {
      console.error('Senha incorreta');
      return {
        success: false,
        error: 'Senha incorreta'
      };
    }
    
    // 5. Login bem-sucedido!
    console.log('Login realizado com sucesso!');
    console.log('Usuário:', user.name);
    
    // Remover senha do objeto retornado (segurança)
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      success: true,
      user: userWithoutPassword
    };
    
  } catch (error) {
    console.error('Erro no login:', error);
    return {
      success: false,
      error: 'Erro ao processar login. Tente novamente.'
    };
  }
};

 
// FUNÇÃO: REGISTRO
 
export const registerUser = async (userData) => {
  console.log('\n AuthService: Tentando registrar novo usuário...');
  console.log('Dados:', userData);
  
  try {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { name, email, phone, password, confirmPassword, type } = userData;
    
    // 1. Validar nome
    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
      console.error('Nome inválido:', nameValidation.error);
      return {
        success: false,
        error: nameValidation.error
      };
    }
    
    // 2. Validar email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      console.error('Email inválido:', emailValidation.error);
      return {
        success: false,
        error: emailValidation.error
      };
    }
    
    // 3. Verificar se email já existe
    if (emailExists(email)) {
      console.error('Email já cadastrado');
      return {
        success: false,
        error: 'Este email já está cadastrado'
      };
    }
    
    // 4. Validar telefone (se for cliente)
    if (type === 'customer') {
      const phoneValidation = validatePhone(phone);
      if (!phoneValidation.valid) {
        console.error('Telefone inválido:', phoneValidation.error);
        return {
          success: false,
          error: phoneValidation.error
        };
      }
    }
    
    // 5. Validar senha
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      console.error('Senha inválida:', passwordValidation.error);
      return {
        success: false,
        error: passwordValidation.error
      };
    }
    
    // 6. Verificar se senhas coincidem
    if (password !== confirmPassword) {
      console.error('Senhas não coincidem');
      return {
        success: false,
        error: 'As senhas não coincidem'
      };
    }
    
    // 7. Criar novo usuário
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || null,
      password, // Em produção, fazer hash da senha!
      type: type || 'customer',
      createdAt: new Date().toISOString(),
      avatar: null
    };
    
    // 8. Salvar no "banco de dados"
    const dbKey = type === 'employee' ? DB_KEYS.EMPLOYEES : DB_KEYS.USERS;
    const currentUsers = JSON.parse(localStorage.getItem(dbKey) || '[]');
    currentUsers.push(newUser);
    localStorage.setItem(dbKey, JSON.stringify(currentUsers));
    
    console.log('Usuário registrado com sucesso!');
    console.log('Novo usuário:', newUser.name);
    
    // Remover senha do objeto retornado
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      success: true,
      user: userWithoutPassword
    };
    
  } catch (error) {
    console.error('Erro no registro:', error);
    return {
      success: false,
      error: 'Erro ao processar cadastro. Tente novamente.'
    };
  }
};

 
// FUNÇÃO: Buscar usuário por ID
 
export const getUserById = (id) => {
  const allUsers = getAllUsers();
  return allUsers.find(user => user.id === id);
};

 
// FUNÇÃO: Resetar banco de dados
 
export const resetDatabase = () => {
  console.log('Resetando banco de dados...');
  localStorage.removeItem(DB_KEYS.USERS);
  localStorage.removeItem(DB_KEYS.EMPLOYEES);
  initDatabase();
  console.log('Banco de dados resetado!');
};

 
// FUNÇÕES DE TESTE
 
export const testAuthService = async () => {
  console.log('\n TESTANDO AUTH SERVICE\n');
  
  // Teste 1: Validações
  console.log('TESTE: Validações');
  console.log('Email válido:', validateEmail('teste@email.com'));
  console.log('Email inválido:', validateEmail('email-invalido'));
  console.log('Senha válida:', validatePassword('123456'));
  console.log('Senha inválida:', validatePassword('123'));
  
  // Teste 2: Login com usuário existente
  console.log('\n TESTE: Login com usuário existente');
  const loginResult = await loginUser('joao@cliente.com', '123456');
  console.log('Resultado:', loginResult);
  
  // Teste 3: Login com senha errada
  console.log('\n TESTE: Login com senha errada');
  const loginErro = await loginUser('joao@cliente.com', 'senha-errada');
  console.log('Resultado:', loginErro);
  
  // Teste 4: Registro de novo usuário
  console.log('\n TESTE: Registro de novo usuário');
  const registerResult = await registerUser({
    name: 'Teste Novo',
    email: 'novo@teste.com',
    phone: '+55 21 99999-9999',
    password: '123456',
    confirmPassword: '123456',
    type: 'customer'
  });
  console.log('Resultado:', registerResult);
  
  // Teste 5: Registro com email duplicado
  console.log('\n TESTE: Registro com email duplicado');
  const registerDuplicado = await registerUser({
    name: 'Outro Teste',
    email: 'novo@teste.com',
    phone: '+55 21 88888-8888',
    password: '123456',
    confirmPassword: '123456',
    type: 'customer'
  });
  console.log('Resultado:', registerDuplicado);
  
  console.log('\n TESTES CONCLUÍDOS!\n');
};

// Exportar tudo
export default {
  loginUser,
  registerUser,
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  getUserById,
  resetDatabase,
  testAuthService
};
