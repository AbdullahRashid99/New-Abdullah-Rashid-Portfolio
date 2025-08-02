import React from 'react';
import ReactDOM from 'react-dom/client';
// قم بالتأكد من أن الاستيراد يشير إلى ملف App.js
import App from './App.js'; 
import './index.css';

// This is the entry point for your React application.
// It renders the main App component into the "root" div in index.html.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
