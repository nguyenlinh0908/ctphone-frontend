'use client';

import { RightOutlined } from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { IProduct } from '@interfaces/product/product.interface';
import ProductCard from '@lng/component/product-card';
import { Button, Col, Pagination, Row } from 'antd';
import { useParams } from 'next/navigation';

export interface IProductGridProps {
  categoryId: string;

  title: string;

  products: IProduct[];

  changeProducts?: any;
}

export default function ProductGrid({ products }: IProductGridProps) {
  const { lng } = useParams();
  const { t } = useTranslation(lng);

  return (
    <>
      <Row className="mb-5" gutter={[64, 32]} align={'middle'} justify={'start'}>
        {products.length > 0 &&
          products.map((product) => {
            return (
              <Col sm={'50%'} md={'33.33%'} lg={'25%'} xl={'25%'} xxl={'25%'}>
                <ProductCard
                  key={product._id}
                  avatar={'https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_240.png'}
                  name={product.name}
                  price={product.price}
                  _id={product._id}
                  rom={0}
                  ram={0}
                />
              </Col>
            );
          })}
      </Row>
      <Row align={'middle'} justify={'center'}>
        <Col span={'100%'}>
          <Pagination defaultCurrent={1} total={50} />
        </Col>
      </Row>
    </>
  );
}
