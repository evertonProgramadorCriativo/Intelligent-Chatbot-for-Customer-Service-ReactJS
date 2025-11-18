import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './services/storageService.js'
import { AuthProvider } from './contexts/AuthContext';
import TestAuthContext from './components/TestAuthContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      {/*<TestAuthContext /> */}
      <App />
    </AuthProvider>
  </StrictMode>
)
