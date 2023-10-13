'use client';

import { CheckCircleOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { IOrder, OrderStatus } from '@interfaces/order/order.interface';
import { formatPrice, timestampMongoToDate } from '@utils/string';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useOrderCms } from './sevices/apis';

export default function CmsOrderPage() {
  const { lng } = useParams();

  const { t } = useTranslation(lng);

  const columns: ColumnsType<IOrder> = [
    {
      title: '#',
      key: 'index',
      width: '5%',
      render: (text, record, index) => ++index,
    },
    {
      title: t('code'),
      key: 'code',
      width: '20%',
      render: (text, record, index) => record.code,
    },
    {
      title: t('quantity'),
      key: 'totalQuantity',
      render: (text, record, index) => record.totalQuantity,
      width: '10%',
    },
    {
      title: t('amount'),
      key: 'totalAmount',
      width: '10%',
      render: (text, record, index) => formatPrice(record.totalAmountAfterDiscount.toString()),
    },
    {
      title: t('order_date'),
      key: 'createdAt',
      width: '20%',
      render: (text, record, index) => timestampMongoToDate(String(record?.createdAt) || '', 'DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: t('status'),
      key: 'status',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <span className={`text-bold ${record.status == OrderStatus.PENDING ? 'text-yellow-600' : ''}`}>
          {record.status}
        </span>
      ),
    },
    {
      title: t('action'),
      key: 'action',
      align: 'center',
      render: (text, record, idx) => {
        return (
          <>
            <Space size={'small'}>
              <Button onClick={() => handleViewDetail(record._id)} type="primary" size="large" icon={<EyeOutlined />} />
              <Button
                type="primary"
                className="bg-green-600 text-white hover:!text-white hover:!bg-green-500"
                size="large"
                icon={<CheckCircleOutlined />}
              />
              <Button onClick={() => {}} type="primary" danger size="large" icon={<DeleteOutlined />} />
            </Space>
          </>
        );
      },
    },
  ];

  const { data: orders, isSuccess } = useOrderCms();

  useEffect(() => {}, [isSuccess]);

  const handleViewDetail = (id: string) => {};

  const handleChangeStatus = (id: string) => {};

  return (
    <>
      <Table columns={columns} dataSource={orders?.data} />
    </>
  );
}
