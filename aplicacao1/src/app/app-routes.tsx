import { ErrorScreen } from '@core/telas/error.screen';
import { NotFoundRouteScreen } from '@core/telas/not-found-route.screen';
import { IReactRouterDinamico } from '@core/types';
import { rotasModulos } from '@modulos/modulos.route';
import { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

/*const About = React.lazy(() => import("./pages/About"));
const Dashboard = React.lazy(() => import("./pages/Dashboard")); */

export const AppRoutes: FC = () => {
  const renderRotas = (
    rotas: Array<IReactRouterDinamico> | undefined
  ): Array<ReactElement> | undefined => {
    if (!rotas || (rotas && !rotas.length)) {
      return undefined;
    }
    const response: Array<ReactElement> = [];
    for (let i = 0; i < rotas.length; i++) {
      const rota = rotas[i];
      response.push(
        <Route path={rota.path} element={rota.element} key={`route-${i}`}>
          {renderRotas(rota.childrens)}
        </Route>
      );
    }

    return response;
  };
  return (
    <Routes>
      {renderRotas([...rotasModulos])}

      <Route path='/erro' element={<ErrorScreen />} />
      <Route path='*' element={<NotFoundRouteScreen />} />
    </Routes>
  );
};
