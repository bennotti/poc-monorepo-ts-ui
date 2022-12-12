import { Rodape } from '@core/componentes/rodape.component';
import { BackTop } from 'antd';
import { Layout } from 'antd';
import { FC, ReactNode } from 'react';
const { Content } = Layout;

export interface FullScreenLayoutProps {
  children: ReactNode;
}

export const FullScreenLayout: FC<FullScreenLayoutProps> = ({ children }) => {
  return (
    <Layout
      style={{ minHeight: '100vh', maxWidth: '100vw', overflowY: 'hidden' }}
    >
      <Layout className='fullScreenLayout'>
        <Layout className='site-layout'>
          <Content
            style={{
              margin: 10,
              paddingTop: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {/* <div className='site-layout-background'>{children}</div> */}
            {children}
          </Content>
          <BackTop />
          <Rodape />
        </Layout>
      </Layout>
    </Layout>
  );
};
