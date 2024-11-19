import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { getUserAuthData } from '../../store/selectors/getUserAuthData/getUserAuthData';
import { UserRole } from '../../store/types';
import { useMemo } from 'react';

interface RequireAuthProps {
  roles?: UserRole[];
}

const RequireAuth = ({ roles }: RequireAuthProps) => {
  const location = useLocation();
  const isAuth = useAppSelector(getUserAuthData);

  const userRoles = isAuth?.roles;

  const hasRequiredRoles: boolean = useMemo(() => {
    if (!roles) {
      return true;
    }

    return roles.some((requredRole) => userRoles?.includes(requredRole));
  }, [roles, userRoles]);

  if (!isAuth) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    // доступ запрещен
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
export default RequireAuth;
