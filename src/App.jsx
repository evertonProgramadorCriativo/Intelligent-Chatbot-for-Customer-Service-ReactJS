import { useState } from 'react';
import CategoryMenu from './components/CategoryMenu';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelect = (category) => {
    console.log(' Categoria selecionada:', category);
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Teste - CategoryMenu Component
        </h1>
        
        <CategoryMenu onSelectCategory={handleSelect} />

        {selectedCategory && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Categoria Selecionada:</h3>
            <p className="text-green-700"><strong>ID:</strong> {selectedCategory.id}</p>
            <p className="text-green-700"><strong>Título:</strong> {selectedCategory.title}</p>
            <p className="text-green-700"><strong>Cor:</strong> {selectedCategory.color}</p>
            <p className="text-green-700 text-sm mt-2">{selectedCategory.description}</p>
          </div>
        )}

         
      </div>
    </div>
  );
}

export default App;