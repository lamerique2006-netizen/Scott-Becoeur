import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AppContent() {
  const { user, token } = useAuth();
  const [authMode, setAuthMode] = React.useState('login');

  // Not authenticated
  if (!user || !token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        {authMode === 'signup' ? (
          <Signup 
            onSignupSuccess={() => setAuthMode('loggedIn')}
            onLoginClick={() => setAuthMode('login')}
          />
        ) : (
          <Login 
            onLoginSuccess={() => setAuthMode('loggedIn')}
            onSignupClick={() => setAuthMode('signup')}
          />
        )}
      </div>
    );
  }

  return <Dashboard apiUrl={API_URL} token={token} />;
}

export default function App() {
  return (
    <AuthProvider apiUrl={API_URL}>
      <AppContent />
    </AuthProvider>
  );
}
