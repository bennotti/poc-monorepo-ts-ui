import '@app/assets/css/scrollbar.css';
import '@app/assets/css/app.css';

import { AppRoutes } from '@app/app-routes';
import { FullScreenLayout } from '@core/layouts/full-screen.layout';
import { selectCurrentLayout } from '@core/selectors/layout.selector';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { env } from '@core/env';
import { LoadingCentered } from '@core/componentes/loading-centered';
import { AppDispatch } from '../core/store';
import { useEffect, useState } from 'react';
import { useSetInterval } from '@core/hooks/use-set-interval.hook';
import { AnyObject } from '@core/types';
import { notification } from 'antd';
import { NotificacaoDto } from '@core/dtos/notificacao.dto';
import { useIdleTimer } from 'react-idle-timer';

import { useSamplePkg2 } from '@pocs/sample-pkg2';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const openNotificationWithIcon = (args: NotificacaoDto, type?: NotificationType) => {
  if (!type) {
    notification.open({
      message: args.titulo ?? '',
      description: args.conteudo ?? ''
    });
    return;
  }
  notification[type]({
    message: args.titulo ?? '',
    description: args.conteudo ?? ''
  });
};

const App: React.FC = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const isLoading = useSelector(selectIsRestoringAuth);

  useSamplePkg2();


  const currentLayout = useSelector(selectCurrentLayout);
  const [inicializacaoVerificada, setInicializacaoVerificada] = useState<boolean>(false);
  const onIdle = () => {
    // Close Modal Prompt
    // Do some idle action like log out your user
    console.log('onIdle');
  }

  const onActive = (event?: Event) => {
    // Close Modal Prompt
    // Do some active action
    console.log('onActive');
    console.log(event);
  }

  useIdleTimer({ onIdle, onActive, timeout: 10000 });
  
  const dispatch: AppDispatch = useDispatch();

  const renderBrowserContent = () => {
    if (currentLayout === 'application') {
      return (
        <FullScreenLayout>
          <AppRoutes />
        </FullScreenLayout>
      );
    }
    return <AppRoutes />;
  };
  const renderContent = () => {
    // if (isLoading) {
    //   return <LoadingCentered />;
    // }
    if (env.IS_WEB) {
      return <BrowserRouter>{renderBrowserContent()}</BrowserRouter>;
    }
    return <HashRouter>{renderBrowserContent()}</HashRouter>;
  };
  return (
    <div className='App'>
      {renderContent()}
    </div>
  );
};

export default App;
