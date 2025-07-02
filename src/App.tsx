import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="p-6 bg-white shadow-md rounded-lg">
        <img src={logo} className="h-20 w-20 animate-spin mb-4" alt="logo" />
        <p className="text-gray-700 mb-4">
          Edit <code className="bg-gray-100 p-1 rounded">src/App.tsx</code> and save to reload.
        </p>
        <a
          className="text-blue-600 hover:text-blue-800 underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
