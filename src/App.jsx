import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import AppContent from './AppContent';
import { trackVisitor } from './utils/visitorTracking';

function App() {
  useEffect(() => {
    // Track visitor on app load
    trackVisitor();
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
