import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/principal.css';
import './components/blocks/register.css';
import './components/blocks/login.css';
import './components/blocks/popup.css';
import App from './components/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
