import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import CoinContexProvider from './Context/CoinContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CoinContexProvider>
        <App />
      </CoinContexProvider>
    </BrowserRouter>
  </StrictMode>,
)
