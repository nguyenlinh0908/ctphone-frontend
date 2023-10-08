'use client';

import { useTranslation } from '@i18n';
import { Row, Col, Button, Table, Input, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useCartDetail, useMyCart, useUpdateCart } from '../product/[id]/services/api';
import { useEffect } from 'react';
import { IOrderItem } from '@interfaces/order/order-item.interface';
import { CartAction } from '@interfaces/order/create-cart.interface';
import { formatPrice } from '@utils/string';
import { useDeleteCartDetail } from './services/apis';

export default function CartPage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const { data: myCart, isSuccess: isGetCartSuccess } = useMyCart();
  const { data: cartDetail, isSuccess: isGetCartDetailSuccess } = useCartDetail(myCart?.data._id || '');
  const { mutate: updateCartMutate } = useUpdateCart();
  const { mutate: deleteCartDetailMutate } = useDeleteCartDetail();

  useEffect(() => {}, [isGetCartDetailSuccess]);

  const handleDeleteCartItem = (cartItemId: string) => {
    deleteCartDetailMutate(cartItemId);
  };

  const handleUpdateCartItem = (productId: string, action: CartAction) => {
    updateCartMutate({ productId, action });
  };

  const columns: ColumnsType<IOrderItem> = [
    {
      title: t('photo'),
      dataIndex: 'photo',
      key: 'photo',
      render: () => (
        <>
          <Image
            alt="image"
            src={'https://shopdunk.com/images/thumbs/0020320_iphone-15-128gb_240.webp'}
            width={80}
            height={80}
          />
        </>
      ),
    },
    {
      title: t('product_name'),
      dataIndex: 'productId.name',
      key: 'productId.name',
      render: (text, record, idx) => (
        <>
          <Link className="text-base font-bold text-black" href={`/product/${'6518588127a7af5ea5e3996a'}`}>
            {record.productId.name}
          </Link>
        </>
      ),
    },
    {
      title: t('price'),
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record, idx) => <span className="text-base font-bold text-black">{text}</span>,
    },
    {
      title: t('quantity'),
      key: 'quantity',
      dataIndex: 'quantity',
      render: (text, record, idx) => (
        <div className="w-28 p-3 flex bg-gray-300 rounded-md justify-between items-center gap-3">
          <div>
            <MinusOutlined onClick={() => handleUpdateCartItem(record.productId._id, CartAction.MINUS)} />
          </div>
          <Input
            style={{ width: 45, textAlign: 'center' }}
            size="small"
            bordered={false}
            placeholder="Basic usage"
            value={text}
          />
          <div>
            <PlusOutlined
              className="cursor-pointer"
              onClick={() => handleUpdateCartItem(record.productId._id, CartAction.ADD)}
            />
          </div>
        </div>
      ),
    },
    {
      title: '',
      key: 'delete',
      dataIndex: 'delete',
      render: (i, record, idx) => {
        return (
          <>
            <Popconfirm
              placement="right"
              onConfirm={() => handleDeleteCartItem(record._id)}
              okText="Yes"
              cancelText="No"
              title={t('delete_product_confirm')}
            >
              <DeleteOutlined />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={16}>
          <Table pagination={false} columns={columns} dataSource={cartDetail?.data} />
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
                      <span className="font-bold">
                        {myCart?.data.totalAmountBeforeDiscount
                          ? formatPrice(myCart?.data.totalAmountAfterDiscount.toString())
                          : 0}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="font-bold text-lg">{t('total')}</label>
                    </td>
                    <td className="text-right">
                      <span className="font-bold text-lg text-[#0066CC]">
                        {myCart?.data.totalAmountAfterDiscount
                          ? formatPrice(myCart?.data.totalAmountAfterDiscount.toString())
                          : 0}
                      </span>
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
