'use client';

import { useTranslation } from '@i18n';
import { Row, Col, Button, Table, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

interface DataType {
  key: string;
  photo: string;
  productName: string;
  price: number;
  quantity: number;
  option: string;
}

export default function CartPage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);

  const columns: ColumnsType<DataType> = [
    {
      title: t('photo'),
      dataIndex: 'photo',
      key: 'photo',
      render: (img) => (
        <>
          <Image alt="image" src={img} width={80} height={80} />
        </>
      ),
    },
    {
      title: t('product_name'),
      dataIndex: 'productName',
      key: 'productName',
      render: (text) => (
        <>
          <Link className="text-base font-bold text-black" href={`/product/${'6518588127a7af5ea5e3996a'}`}>
            {text}
          </Link>
        </>
      ),
    },
    {
      title: t('price'),
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span className="text-base font-bold text-black">{text}</span>,
    },
    {
      title: t('quantity'),
      key: 'quantity',
      dataIndex: 'quantity',
      render: (text) => (
        <div className="w-28 p-3 flex bg-gray-300 rounded-md justify-between items-center gap-3">
          <div>
            <MinusOutlined />
          </div>
          <Input
            style={{ width: 45, textAlign: 'center' }}
            size="small"
            bordered={false}
            placeholder="Basic usage"
            value={text}
          />
          <div>
            <PlusOutlined className="cursor-pointer" />
          </div>
        </div>
      ),
    },
    {
      title: '',
      key: 'delete',
      dataIndex: 'delete',
      render: (i) => <DeleteOutlined />,
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      photo: 'https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_80.png',
      productName: 'IPhone 15',
      price: 32000000,
      quantity: 1,
      option: '',
    },
    {
      key: '2',
      photo: 'https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_80.png',
      productName: 'IPhone 15 Pro',
      price: 35000000,
      quantity: 1,
      option: '',
    },
    {
      key: '3',
      photo: 'https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_80.png',
      productName: 'IPhone 15 Pro Max',
      price: 40000000,
      quantity: 1,
      option: '',
    },
  ];

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={16}>
          <Table pagination={false} columns={columns} dataSource={data} />
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="w-full bg-white p-5 rounded-md">
            <div className="w-full flex justify-between mb-5 gap-3">
              <Input placeholder={t('coupon') || ''} />
              <Button className="w-full bg-[#AAAAAA]" type="text">
                {t('apply')}
              </Button>
            </div>
            <div className="mb-3">
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <td>
                      <label className="text-gray-600">{t('sub_total')}</label>
                    </td>
                    <td className="text-right">
                      <span className="font-bold">500</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="font-bold text-lg">{t('total')}</label>
                    </td>
                    <td className="text-right">
                      <span className="font-bold text-lg text-[#0066CC]">1000</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button className="font-bold bg-[#0066cc]" type="primary" size="large" block style={{ height: 64 }}>
              {t('checkout')}
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
