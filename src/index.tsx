import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App' // Estão na mesma pasta (src)

// CORREÇÃO: ../ serve para sair da pasta src e achar a pasta styles na raiz
import "../styles/globals.css" 

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
