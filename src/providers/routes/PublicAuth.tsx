import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { getUserAuthData } from '../../store/selectors/getUserAuthData/getUserAuthData';

export const PublicAuth = () => {
  const location = useLocation();
  const isAuth = useAppSelector(getUserAuthData);

  if (isAuth) {
    return <Navigate to="/posts" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
