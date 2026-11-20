// ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext.jsx';

export default function ProtectedRoute() {
  const { token, isTokenExpired } = useAuth();
  const location = useLocation();

  if (!token || isTokenExpired()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}   