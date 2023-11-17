'use client';

import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import {
  useCostByMonths,
  useCustomerTotal,
  useOrderRevenue,
  useOrderTotal,
  useRevenueByMonths,
  useWarehouseReceiptCost,
} from './services/apis';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const formatter = (value: number) => <CountUp end={value} separator="," />;
  const { data: customerTotalData } = useCustomerTotal();
  const { data: orderTotalData } = useOrderTotal();
  const { data: orderRevenueData } = useOrderRevenue();
  const { data: warehouseReceiptCostData } = useWarehouseReceiptCost();
  const { data: revenueByMonthsData } = useRevenueByMonths();
  const { data: costByMonthsData } = useCostByMonths();

  const labels = [
    'T1',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'T8',
    'T9',
    'T10',
    'T11',
    'T12',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Chi phí',
        data: labels.map((item, idx) => {
          const mouth = 1 + idx;
          const target = costByMonthsData?.data.find((i) => i.month == mouth);
          if (!target) return 0;
          return target.amount;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Doanh thu',
        data: labels.map((item, idx) => {
          const month = 1 + idx;
          const target = revenueByMonthsData?.data.find((i) => i.month == month);
          if (!target) return 0;
          return target.amount;
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
    <h3>Tổng quan</h3>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title="Khách hàng"
            value={customerTotalData?.data?.quantity || 0}
            formatter={() => formatter(customerTotalData?.data?.quantity || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Lợi nhuận (VND)"
            value={(orderRevenueData?.data?.amount || 0) - (warehouseReceiptCostData?.data?.amount || 0)}
            precision={2}
            formatter={() =>
              formatter((orderRevenueData?.data?.amount || 0) - (warehouseReceiptCostData?.data?.amount || 0))
            }
          />
        </Col>
      </Row>

<h3>Chi phí và doanh thu theo tháng</h3>
      <Row>
        <Col span={15}>
          <Bar data={data} />
        </Col>
        <Col span={24 - 15}></Col>
      </Row>
    </>
  );
}
