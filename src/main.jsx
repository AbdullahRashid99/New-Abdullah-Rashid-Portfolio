import React from 'react';
import ReactDOM from 'react-dom/client';
// الآن نقوم بالاستيراد من ملف App.jsx
import App from './App.jsx';
import './index.css';

// هذا هو نقطة الدخول لتطبيق React الخاص بك.
// يقوم بتقديم المكون الرئيسي App في div الذي يحمل id "root" في ملف index.html.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
