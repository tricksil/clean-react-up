import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  return <Navigate replace to="/login" />;
};

export default PrivateRoute;
