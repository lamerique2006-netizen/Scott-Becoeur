import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Landing from './components/Landing';
import DemoMode from './components/DemoMode';
import Dashboard from './components/Dashboard';
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
  const [showLanding, setShowLanding] = React.useState(
    localStorage.getItem('showLanding') !== 'false'
  );

  // Demo mode (no auth required)
  if (demoMode) {
    return (
      <DemoMode 
        onSignupClick={() => {
          setDemoMode(false);
          setShowLanding(false);
          localStorage.removeItem('demoMode');
          localStorage.setItem('showLanding', 'false');
        }}
        apiUrl={API_URL}
      />
    );
  }

  // Landing page (no auth required)
  if (showLanding && (!user || !token)) {
    return (
      <Landing
        onTryDemo={() => {
          setDemoMode(true);
          localStorage.setItem('demoMode', 'true');
        }}
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
            setShowLanding(true);
            localStorage.setItem('showLanding', 'true');
          }}
          className="fixed bottom-6 right-6 px-6 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600 transition text-sm border border-slate-600"
        >
          ← Back to Landing
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
