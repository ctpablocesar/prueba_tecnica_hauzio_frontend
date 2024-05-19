import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Router } from './router/routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <div className="w-screen h-screen">
        <Router />
      </div>
    </NextUIProvider>
  </React.StrictMode>
)
