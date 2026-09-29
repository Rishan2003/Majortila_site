import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ContentProvider } from './data/ContentContext.jsx'
import './dashboard.css'
import './styles.css'
import './fonts.css'
import './premium.css'
import './mobile.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContentProvider><App /></ContentProvider>
  </React.StrictMode>
)
