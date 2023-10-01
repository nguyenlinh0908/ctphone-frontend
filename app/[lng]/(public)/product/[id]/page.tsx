'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useProductDetail } from './services/api';
import { Col, Row } from 'antd';
import ImageGallery from './component/image-gallery';
import WrapperInfo from './component/wrapper-info';
import Prices from './component/prices';
import Attributes from './component/attributes';
import ActionButton from './component/action-button';
import { useProducts } from '@lng/(public)/services/apis';

export default function ProductDetail() {
  const { id, lng } = useParams();
  const { data: product, isSuccess } = useProductDetail(id);

  const { data: products, isSuccess: productsSuccess } = useProducts(
    { limit: 10, page: 1 },
    { sku: product?.data.sku },
  );

  useEffect(() => {
    console.log('products :>> ', products);
  }, [productsSuccess]);

  return (
    <>
      {isSuccess && (
        <>
          <Row justify={'center'}>
            <Col className="flex justify-center" span={12}>
              <ImageGallery />
            </Col>
            <Col span={12}>
              <WrapperInfo name={product?.data.name || ''} rate={'4.5'} />
              <Prices price={product?.data.price || ''} oldPrice={'40000000'} />
              {productsSuccess && <Attributes primaryProduct={product.data} products={products.data} />}
              <ActionButton id={product?.data._id || ''} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
