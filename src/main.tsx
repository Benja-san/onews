import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("L'élément #root est introuvable.");
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
