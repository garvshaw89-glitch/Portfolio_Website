import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Gracefully handle benign browser ResizeObserver notification warnings
window.addEventListener('error', (event) => {
  if (
    event.message?.includes('ResizeObserver loop completed with undelivered notifications') ||
    event.message?.includes('ResizeObserver loop limit exceeded')
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

