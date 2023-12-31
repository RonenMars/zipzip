import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

// RTL Support
document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
