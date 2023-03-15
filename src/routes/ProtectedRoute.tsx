import CircularProgress from '@/components/CircularProgress/CircularProgress';
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

function ProtectedRoute({
  isLoading,
  hasRefresh,
  accessToken,
}: {
  isLoading: boolean;
  hasRefresh: string | null;
  accessToken: string | null;
}) {
  return (
    <>
      {isLoading ? (
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            paddingTop: '100px',
          }}
        >
          <CircularProgress />
        </div>
      ) : hasRefresh || accessToken ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}

export default ProtectedRoute;
