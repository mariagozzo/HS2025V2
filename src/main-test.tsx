import React from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test App</h1>
      <p>Si ves esto, la aplicación está funcionando correctamente</p>
    </div>
  )
}

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
