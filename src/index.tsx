import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './pdf/fonts/Georgia-normal'
import './pdf/fonts/Georgia-bold'
import './pdf/fonts/Georgia-italic'
import './pdf/fonts/Georgia-bolditalic'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
