'use client';

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { IOrderItem } from '@interfaces/order/order-item.interface';
import { IOrder, IOrderFilter, OrderStatus } from '@interfaces/order/order.interface';
import { orderStatusSteps } from '@lng/(cms)/order/sevices/apis';
import { formatPrice, timestampMongoToDate } from '@utils/string';
import { Button, Modal, Popconfirm, Space, Tabs, TabsProps } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import * as _ from 'lodash';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useCancelOrder, useOrderDetail, usePurchaseHistory } from './services/apis';

export default function PurchaseHistoryPage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const [viewOrderId, setViewOrderId] = useState<string>('');
  const { data: orderDetail } = useOrderDetail(viewOrderId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: cancelOrderMutate } = useCancelOrder();
  const [purchaseHistoryFilter, setPurchaseHistoryFilter] = useState<IOrderFilter>({});
  const { data: purchaseHistory } = usePurchaseHistory(purchaseHistoryFilter);

  const orderStatusTxt = ['', t('pending'), t('prepares_package'), t('in_transport'), t('success'), t('cancel')];
  const orderStatusColors = ['', 'text-yellow-600', 'text-cyan-600', 'text-blue-600', 'text-green-600', 'text-red-600'];

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
            <Space size={'small'} align="start">
              <Button onClick={() => handleViewDetail(record._id)} type="primary" size="large" icon={<EyeOutlined />} />
              {orderStatusStepIdx <= 1 && (
                <Popconfirm
                  placement="right"
                  onConfirm={() => handleCancelOrder(record._id)}
                  okText="Yes"
                  cancelText="No"
                  title={t('do_want_cancel_order')}
                >
                  <Button type="primary" danger size="large" icon={<DeleteOutlined />} />
                </Popconfirm>
              )}
            </Space>
          </>
        );
      },
    },
  ];

  const columnsOrderDetail: ColumnsType<IOrderItem> = [
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
      render: (text, record, index) => record.productId.name,
    },
    {
      title: t('quantity'),
      key: 'totalQuantity',
      render: (text, record, index) => record.quantity,
      width: '10%',
    },
    {
      title: t('amount'),
      key: 'totalAmount',
      width: '10%',
      render: (text, record, index) => formatPrice(record.amount.toString()),
    },
  ];

  const itemsTab: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tất cả',
      children: <Table columns={columns} dataSource={purchaseHistory?.data} />,
    },
    {
      key: '2',
      label: 'Chờ xác nhận',
      children: <Table columns={columns} dataSource={purchaseHistory?.data} />,
    },
    {
      key: '3',
      label: 'Đang chuẩn bị hàng',
      children: <Table columns={columns} dataSource={purchaseHistory?.data} />,
    },
    {
      key: '4',
      label: 'Đang giao hàng',
      children: <Table columns={columns} dataSource={purchaseHistory?.data} />,
    },
    {
      key: '5',
      label: 'Đã nhận hàng',
      children: <Table columns={columns} dataSource={purchaseHistory?.data} />,
    },
    {
      key: '6',
      label: 'Đơn bị hủy',
      children: <Table columns={columns} dataSource={purchaseHistory?.data} />,
    },
  ];
  const handleCancelOrder = (orderId: string) => {
    cancelOrderMutate(orderId);
  };

  const handleViewDetail = (id: string) => {
    setViewOrderId(id);
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

  return (
    <>
      <Modal title={t('order_info')} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <Table columns={columnsOrderDetail} dataSource={orderDetail?.data} />
      </Modal>
      <Tabs
        className="mt-3"
        tabBarGutter={12}
        tabBarStyle={{ width: '100%' }}
        type="card"
        size="large"
        defaultActiveKey="1"
        items={itemsTab}
        onChange={(activeKey: string) => {
          let orderStatus: OrderStatus | string = '';
          switch (activeKey) {
            case '2':
              orderStatus = OrderStatus.PENDING;
              break;
            case '3':
              orderStatus = OrderStatus.PREPARES_PACKAGE;
              break;
            case '4':
              orderStatus = OrderStatus.IN_TRANSPORT;
              break;

            case '5':
              orderStatus = OrderStatus.SUCCESS;
              break;
            case '6':
              orderStatus = OrderStatus.CANCEL;
              break;
            default:
              orderStatus = '';
          }
          setPurchaseHistoryFilter({ status: orderStatus });
        }}
      />
    </>
  );
}
