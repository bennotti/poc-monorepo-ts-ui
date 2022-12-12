import { LocalStorageHelper } from '@core/helper/local-storage-helper';
import { FC } from 'react';
import {
  Navigate,
  Outlet,
  RouteProps,
  useSearchParams,
} from 'react-router-dom';

const isAutenticado = (): boolean => {
  const user = LocalStorageHelper.getFromJson('userAutenticado');
  return !!user;
};

const PublicRoutes: FC<RouteProps> = () => {
  const [searchParams] = useSearchParams();
  const isAutenticadoResponse = isAutenticado();
  let returnUrl = searchParams.get('returnUrl');
  if (isAutenticadoResponse && returnUrl) {
    return <Navigate to={returnUrl} />
  }
  return <Outlet />;
};

export default PublicRoutes;
