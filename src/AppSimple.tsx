import React from 'react'
import { FC } from 'react'

const App: FC = () => {
  const containerStyle: React.CSSProperties = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh'
  }

  const headingStyle: React.CSSProperties = {
    color: '#333'
  }

  const paragraphStyle: React.CSSProperties = {
    color: '#666'
  }

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Bienvenido a Hub de Seguros</h1>
      <p style={paragraphStyle}>Si ves esto, la aplicación está funcionando correctamente</p>
    </div>
  )
}

export default App
