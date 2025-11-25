#  Fashion Store - Chatbot Inteligente para E-commerce


Sistema completo de atendimento ao cliente com chatbot inteligente integrado à IA, análise de sentimentos e painel de gestão para funcionários.

---

##  Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Testando o Sistema](#testando-o-sistema)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Autor](#autor)

---

##  Sobre o Projeto

O **Fashion Store Chatbot** é uma aplicação completa de atendimento ao cliente para lojas de e-commerce, oferecendo:

-  **Chatbot Inteligente** powered by IA (Groq API com modelo Llama 3.3)
-  **Análise de Sentimentos** em tempo real
-  **Sistema de Transferência** para atendentes humanos
-  **Interface Responsiva** e moderna
-  **Sistema de Autenticação** completo
-  **Dashboard Administrativo** para funcionários

---

##  Funcionalidades

### Para Clientes

####  **Categorias de Atendimento**
- **Produtos e Roupas**: Informações sobre tamanhos, cores, disponibilidade
- **Meus Pedidos**: Rastreamento, status, prazos de entrega
- **Reclamações**: Problemas com produtos ou entregas
- **Dúvidas Gerais**: Trocas, devoluções, políticas da loja

####  **Chat Inteligente**
- Respostas contextualizadas baseadas na categoria
- Histórico completo de conversas
- Múltiplas conversas simultâneas
- Análise de sentimento (Positivo, Negativo, Neutro)

####  **Transferência para Humano**
- Detecção automática de situações críticas
- Solicitação manual de atendente
- Transição suave entre bot e humano

### Para Funcionários

####  **Painel de Atendimento**
- Visualização de todos os atendimentos pendentes
- Filtros por status (Pendentes, Assumidos, Finalizados)
- Informações detalhadas do cliente
- Histórico completo de mensagens

####  **Analytics e Métricas**
- Total de atendimentos
- Atendimentos pendentes
- Meus atendimentos ativos
- Análise de sentimento dos clientes

####  **Gestão de Atendimentos**
- Assumir atendimentos da fila
- Responder mensagens dos clientes
- Finalizar atendimentos
- Transferir entre atendentes

---

##  Tecnologias

### Frontend
- **React 19.2.0** - Biblioteca JavaScript
- **React Router DOM 7.9.6** - Roteamento
- **Tailwind CSS 3.4.18** - Estilização
- **Lucide React** - Ícones modernos
- **Vite 5.4.10** - Build tool

### Backend
- **Node.js** - Runtime JavaScript
- **Express 5.1.0** - Framework web
- **Groq API** - IA Generativa (Llama 3.3 70B)
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Variáveis de ambiente

### Armazenamento
- **LocalStorage** - Persistência de dados local
- Sistema de "banco de dados" simulado

---

##  Instalação

