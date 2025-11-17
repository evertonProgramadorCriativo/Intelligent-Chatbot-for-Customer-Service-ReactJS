 # Intelligent Chatbot for Customer Service


**Description**: Responsive chatbot interface integrated with generative AI for automated customer service, featuring sentiment analysis and contextualized responses.

##### Run Project
```
 npm i
 npm run dev
```
**Main Structure:**

* **CATEGORIES**: Array with 4 categories, each with an icon, color, and description

* **COLOR_CLASSES**: Mapping of colors to CSS classes (Tailwind)

* **API_CONFIG**: API settings

* **App Component**: Displays the categories and tests the imports



````bash 
This code implements a React application that imports and tests configurations of constants organized in a separate file. The `App` component displays a list of categories (Products, Orders, Complaints, and Questions) and logs the imported configurations for verification in the console.
````

*   **Sistema de Login**: Autenticação de usuários com validação
    
*   **Context API**: Gerenciamento centralizado do estado de autenticação
    
*   **Persistência**: Armazenamento seguro de dados do usuário
    
*   **Loading States**: Feedback visual durante processos assíncronos
    

Estrutura do Estado de Autenticação
-----------------------------------

O sistema mantém um estado global com as seguintes propriedades:

    {
      isAuthenticated: boolean,    // Status de autenticação
      loading: boolean,           // Estado de carregamento
      user: object | string       // Dados do usuário ou estado padrão
    }

Fluxo de Autenticação
---------------------

1.  **Estado Inicial**:
    
    *   `isAuthenticated: false`
        
    *   `loading: true`
        
    *   `user: "Nenhum"`
        
2.  **Processo de Login**:
    
    *   Simulação de login com dados de usuário
        
    *   Validação e armazenamento seguro
        
    *   Atualização do estado global
        
3.  **Estado Após Login Bem-sucedido**:
    
    *   `isAuthenticated: true`
        
    *   `loading: false`
        
    *   `user: {dados completos do usuário}`
        

Componentes Principais
----------------------

*   **AuthContext**: Context provider para gerenciamento de estado
    
*   **StorageService**: Serviço para persistência de dados
    
*   **TestAuthContext**: Componente para testes e demonstração
    

Estrutura de Dados do Usuário
-----------------------------

    {
      id: string,           // ID único do usuário
      name: string,         // Nome completo
      email: string,        // E-mail de acesso
      type: string,         // Tipo de usuário (ex: 'customer')
      createdAt: string     // Data de criação da conta
    }



---



**Sentiment Analysis Test**

**Test 1: Positive Sentiment**
Text: "Thank you! The product is excellent!"

Result: Positive — Happy

**Test 2: Negative Sentiment**
Text: "Terrible service! Defective product!"

Result: Negative — Sad

**Test 3: Neutral Sentiment**
Text: "What is the delivery time?"

Result: Neutral — Neutral

**Test 4: General Statistics**
Positive: 2
Negative: 1
Neutral: 1
Total: 4

**Teste 1: Categoria Produtos**

Selecione **"Produtos e Roupas"**
**Digite: "Quais tamanhos vocês têm?"**
Aguarde resposta da IA

**Teste 2: Categoria Reclamações**

Selecione **"Reclamações"**
**Digite: "Meu produto chegou com defeito"**
A IA deve oferecer transferência

**Teste 3: Análise de Sentimento**

Digite frases positivas e negativas
Veja o Analytics atualizar

Teste 4: **Transferência Manual**

**Clique em "Falar com Humano"**
Input deve desabilitar

## Author : Everton Eduardo 