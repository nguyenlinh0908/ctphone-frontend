'use client'

import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';

export default function Dashboard() {
  const formatter = (value: number) => <CountUp end={value} separator="," />;

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Customer" value={100} formatter={() => formatter(100)} />
        </Col>
        <Col span={12}>
          <Statistic title="Balance (VND)" value={1200000} precision={2} formatter={() => formatter(1200000)} />
        </Col>
      </Row>
    </>
  );
}
