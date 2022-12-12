import { LocalStorageHelper } from '@core/helper/local-storage-helper';
import { FC, useEffect } from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';

const isTutorial = (): boolean => {
  const tutorial = LocalStorageHelper.getFromJson('tutorialExecutado');
  return !!tutorial;
};

const isAutenticado = (): boolean => {
  const user = LocalStorageHelper.getFromJson('userAutenticado');
  return !!user;
};

const ProtectedRoutes: FC<RouteProps> = () => {
  const isAutenticadoResponse = isAutenticado();
  const isTutorialResponse = isTutorial();

  // useEffect(() => {
  //   window.internal.events.send('selecionar-pasta');
  // }, []);

  // verificar se viu o tutorial
  if (!isTutorialResponse) {
    return (<Navigate
      to={`/tutorial`}
    />);
  }

  return isAutenticadoResponse ? (
    <Outlet />
  ) : (
    <Navigate
      to={`/seguranca?returnUrl=${window.location.pathname}`}
    />
  );
};

export default ProtectedRoutes;
