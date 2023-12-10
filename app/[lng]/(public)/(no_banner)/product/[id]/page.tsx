'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMyCart, useProductDetail, useUpdateCart } from './services/api';
import { Button, Col, Row, Space, message } from 'antd';
import ImageGallery from './component/image-gallery';
import WrapperInfo from './component/wrapper-info';
import Prices from './component/prices';
import Attributes from './component/attributes';
import { useProducts } from '@lng/(public)/services/apis';
import { useTranslation } from '@i18n';
import { CartAction } from '@interfaces/order/create-cart.interface';

export default function ProductDetail() {
  const { id, lng } = useParams();
  const { t } = useTranslation(lng);
  const router = useRouter();

  const { data: product, isSuccess } = useProductDetail(id);
  const { data: products, isSuccess: productsSuccess } = useProducts(
    { limit: 10, page: 1 },
    { sku: product?.data.sku },
  );
  const { data: updateCartData, isSuccess: updateCartSuccess, mutateAsync: updateCartMutateAsync } = useUpdateCart();

  const handleAddToCart = async (productId: string) => {
    updateCartMutateAsync({ productId, action: CartAction.ADD })
      .then(() => {
        router.push('/cart');
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  return (
    <>
      {isSuccess && (
        <>
          <Row justify={'center'} gutter={32}>
            <Col className="flex justify-center" span={12}>
              <ImageGallery
                media={
                  product.data?.media ? product.data.media?.map((i) => process.env.NEXT_PUBLIC_ACCESS_FILE + i.url) : []
                }
              />
            </Col>
            <Col span={12}>
              <WrapperInfo name={product.data.name || ''} rate={'4.5'} />
              <Prices
                price={product.data.price.toString() || ''}
                oldPrice={product.data?.startingPrice ? product.data?.startingPrice.toString() : ''}
              />
              {productsSuccess && <Attributes primaryProduct={product.data} products={products.data.data} />}
              <Space className="py-3" direction="vertical" style={{ width: '100%' }}>
                <Button
                  disabled={!product.data.enable}
                  onClick={() => handleAddToCart(product.data._id)}
                  className="font-bold bg-[#0066cc]"
                  type="primary"
                  size="large"
                  block
                  style={{ height: 64 }}
                >
                  {product.data.enable ? t('buy_now') : t('product_unavailable')}
                </Button>
              </Space>
            </Col>
          </Row>
          {product.data?.description && <div dangerouslySetInnerHTML={{ __html: product.data.description }} />}
        </>
      )}
    </>
  );
}
