import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Hello, World!</h1>
      <p className="text-lg mb-6">Your React application is now running correctly.</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount((count) => count - 1)}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition-colors duration-300"
        >
          Decrement
        </button>
        <p className="text-3xl font-mono">{count}</p>
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition-colors duration-300"
        >
          Increment
        </button>
      </div>
    </div>
  );
}

export default App;
