'use client';

import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DropboxOutlined,
  EyeOutlined,
  PrinterOutlined,
  ShoppingCartOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { IOrderItem } from '@interfaces/order/order-item.interface';
import { IOrder, IOrderFilter, OrderStatus } from '@interfaces/order/order.interface';
import { useOrderDetail } from '@lng/(public)/purchase_history/services/apis';
import { formatPrice, timestampMongoToDate } from '@utils/string';
import {
  Button,
  Col,
  Descriptions,
  DescriptionsProps,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  message,
} from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import * as _ from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  orderStatusSteps,
  useConfirmOrder,
  useCustomerInfo,
  useOrderCms,
  useOrderInfo,
  useOrders,
  useStaffInfo,
} from './sevices/apis';

export default function CmsOrderPage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const router = useRouter();
  const {
    data: confirmOrder,
    mutateAsync: confirmOrderMutateAsync,
    isSuccess: confirmOrderSuccess,
  } = useConfirmOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewOrderId, setViewOrderId] = useState('');
  const { data: orderDetail } = useOrderDetail(viewOrderId);
  const { data: orderInfo } = useOrderInfo(viewOrderId);
  const { data: ownerOrderInfo } = useCustomerInfo(orderInfo?.data?.ownerId?.userId || '');
  const { data: merchandiserOrderInfo } = useStaffInfo(orderInfo?.data?.merchandiserId?.userId || '');
  const [orderFilter, setOrderFilter] = useState<IOrderFilter>({ status: OrderStatus.PENDING });
  const { data: ordersData } = useOrders(orderFilter);

  const nextOrderStatusSteps = [
    <ShoppingCartOutlined key="1" />,
    <ClockCircleOutlined key="1" />,
    <DropboxOutlined key="1" />,
    <CarOutlined key="1" />,
    <CheckCircleOutlined key="1" />,
    <StopOutlined key="1" />,
  ];
  const orderStatusTxt = ['', t('pending'), t('prepares_package'), t('in_transport'), t('success'), t('cancel')];
  const orderStatusColors = ['', 'text-yellow-600', 'text-cyan-600', 'text-blue-600', 'text-green-600', 'text-red-600'];
  const columns: ColumnsType<IOrder> = [
    {
      title: '#',
      key: 'index',
      render: (text, record, index) => ++index,
    },
    {
      title: t('code'),
      key: 'code',
      render: (text, record, index) => record.code,
    },
    {
      title: t('quantity'),
      key: 'totalQuantity',
      render: (text, record, index) => record.totalQuantity,
    },
    {
      title: t('amount'),
      key: 'totalAmount',
      render: (text, record, index) => formatPrice(record.totalAmountAfterDiscount.toString()),
    },
    {
      title: t('order_date'),
      key: 'createdAt',
      render: (text, record, index) => timestampMongoToDate(String(record?.createdAt) || '', 'DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: t('status'),
      key: 'status',
      align: 'center',
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
      title: t('payment_status'),
      key: 'paymentStatus',
      align: 'center',
      render: (text, record, index) => {
        const orderStatusStepIdx = _.indexOf(orderStatusSteps, record.status);
        return (
          <span className={`text-bold ${orderStatusColors[orderStatusStepIdx]}`}>
            {t(`payment_${record.paymentStatus.toLowerCase()}`)}
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
              {![OrderStatus.CANCEL, OrderStatus.SUCCESS].includes(record.status) ? (
                <Popconfirm
                  title={t('change_order_status')}
                  description={t('do_want_change_order_status')}
                  onConfirm={() => handleChangeStatus(record._id, nextOrderStatusStep)}
                  onCancel={() => {}}
                  okText={t('yes')}
                  cancelText={t('no')}
                  disabled={orderStatusStepIdx >= orderStatusSteps.length - 2}
                >
                  <Button
                    type="primary"
                    className="bg-green-600 text-white hover:!text-white hover:!bg-green-500"
                    size="large"
                    icon={nextOrderStatusSteps[orderStatusStepIdx + 1]}
                  />
                </Popconfirm>
              ) : (
                <></>
              )}

              {orderStatusStepIdx <= 1 && (
                <Button onClick={() => {}} type="primary" danger size="large" icon={<DeleteOutlined />} />
              )}
              {record.status == OrderStatus.SUCCESS && (
                <>
                  <Popconfirm
                    title={t('print_order')}
                    description={t('do_want_print_order')}
                    onConfirm={() => handlePrinter(record._id)}
                    onCancel={() => {}}
                    okText={t('yes')}
                    cancelText={t('no')}
                  >
                    <Button
                      className="bg-cyan-600 text-white hover:!text-white hover:!bg-cyan-500"
                      type="primary"
                      size="large"
                      icon={<PrinterOutlined />}
                    />
                  </Popconfirm>
                </>
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
      render: (text, record, index) => ++index,
    },
    {
      title: t('code'),
      key: 'code',
      render: (text, record, index) => record.productId.name,
    },
    {
      title: t('quantity'),
      key: 'totalQuantity',
      render: (text, record, index) => record.quantity,
    },
    {
      title: t('amount'),
      key: 'totalAmount',
      render: (text, record, index) => formatPrice(record.amount.toString()),
    },
  ];

  const customerInfoItems: DescriptionsProps['items'] = [
    {
      key: 'fullName',
      label: t('full_name'),
      children: <p>{ownerOrderInfo?.data.fullName}</p>,
    },
    {
      key: 'phone',
      label: t('phone'),
      children: <p>{ownerOrderInfo?.data.phone}</p>,
    },
    {
      key: 'address',
      label: t('address'),
      children: <p>{ownerOrderInfo?.data.address}</p>,
    },
    {
      key: 'deliveryAddress',
      label: t('delivery_address'),
      children: (
        <p>{`${orderInfo?.data?.deliveryAddress?.address}, ${orderInfo?.data?.deliveryAddress?.ward}, ${orderInfo?.data?.deliveryAddress?.district}, ${orderInfo?.data?.deliveryAddress?.province}`}</p>
      ),
    },
  ];

  const orderInfoItems: DescriptionsProps['items'] = [
    {
      key: 'merchandiser',
      label: t('merchandiser'),
      children: <p>{merchandiserOrderInfo?.data.fullName}</p>,
    },
    {
      key: 'quantity',
      label: t('quantity'),
      children: <p>{orderInfo?.data.totalQuantity}</p>,
    },
    {
      key: 'amount',
      label: t('amount'),
      children: <p>{formatPrice(orderInfo?.data.totalAmountAfterDiscount.toString() || '')}</p>,
    },
  ];

  const { data: orders, isSuccess } = useOrderCms();

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

  const handleChangeStatus = (orderId: string, nextOrderStatus: OrderStatus) => {
    confirmOrderMutateAsync({ orderId, status: nextOrderStatus })
      .then(() => message.success(t('update_order_status_success')))
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  const handlePrinter = (orderId: string) => {
    router.push(`/printer/${orderId}`);
  };

  return (
    <>
      <Modal title={t('order_info')} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <Row>
          <Col>
            <Descriptions size="small" layout={'vertical'} title={t('customer')} items={customerInfoItems} />
          </Col>
          <Col>
            <Descriptions size="small" layout={'vertical'} title={t('order_info')} items={orderInfoItems} />
          </Col>
        </Row>
        <Table columns={columnsOrderDetail} dataSource={orderDetail?.data} />
      </Modal>

      <div className="w-full flex justify-left items-center gap-3 mb-3">
        <Search
          style={{ width: 320 }}
          onSearch={(value: string) => setOrderFilter({ ...orderFilter, code: value.trim() })}
          placeholder={t('search') || 'Tìm kiếm'}
          loading={false}
        />
        <Select
          defaultValue={OrderStatus.PENDING}
          style={{ width: 256 }}
          onChange={(statusValue: string) => {
            setOrderFilter((pre) => {
              return { ...pre, status: statusValue };
            });
          }}
          options={[
            { value: OrderStatus.PENDING, label: 'Chờ xác nhận' },
            { value: OrderStatus.PREPARES_PACKAGE, label: 'Đang chuẩn bị' },
            { value: OrderStatus.IN_TRANSPORT, label: 'Đang vận chuyển' },
            { value: OrderStatus.SUCCESS, label: 'Hoàn thành' },
            { value: OrderStatus.CANCEL, label: 'Hủy bỏ' },
            { value: 'all', label: 'Tất cả trạng thái' },
          ]}
        />
      </div>
      <Table columns={columns} dataSource={ordersData?.data} />
    </>
  );
}
