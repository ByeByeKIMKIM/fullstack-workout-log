import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//createRoot: creates an anchor "root" where App will live
//getElementById: chooses where the anchor will live
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
