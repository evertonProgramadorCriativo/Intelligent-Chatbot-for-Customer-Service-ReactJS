import { analyzeSentiment, getSentiment, calculateStats } from './services/sentimentAnalysis';

function App() {
  // Teste 1: Sentimento Positivo
  const test1 = "Obrigado! O produto é excelente!";
  const sentiment1 = analyzeSentiment(test1);
  console.log(' TESTE 1 - Positivo:', test1, '→', sentiment1, getSentiment(sentiment1));
  
  // Teste 2: Sentimento Negativo
  const test2 = "Péssimo atendimento! Produto com defeito!";
  const sentiment2 = analyzeSentiment(test2);
  console.log(' TESTE 2 - Negativo:', test2, '→', sentiment2, getSentiment(sentiment2));
  
  // Teste 3: Sentimento Neutro
  const test3 = "Qual o prazo de entrega?";
  const sentiment3 = analyzeSentiment(test3);
  console.log(' TESTE 3 - Neutro:', test3, '→', sentiment3, getSentiment(sentiment3));
  
  // Teste 4: calculateStats
  const mockMessages = [
    { role: 'user', sentiment: 'positive' },
    { role: 'user', sentiment: 'positive' },
    { role: 'user', sentiment: 'negative' },
    { role: 'user', sentiment: 'neutral' },
    { role: 'assistant', sentiment: 'neutral' }
  ];
  const stats = calculateStats(mockMessages);
  console.log(' TESTE 4 - Stats:', stats);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1> Teste - Análise de Sentimento</h1>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Teste 1: Sentimento Positivo</h2>
        <p>Texto: "{test1}"</p>
        <p>Resultado: {sentiment1} {getSentiment(sentiment1)}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Teste 2: Sentimento Negativo</h2>
        <p>Texto: "{test2}"</p>
        <p>Resultado: {sentiment2} {getSentiment(sentiment2)}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Teste 3: Sentimento Neutro</h2>
        <p>Texto: "{test3}"</p>
        <p>Resultado: {sentiment3} {getSentiment(sentiment3)}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Teste 4: Calcular Estatísticas</h2>
        <p>Positivo: {stats.positive}</p>
        <p>Negativo: {stats.negative}</p>
        <p>Neutro: {stats.neutral}</p>
        <p>Total: {stats.total}</p>
      </div>
    </div>
  );
}

export default App;