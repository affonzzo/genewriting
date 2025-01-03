import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TempoDevtools } from 'tempo-devtools';
import App from './App.tsx';
import './index.css';

// Initialize Tempo Devtools
TempoDevtools.init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
