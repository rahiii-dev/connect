import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';
import { useProfileStore } from '../store/useProfileStore';

type ProtectedProp = {
  children: React.ReactNode;
};

const Protected = ({ children }: ProtectedProp) => {
  const { user } = useAuthStore();
  const { profile, fetchProfile, status: profileStatus } = useProfileStore();
  const location = useLocation();

  useEffect(() => {
    if (profileStatus === 'idle') {
      fetchProfile();
    }
  }, [profileStatus, fetchProfile, location.pathname]);

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (profileStatus === 'success' && !profile && location.pathname !== '/profile') {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

export default Protected;
