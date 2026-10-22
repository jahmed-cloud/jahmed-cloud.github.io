import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// The built HTML is pre-rendered with the default profile. Docker mode injects
// window.ENV overrides, which change the markup, so render fresh instead of hydrating.
const hasEnvOverrides = Object.keys(window.ENV || {}).length > 0

if (container.hasChildNodes() && !hasEnvOverrides) {
  ReactDOM.hydrateRoot(container, app)
} else {
  ReactDOM.createRoot(container).render(app)
}
