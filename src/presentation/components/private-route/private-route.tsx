import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ApiContext } from '@/presentation/contexts';

const PrivateRoute: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext);
  return getCurrentAccount()?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate replace to="/login" />
  );
};

export default PrivateRoute;
