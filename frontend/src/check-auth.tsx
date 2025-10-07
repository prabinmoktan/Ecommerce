import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './admin/redux/store';




interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({  requiredRole }) => {
  const location = useLocation();
  const { isLogged:isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (user?.role !== requiredRole) {
    // Redirect users with insufficient roles to a "Not Authorized" page or homepage
    return <Navigate to="/" replace />;
  }

  // Render the protected component
  return <Outlet/>;
};

export default ProtectedRoute;
