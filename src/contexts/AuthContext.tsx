import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  department?: string;
  lastLogin?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, rememberMe: boolean) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const userEmail = localStorage.getItem('userEmail');
      
      if (authStatus === 'true' && userEmail) {
        setIsAuthenticated(true);
        setUser({ 
          email: userEmail,
          firstName: "Admin",
          lastName: "LBV",
          role: "Administrateur",
          department: "Administration",
          lastLogin: new Date().toLocaleString('fr-FR')
        });
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (email: string, rememberMe: boolean) => {
    setIsAuthenticated(true);
    setUser({ 
      email,
      firstName: "Admin",
      lastName: "LBV",
      role: "Administrateur",
      department: "Administration",
      lastLogin: new Date().toLocaleString('fr-FR')
    });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rememberMe');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      // Mise à jour du localStorage si l'email change
      if (userData.email) {
        localStorage.setItem('userEmail', userData.email);
      }
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    updateUser,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
