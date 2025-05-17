import React from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Bienvenido a Hub de Seguros</h1>
      <p style={{ color: '#666' }}>Si ves esto, la aplicación está funcionando correctamente</p>
    </div>
  )
}

const root = document.getElementById('root')
if (!root) throw new Error('No se encontró el elemento root')

const reactRoot = createRoot(root)
reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
