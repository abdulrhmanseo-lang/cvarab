
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plan } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPlan?: Plan;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredPlan }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen bg-dark flex items-center justify-center text-white">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPlan) {
    // Check plan hierarchy logic here if needed
    // For now, specifically for guaranteed page
    if (requiredPlan === 'guaranteed' && user.plan !== 'guaranteed') {
       return <Navigate to="/job-guarantee" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
