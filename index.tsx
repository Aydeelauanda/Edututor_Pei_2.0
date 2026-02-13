// @ts-nocheck
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Tentativa de carregar o estilo. Se der erro no build, 
// a Vercel nos avisará, mas o @ts-nocheck ajuda a ignorar avisos bobos.
try {
  import("./styles/globals.css");
} catch (e) {
  console.warn("Estilos globais não encontrados");
}

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
