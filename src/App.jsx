import { CATEGORIES, COLOR_CLASSES, API_CONFIG } from './utils/constants';

function App() {
  console.log(' TESTE - CATEGORIES:', CATEGORIES);
  console.log(' TESTE - COLOR_CLASSES:', COLOR_CLASSES);
  console.log(' TESTE - API_CONFIG:', API_CONFIG);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Testando os dados  - Constants.js</h1>
      <p>Clique no botão (F12) para ver os dados</p>
      <h2>Categorias:</h2>
      <ul>
        {CATEGORIES.map(cat => (
          <li key={cat.id}>{cat.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;