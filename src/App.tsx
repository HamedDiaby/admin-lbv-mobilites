import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gabon-green flex flex-col items-center justify-center">
      <header className="p-6 bg-white shadow-md rounded-lg border-4 border-gabon-yellow">
        <img src={logo} className="h-20 w-20 animate-spin mb-4" alt="logo" />
        <p className="text-gabon-blue font-bold mb-4">
          Edit <code className="bg-gabon-yellow p-1 rounded text-gabon-green">src/App.tsx</code> and save to reload.
        </p>
        <a
          className="text-gabon-blue hover:text-gabon-green underline font-bold"
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
