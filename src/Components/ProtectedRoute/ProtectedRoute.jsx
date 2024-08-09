import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/Context';

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  if (user?.role !== 'administrador') {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
