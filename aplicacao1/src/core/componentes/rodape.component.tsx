import { env } from '@core/env';
import { Footer } from 'antd/lib/layout/layout';
import { FC } from 'react';

export const Rodape: FC = () => {
  return <Footer style={{ textAlign: 'center' }}>{env.TITLE} - {env.VERSION}</Footer>;
};
