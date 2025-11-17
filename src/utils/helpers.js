/**
 * ========================================
 * HELPERS.JS - Funções Auxiliares
 * ========================================
 * Etapa 1.1: Validação de Email  
 * Testável no console do navegador!
 */

/**
 * Valida se um email tem formato válido
 * @param {string} email - Email para validar
 * @returns {boolean} - true se válido, false se inválido
 * 
 * Exemplos de teste no console:
 * validateEmail('joao@email.com')      // true  
 * validateEmail('maria@hotmail.com')   // true  
 * validateEmail('invalido@')           // false  
 * validateEmail('sem-arroba.com')      // false  
 * validateEmail('')                    // false  
 */
export const validateEmail = (email) => {
  // Regex padrão para validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida se um email tem formato válido E é de domínio conhecido
 * (Validação mais rigorosa - opcional)
 */
export const validateEmailStrict = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// ========================================
//  TESTES AUTOMÁTICOS (opcional)
// ========================================
// Descomente para rodar testes no console:

/*
console.log('TESTANDO VALIDAÇÃO DE EMAIL:');
console.log('-----------------------------------');

// Casos válidos  
console.log('joao@email.com:', validateEmail('joao@email.com')); // deve ser true
console.log('maria123@hotmail.com:', validateEmail('maria123@hotmail.com')); // deve ser true
console.log('user.name@domain.co.uk:', validateEmail('user.name@domain.co.uk')); // deve ser true

// Casos inválidos  
console.log('invalido@:', validateEmail('invalido@')); // deve ser false
console.log('sem-arroba.com:', validateEmail('sem-arroba.com')); // deve ser false
console.log('@semdominio:', validateEmail('@semdominio')); // deve ser false
console.log('vazio:', validateEmail('')); // deve ser false
console.log('espaços:', validateEmail('email @test.com')); // deve ser false

console.log('-----------------------------------');
console.log('Todos os testes concluídos!');
*/