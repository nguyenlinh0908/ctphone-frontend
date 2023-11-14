'use client';

import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import { useCustomerTotal, useOrderRevenue, useOrderTotal } from './services/apis';

export default function Dashboard() {
  const formatter = (value: number) => <CountUp end={value} separator="," />;
  const { data: customerTotalData } = useCustomerTotal();
  const { data: orderTotalData } = useOrderTotal();
  const { data: orderRevenueData } = useOrderRevenue();

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title="Customer"
            value={customerTotalData?.data.quantity}
            formatter={() => formatter(customerTotalData?.data.quantity || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Balance (VND)"
            value={orderRevenueData?.data.amount}
            precision={2}
            formatter={() => formatter(orderRevenueData?.data.amount || 0)}
          />
        </Col>
      </Row>
    </>
  );
}
