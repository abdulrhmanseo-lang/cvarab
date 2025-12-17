
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import Templates from './pages/Templates';
import Auth from './pages/Auth';
import JobGuarantee from './pages/JobGuarantee';
import JobsTracking from './pages/JobsTracking';
import Dashboard from './pages/Dashboard';
import PaymentCallback from './pages/PaymentCallback';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/builder" element={<PageTransition><Builder /></PageTransition>} />
        <Route path="/preview" element={<PageTransition><Preview /></PageTransition>} />
        <Route path="/templates" element={<PageTransition><Templates /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/job-guarantee" element={<PageTransition><JobGuarantee /></PageTransition>} />
        <Route path="/payment/callback" element={<PageTransition><PaymentCallback /></PageTransition>} />
        
        <Route path="/dashboard" element={
            <PageTransition>
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            </PageTransition>
        } />
        
        <Route path="/dashboard/jobs-tracking" element={
            <PageTransition>
                <ProtectedRoute requiredPlan="guaranteed">
                    <JobsTracking />
                </ProtectedRoute>
            </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
        <ToastProvider>
            <Router>
            <Layout>
                <AnimatedRoutes />
            </Layout>
            </Router>
        </ToastProvider>
    </AuthProvider>
  );
};

export default App;
