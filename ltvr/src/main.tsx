import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../styles/index.css'

// Add error boundary
if (process.env.NODE_ENV === 'development') {
  window.addEventListener('error', (event) => {
    // Prevent Chrome extension errors from showing
    if (event.filename?.startsWith('chrome-extension://')) {
      event.preventDefault();
      return;
    }
  });

  // Suppress manifest.json 404 warnings
  const originalFetch = window.fetch;
  window.fetch = function(input, init) {
    if (input.toString().includes('manifest.json')) {
      return Promise.resolve(new Response(JSON.stringify({
        name: 'VenturesRoom',
        short_name: 'VenturesRoom',
        start_url: '/',
        display: 'standalone'
      })));
    }
    return originalFetch.call(this, input, init);
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