### Pré-requisitos
- Node.js 18+ instalado
- NPM ou Yarn
- Conta Groq (gratuita) - [Criar conta aqui](https://console.groq.com/)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/fashion-store-chatbot.git
cd fashion-store-chatbot
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure a API Key do Groq**

Crie um arquivo `.env` na raiz do projeto:
```env
GROQ_API_KEY=sua_api_key_aqui
```

>  **Como obter sua API Key:**
> 1. Acesse [https://console.groq.com/keys](https://console.groq.com/keys)
> 2. Faça login/cadastro
> 3. Clique em "Create API Key"
> 4. Copie a chave gerada

4. **Inicie o servidor backend**
```bash
node server.js
```



5. **Inicie o frontend** (em outro terminal)
```bash
npm run dev
```

Acesse: `http://localhost:5173`

---

##  Como Usar

### 1 Primeira Vez - Criar Conta

1. Acesse a aplicação
2. Clique em **"Criar conta"**
3. Preencha os dados:
   - Nome completo
   - Email
   - Telefone (se for cliente)
   - Senha (mínimo 6 caracteres)
   - Tipo: **Cliente** ou **Funcionário**
4. Clique em **"Criar Conta"**

###  Login com Credenciais de Teste

**Cliente:**
- Email: `joao@cliente.com`
- Senha: `123456`

**Funcionário:**
- Email: `ana@fashionstore.com`
- Senha: `123456`

###  Usando o Chat (Cliente)

1. **Selecione uma categoria**:
   - Produtos e Roupas
   - Meus Pedidos
   - Reclamações
   - Dúvidas Gerais

2. **Digite sua mensagem**:
   - Faça perguntas sobre produtos
   - Consulte status de pedidos
   - Registre reclamações
   - Tire dúvidas

3. **Converse naturalmente**:
   - O bot responde em tempo real
   - Análise de sentimento automática
   - Histórico salvo automaticamente

4. **Solicite atendimento humano** (se necessário):
   - Clique no botão "Falar com Humano"
   - Ou diga "quero falar com atendente"

###  Atendendo Clientes (Funcionário)

1. **Visualize a fila**:
   - Atendimentos pendentes em laranja
   - Seus atendimentos em azul
   - Finalizados em verde

2. **Assuma um atendimento**:
   - Clique na conversa
   - Botão "Assumir"
   - Comece a responder

3. **Gerencie o atendimento**:
   - Veja informações do cliente
   - Histórico completo
   - Análise de sentimento

4. **Finalize quando resolver**:
   - Botão "Finalizar"
   - Atendimento marcado como concluído

---

##  Testando o Sistema

### Teste 1: Chat com Produtos 

**Cenário**: Cliente perguntando sobre tamanhos

1. Faça login como cliente
2. Clique em **"Produtos e Roupas"**
3. Digite: `"Quais tamanhos de camiseta vocês têm?"`
4. **Resultado esperado**: Bot responde com tamanhos disponíveis (P, M, G, GG)

### Teste 2: Análise de Sentimento 

**Cenário**: Testar detecção de emoções

1. **Mensagem Positiva**:
   - Digite: `"Adorei o produto! Muito obrigado!"`
   - **Esperado**: Sentimento POSITIVO (verde)

2. **Mensagem Negativa**:
   - Digite: `"Meu pedido chegou com defeito, estou muito insatisfeito"`
   - **Esperado**: Sentimento NEGATIVO (vermelho)

3. **Mensagem Neutra**:
   - Digite: `"Qual é o prazo de entrega?"`
   - **Esperado**: Sentimento NEUTRO (cinza)

### Teste 3: Transferência para Humano 

**Cenário**: Bot identifica necessidade de atendente

1. Clique em **"Reclamações"**
2. Digite: `"Meu pedido não chegou e preciso de reembolso"`
3. **Esperado**: Bot oferece transferir para atendente
4. Confirme a transferência
5. **Resultado**: Atendente pode assumir na fila

### Teste 4: Múltiplas Conversas 

**Cenário**: Cliente com várias conversas

1. Clique em **"Nova Conversa"**
2. Escolha categoria diferente
3. Converse normalmente
4. **Verifique**: Sidebar mostra todas as conversas
5. Alterne entre elas
6. **Esperado**: Histórico preservado

### Teste 5: Painel Funcionário 

**Cenário**: Atendente gerenciando fila

1. Faça logout do cliente
2. Login como funcionário (`ana@fashionstore.com`)
3. **Verifique**:
   - Fila de atendimentos
   - Filtros funcionando
   - Contadores corretos

4. **Assuma um atendimento**:
   - Clique em conversa pendente
   - Botão "Assumir"
   - Digite resposta
   - Botão "Finalizar"

### Teste 6: Persistência de Dados 

**Cenário**: Dados salvos após fechar navegador

1. Crie uma conversa
2. Adicione várias mensagens
3. **Feche o navegador completamente**
4. Abra novamente
5. Faça login
6. **Esperado**: Conversas preservadas

### Teste 7: Validações de Formulário 

**Cenário**: Sistema impede dados inválidos

1. Tente criar conta com:
   - Email inválido: `teste@`
   - Senha curta: `123`
   - Senhas diferentes
2. **Esperado**: Mensagens de erro claras

### Teste 8: Responsividade 

**Cenário**: Interface adapta a telas pequenas

1. Abra DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Teste em:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
4. **Esperado**: Layout se ajusta perfeitamente

---
