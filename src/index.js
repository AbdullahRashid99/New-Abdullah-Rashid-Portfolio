import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Assuming you have a CSS file for global styles
import App from './App'; // Make sure the path to App.js is correct

// The root of your React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Renders the main App component */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
