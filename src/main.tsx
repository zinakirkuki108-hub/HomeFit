import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

(window as unknown as { __HOMEFIT_LOADED__: boolean }).__HOMEFIT_LOADED__ = true;

createRoot(document.getElementById('root')!).render(<App />);
