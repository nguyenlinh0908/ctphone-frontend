'use client';

import { useEffect } from 'react';
import { useOrderCms } from './sevices/apis';
import { Select, Table } from 'antd';
import { IOrder } from '@interfaces/order/order.interface';
import { ColumnsType } from 'antd/es/table';
import {timestampMongoToDate} from "@utils/string"
import { useTranslation } from '@i18n';
import { useParams } from 'next/navigation';

export default function CmsOrderPage() {
    const {lng} = useParams()

    const {t} = useTranslation(lng)

  const columns: ColumnsType<IOrder> = [
    {
      title: '#',
      key: 'index',
      width: '5%',
      render: (text, record, index) => ++index,
    },
    {
      title: t("code"),
      key: 'code',
      width: "20%",
      render: (text, record, index) => record.code,
    },
    {
      title: t("quantity"),
      key: 'totalQuantity',
      render: (text, record, index) => record.totalQuantity,
      width: '10%',
    },
    {
      title: t("amount"),
      key: 'totalAmount',
      width: '10%',
      render: (text, record, index) => record.totalAmountAfterDiscount,
    },
    {
        title:t("order_date"),
        key:"createdAt",
        render:(text,record, index)=>timestampMongoToDate(record?.createdAt.toString() || "", "DD/MM/YYYY HH:mm:ss")
    },
    {
      title: 'action',
      key: 'action',
      width: '20%',
      render: (text, record, index) => (
        <>
          <Select
            style={{ width: '128px' }}
            optionFilterProp="children"
            defaultValue={record.status}
            filterOption={(input, option) => (option?.value ?? '').includes(input)}
            options={[
              { value: 'PENDING', label: 'pending' },
              { value: 'SUCCESS', label: 'success' },
              { value: 'CANCEL', label: 'cancel' },
            ]}
            
          />
        </>
      ),
    },
  ];

  const { data: orders, isSuccess } = useOrderCms();

  useEffect(() => {}, [isSuccess]);

  return (
    <>
      <Table columns={columns} dataSource={orders?.data} />
    </>
  );
}
