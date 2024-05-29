import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const user = localStorage.getItem('user')
  return user ? <Component {...rest} /> : <Navigate to="/admin/sign-in" replace />;
};

export default PrivateRoute;