import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Icon } from './components/icon';
import { ColorsEnum } from './utils/enums/colorsEnum';

function App() {
  return (
    <div className="min-h-screen bg-green flex flex-col items-center justify-center">
      <header className="p-6 bg-white shadow-md rounded-lg border-4 border-yellow">
        <img src={logo} className="h-20 w-20 animate-spin mb-4" alt="logo" />
        <p className="text-blue font-bold mb-4">
          Edit <code className="bg-yellow p-1 rounded text-green">src/App.tsx</code> and save to reload.
        </p>
        
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex flex-col items-center">
            <Icon name="Activity" size={24} color={ColorsEnum.BLUE} />
            <p className="text-sm mt-2">Activity</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Icon name="AlertCircle" size={24} color={ColorsEnum.ERROR} />
            <p className="text-sm mt-2">Alert</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Icon name="Check" size={24} color={ColorsEnum.SUCCESS} />
            <p className="text-sm mt-2">Check</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Icon name="Settings" size={24} color={ColorsEnum.SECONDARY} strokeWidth={1.5} />
            <p className="text-sm mt-2">Settings</p>
          </div>
        </div>
        
        <a
          className="text-blue hover:text-green underline font-bold flex items-center"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <Icon name="ExternalLink" className="ml-2" size={18} color={ColorsEnum.BLUE} />
        </a>
      </header>
    </div>
  );
}

export default App;
