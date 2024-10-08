import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';
import { useProfileStore } from '../store/useProfileStore';
import AppLoader from './AppLoader';

type ProtectedProp = {
  children: React.ReactNode;
};

const Protected = ({ children }: ProtectedProp) => {
  const { user } = useAuthStore();
  const { profile, fetchProfile, status: profileStatus, loading } = useProfileStore();
  const location = useLocation();

  useEffect(() => {
    const loadProfile = async () => {
      if (profileStatus === 'idle') {
        await fetchProfile();
      }
    };

    loadProfile();
  }, [profileStatus, fetchProfile]);

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace={true} />;
  }

  if (loading || profileStatus === 'idle') {
    return <AppLoader/>
  }

  if (!profile && profileStatus === 'success' && location.pathname !== '/profile') {
    return <Navigate to="/profile" replace={true} />;
  }

  return <>{children}</>;
};

export default Protected;
