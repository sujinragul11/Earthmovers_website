import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './componants/ui/LoadingSpinner';
import NavigationLoader from './componants/ui/NavigationLoader';

// Public pages (lazy loaded)
const Home = lazy(() => import('./pages/Home'));

// HomeWrapper component to show loading spinner for 3 seconds on homepage
const HomeWrapper = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <Home />;
};
const About = lazy(() => import('./pages/About'));
const Fleet = lazy(() => import('./pages/Fleet'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

// Admin pages (lazy loaded)
const AdminLogin = lazy(() => import('./admin/pages/Login'));
const AdminLayout = lazy(() => import('./admin/componants/Layout/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/pages/Dashboard'));
const AdminContacts = lazy(() => import('./admin/pages/Contacts'));
const AdminVisitors = lazy(() => import('./admin/pages/Visitors'));
const AdminMessages = lazy(() => import('./admin/pages/Messages'));
const AdminEquipment = lazy(() => import('./admin/pages/Equipment'));
const AdminAnalytics = lazy(() => import('./admin/pages/Analytics'));
const AdminSettings = lazy(() => import('./admin/pages/Settings'));

const AppContent = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if it's the first visit
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, isFirstVisit ? 500 : 500); // 3 seconds for first visit, 1 second otherwise

    return () => clearTimeout(timer);
  }, [location.pathname, isFirstVisit]);

  return (
    <>
      {isNavigating && location.pathname === "/" && <NavigationLoader />}
      <Suspense fallback={null}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/about" element={<About />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="visitors" element={<AdminVisitors />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="equipment" element={<AdminEquipment />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl mb-6">Page not found</p>
                <a href="/" className="btn-primary">Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppContent;
