import React from 'react';
import { Profile } from './profile';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Test component pour vérifier la page Profile
const TestProfile = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Profile />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default TestProfile;
