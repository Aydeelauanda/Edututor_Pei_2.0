import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App' // REMOVIDO o /src/ pois já estamos na pasta src
import "./styles/globals.css" // REMOVIDO o /src/ 

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

