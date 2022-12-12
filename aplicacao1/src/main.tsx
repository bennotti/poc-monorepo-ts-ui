import 'antd/dist/antd.css';
import '@app/assets/css/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import App from '@app/app-main';
import { env } from '@core/env';
import store from '@core/store';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import reportWebVitals from './report-web-vitals';

async function checkAndStartMock() {
  if (env.IS_MOCK && env.IS_WEB) {
    const { createWorker } = await import('@core/mock/browser');
    const { handlers } = await import('@modulos/handlers');
    const worker = createWorker(handlers);
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
  return Promise.resolve();
}

async function start() {
  await checkAndStartMock();
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <Provider store={store}>
      <ConfigProvider locale={ptBR}>
        <App />
      </ConfigProvider>
    </Provider>
  );
}

start();

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
