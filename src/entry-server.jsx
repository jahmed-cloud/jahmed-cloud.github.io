import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Used at build time only (scripts/prerender.js) so the page text is in the HTML
// for search engines and AI crawlers that don't run JavaScript.
export function render() {
  return renderToString(<App />)
}
