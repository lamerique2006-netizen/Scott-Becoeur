import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import DemoMode from './components/DemoMode';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AppContent() {
  const { user, token } = useAuth();
  const [authMode, setAuthMode] = React.useState('login');
  const [demoMode, setDemoMode] = React.useState(
    localStorage.getItem('demoMode') === 'true'
  );

  // Demo mode (no auth required)
  if (demoMode) {
    return (
      <DemoMode 
        onSignupClick={() => {
          setDemoMode(false);
          localStorage.removeItem('demoMode');
        }}
        apiUrl={API_URL}
      />
    );
  }

  // Not authenticated
  if (!user || !token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative">
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
        <button
          onClick={() => {
            setDemoMode(true);
            localStorage.setItem('demoMode', 'true');
          }}
          className="fixed bottom-6 right-6 px-6 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600 transition text-sm border border-slate-600"
        >
          ← Try Demo
        </button>
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
