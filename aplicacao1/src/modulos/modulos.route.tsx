import { IReactRouterDinamico } from '@core/types';
import { Navigate } from 'react-router-dom';

import { resumoRouteModule } from './resumo/resumo.route';

const rotasModulos: Array<IReactRouterDinamico> = [
  ...resumoRouteModule,
  {
    path: '/',
    element: <Navigate to={'/resumo'} />,
  },
];

export { rotasModulos };
