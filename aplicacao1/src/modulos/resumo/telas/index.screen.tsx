import { Button, Card, Col, Divider, Dropdown, List, Menu, Modal, PageHeader, Row, Statistic, Table, Tag, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { ReactSampleComponente } from 'poc-ts-react-pkg';

const { Title } = Typography;

export const IndexScreen: FC = () => {
  return (
    <>
      <Row gutter={16} justify='center' align='top' style={{ marginBottom: 10 }} className='site-layout-background'>
        <Col span={24} className='site-layout-background' style={{ paddingBottom: 20, paddingLeft: 30, paddingRight: 30 }}>
          <Title>Olá</Title>
          <ReactSampleComponente />
        </Col>
      </Row>
    </>
  );
};
