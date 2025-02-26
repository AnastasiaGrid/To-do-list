import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { HashRouter } from 'react-router-dom';
import App from './components/app/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
