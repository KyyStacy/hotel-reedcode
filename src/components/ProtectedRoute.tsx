import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps extends RouteProps {
  allowedRoles?: ('user' | 'admin' | 'receptionist')[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles, 
  children, 
  ...rest 
}) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }): React.ReactElement => {
        if (!isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          );
        }

        if (allowedRoles && user && !allowedRoles.includes(user.role)) {
          return <Redirect to="/home" />;
        }

        return <>{children}</>;
      }}
    />
  );
};

export default ProtectedRoute;
