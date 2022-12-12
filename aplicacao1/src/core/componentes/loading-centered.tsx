import { SmileOutlined } from '@ant-design/icons';
import { Col, Layout, Result, Row, Space, Spin } from 'antd';

export const LoadingCentered: React.FC = () => {
  return (
    <div className={'centered'}>
      <Layout className='fullScreenLayout'>
        <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
          <Col span={24}>
            <Spin tip='carregando...'>
              <Space/>
              {/* <Result
                icon={<SmileOutlined />}
                title='Great, we have done all the operations!'
              /> */}
            </Spin>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};
