'use client';

import { useOrderInfo } from '@lng/(cms)/order/sevices/apis';
import { useOrderDetail } from '@lng/(public)/(no_banner)/purchase_history/services/apis';
import { useParams } from 'next/navigation';
import ctphoneLogo from '@public/logo-mobile.png';
import { Descriptions } from 'antd';
import { useTranslation } from '@i18n';
import { ColumnsType } from 'antd/es/table';
import { IOrderItem } from '@interfaces/order/order-item.interface';
import { formatPrice } from '@utils/string';
import { Table } from 'antd';
import { useEffect } from 'react';

export default function PrinterOrderPage() {
  const { orderId, lng } = useParams();
  const { t } = useTranslation(lng);
  const { data: orderInfoData, isSuccess: orderInfoDataSuccess } = useOrderInfo(orderId);
  const { data: orderDetailData, isSuccess: orderDetailDataSuccess } = useOrderDetail(orderId);

  useEffect(() => {
    if (orderInfoDataSuccess && orderDetailDataSuccess) window.print();
  }, [orderDetailDataSuccess, orderInfoDataSuccess]);
  const columnsOrderDetail: ColumnsType<IOrderItem> = [
    {
      title: 'STT',
      key: 'index',
      render: (text, record, index) => ++index,
    },
    {
      title: t('product_name'),
      key: 'productName',
      render: (text, record, index) => record.productId.name,
    },
    {
      title: t('quantity'),
      key: 'totalQuantity',
      render: (text, record, index) => record.quantity,
    },
    {
      title: t('amount_unit'),
      key: 'totalAmount',
      render: (text, record, index) => formatPrice(record.amountUnit.toString()),
    },
    {
      title: t('amount'),
      key: 'totalAmount',
      render: (text, record, index) => formatPrice(record.amount.toString()),
    },
  ];

  return (
    <>
      <div className="mx-3">
        <div className="flex justify-between items-center">
          <div>
            <img src={ctphoneLogo.src} width={128} alt="logo" />
            <h3 className="text-center">CTPHONE</h3>
          </div>
          <div className="text-center">
            <h3 >
              BÁN BUÔN - BÁN LẺ - ĐIỆN THOẠI <br /> PHỤ KIỆN CHÍNH HÃNG
            </h3>
            <p>Số 120 Ngõ 32 Đồng Me - Nam Từ Liêm - Hà Nội</p>
            <p>Tel: 0333.503.555</p>
          </div>
        </div>
        <div>
          <Descriptions layout="vertical" size="middle" title={<h3 className='text-center'>HÓA ĐƠN BÁN HÀNG</h3>}>
            <Descriptions.Item label="Người nhận hàng">
              {orderInfoData?.data.deliveryAddress.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{orderInfoData?.data.deliveryAddress.phone}</Descriptions.Item>
            <Descriptions.Item label="Tổng số lượng">{orderInfoData?.data.totalQuantity}</Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">{orderInfoData?.data.totalAmountAfterDiscount}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ nhận hàng">{`${orderInfoData?.data.deliveryAddress.address}, ${orderInfoData?.data.deliveryAddress.ward}, ${orderInfoData?.data.deliveryAddress.district}, ${orderInfoData?.data.deliveryAddress.province}`}</Descriptions.Item>
          </Descriptions>
          <Table
            pagination={false}
            dataSource={orderDetailData?.data ? orderDetailData?.data : []}
            columns={columnsOrderDetail}
          />
          ;
        </div>
        <div className="flex justify-end gap-10">
          <p>Ngày</p>
          <p>Tháng</p>
          <p>Năm</p>
        </div>
        <div className="flex justify-between items-center mt-3 mb-32">
          <h3 className="">NGƯỜI MUA HÀNG</h3>
          <h3>NGƯỜI VIẾT HÓA ĐƠN</h3>
        </div>
        <p className="text-center">Uy tín - Tận tâm - Chuyên nghiệp</p>
      </div>
    </>
  );
}
