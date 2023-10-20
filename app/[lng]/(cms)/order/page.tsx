'use client';

import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DropboxOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { IOrder, OrderStatus } from '@interfaces/order/order.interface';
import { formatPrice, timestampMongoToDate } from '@utils/string';
import { Button, Col, Modal, Popconfirm, Row, Space, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useOrderCms, orderStatusSteps, useConfirmOrder } from './sevices/apis';
import * as _ from 'lodash';
import modal from 'antd/es/modal';

export default function CmsOrderPage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const {
    data: confirmOrder,
    mutateAsync: confirmOrderMutateAsync,
    isSuccess: confirmOrderSuccess,
  } = useConfirmOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextOrderStatusSteps = [
    <ShoppingCartOutlined />,
    <ClockCircleOutlined />,
    <DropboxOutlined />,
    <CarOutlined />,
    <CheckCircleOutlined />,
    <CheckCircleOutlined />,
  ];
  const orderStatusTxt = ['', t('pending'), t('prepares_package'), t('in_transport'), t('success'), t('success')];
  const orderStatusColors = [
    '',
    'text-yellow-600',
    'text-cyan-600',
    'text-blue-600',
    'text-green-600',
    'text-green-600',
  ];
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
      render: (text, record, index) => {
        const orderStatusStepIdx = _.indexOf(orderStatusSteps, record.status);
        return (
          <span className={`text-bold ${orderStatusColors[orderStatusStepIdx]}`}>
            {orderStatusTxt[orderStatusStepIdx]}
          </span>
        );
      },
    },
    {
      title: t('action'),
      key: 'action',
      align: 'center',
      render: (text, record, idx) => {
        const orderStatusStepIdx = _.indexOf(orderStatusSteps, record.status);
        let nextOrderStatusStep: OrderStatus = OrderStatus.PENDING;
        if (orderStatusStepIdx == orderStatusSteps.length) {
          nextOrderStatusStep = orderStatusSteps[orderStatusStepIdx];
        } else {
          nextOrderStatusStep = orderStatusSteps[orderStatusStepIdx + 1];
        }

        return (
          <>
            <Space size={'small'}>
              <Button onClick={() => handleViewDetail(record._id)} type="primary" size="large" icon={<EyeOutlined />} />
              <Popconfirm
                title={t('change_order_status')}
                description={t('do_want_change_order_status')}
                onConfirm={() => handleChangeStatus(record._id, nextOrderStatusStep)}
                onCancel={() => {}}
                okText={t('yes')}
                cancelText={t('no')}
                disabled={orderStatusStepIdx >= orderStatusSteps.length - 1}
              >
                <Button
                  type="primary"
                  className="bg-green-600 text-white hover:!text-white hover:!bg-green-500"
                  size="large"
                  icon={nextOrderStatusSteps[orderStatusStepIdx + 1]}
                />
              </Popconfirm>

              {orderStatusStepIdx <= 1 && (
                <Button onClick={() => {}} type="primary" danger size="large" icon={<DeleteOutlined />} />
              )}
            </Space>
          </>
        );
      },
    },
  ];

  const { data: orders, isSuccess } = useOrderCms();

  useEffect(() => {}, [isSuccess]);

  const handleViewDetail = (id: string) => {
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeStatus = (orderId: string, nextOrderStatus: OrderStatus) => {
    confirmOrderMutateAsync({ orderId, status: nextOrderStatus })
      .then(() => message.success(t('update_order_status_success')))
      .catch(() => message.error('update_order_status_fail'));
  };

  return (
    <>
      <Modal title={t('order_info')} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Modal>

      <Table columns={columns} dataSource={orders?.data} />
    </>
  );
}
