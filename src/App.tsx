import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './main.tsx'
import './index.css'

console.log('App version: 1.0.3 - Vercel Fix Deployment');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)