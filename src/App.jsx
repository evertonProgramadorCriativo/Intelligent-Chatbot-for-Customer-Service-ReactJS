
import { API_CONFIG } from './utils/constants';

function App() {
  // Simular getSystemPrompt localmente
  const testPrompt = (category) => {
    console.log(` TESTE - Prompt para categoria "${category}":`);
    console.log('Endpoint:', API_CONFIG.endpoint);
    console.log('Model:', API_CONFIG.model);
    console.log('MaxTokens:', API_CONFIG.maxTokens);
  };

  testPrompt('produtos');
  testPrompt('pedidos');
  testPrompt('reclamacoes');
  testPrompt('duvidas');

  return (
    <div style={{ padding: '20px' }}>
      <h1> Teste - API Configuration</h1>
      <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>Configurações da API:</h2>
        <p><strong>Endpoint:</strong> {API_CONFIG.endpoint}</p>
        <p><strong>Model:</strong> {API_CONFIG.model}</p>
        <p><strong>Max Tokens:</strong> {API_CONFIG.maxTokens}</p>
      </div>
      <p style={{ marginTop: '20px', color: '#666' }}>
         Configuração carregada com sucesso!<br/>
         Verifique o console para detalhes dos prompts
      </p>
    </div>
  );
}

export default App;