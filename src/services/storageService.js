/*
 * STORAGE SERVICE
 * Funções auxiliares para gerenciar localStorage
 * TESTE NO CONSOLE: storageService.saveUser({ name: 'Teste' })
 */

const STORAGE_KEYS = {
    USER: 'fashionstore_user',
    TOKEN: 'fashionstore_token',
    CONVERSATIONS: 'fashionstore_conversations'
};


//  FUNÇÃO: Salvar Usuário

export const saveUser = (userData) => {
    try {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        console.log('Usuário salvo:', userData);
        return true;
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        return false;
    }
};


// FUNÇÃO: Buscar Usuário

export const getUser = () => {
    try {
        const userData = localStorage.getItem(STORAGE_KEYS.USER);
        if (userData) {
            console.log('Usuário recuperado');
            return JSON.parse(userData);
        }
        console.log('Nenhum usuário encontrado');
        return null;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
};


// FUNÇÃO: Remover Usuário (Logout)

export const removeUser = () => {
    try {
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        console.log('Usuário removido (logout)');
        return true;
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        return false;
    }
};


// FUNÇÃO: Verificar se está logado

export const isAuthenticated = () => {
    const user = getUser();
    const isAuth = user !== null;
    console.log('Está autenticado?', isAuth);
    return isAuth;
};


// FUNÇÃO: Salvar Token

export const saveToken = (token) => {
    try {
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        console.log('Token salvo');
        return true;
    } catch (error) {
        console.error('Erro ao salvar token:', error);
        return false;
    }
};


// FUNÇÃO: Buscar Token

export const getToken = () => {
    try {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        console.log('Token recuperado:', token ? '***' : 'Nenhum');
        return token;
    } catch (error) {
        console.error(' Erro ao buscar token:', error);
        return null;
    }
};


//  FUNÇÕES DE TESTE (USE NO CONSOLE)

export const testStorage = () => {
    console.log('\n TESTANDO STORAGE SERVICE\n');

    // Teste 1: Salvar usuário
    console.log('TESTE: Salvar usuário');
    saveUser({
        id: '1',
        name: 'João Teste',
        email: 'joao@teste.com',
        type: 'customer'
    });

    // Teste 2: Buscar usuário
    console.log('\n TESTE: Buscar usuário');
    const user = getUser();
    console.log('Usuário:', user);

    // Teste 3: Verificar autenticação
    console.log('\n TESTE: Verificar autenticação');
    isAuthenticated();

    // Teste 4: Salvar token
    console.log('\n TESTE: Salvar token');
    saveToken('token_teste_12345');

    // Teste 5: Buscar token
    console.log('\n TESTE: Buscar token');
    getToken();

    // Teste 6: Remover usuário
    console.log('\n TESTE: Remover usuário');
    removeUser();

    // Teste 7: Verificar após logout
    console.log('\n TESTE: Verificar após logout');
    isAuthenticated();

    console.log('\n TESTES CONCLUÍDOS!\n');
};

// Exportar tudo

if (typeof window !== "undefined") {
  window.storageService = {
    saveUser,
    getUser,
    removeUser,
    isAuthenticated,
    saveToken,
    getToken,
    testStorage
  };
}
export default {
    saveUser,
    getUser,
    removeUser,
    isAuthenticated,
    saveToken,
    getToken,
    testStorage
};
