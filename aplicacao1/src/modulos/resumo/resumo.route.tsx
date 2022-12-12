import PublicRoutes from '@core/componentes/routes/public.routes';
import { IReactRouterDinamico } from '@core/types';
import { IndexScreen } from './telas/index.screen';

const resumoRouteModule: Array<IReactRouterDinamico> = [
    {
        path: '/resumo',
        element: <PublicRoutes />,
        childrens: [
          {
            path: '',
            element: <IndexScreen />,
          },
        ],
    },
];

export { resumoRouteModule };
