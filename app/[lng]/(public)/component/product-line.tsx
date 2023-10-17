'use client';

import { RightOutlined } from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { IProduct } from '@interfaces/product/product.interface';
import ProductCard from '@lng/component/product-card';
import { Button, Col, Row } from 'antd';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export interface IProductLineProps {
  categoryId: string;

  title: string;

  products: IProduct[];
}

export default function ProductLine({ title, products, categoryId }: IProductLineProps) {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const router = useRouter();

  const handleViewMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    const categoryId = e.currentTarget.value;
    router.push(`/category/${categoryId}`);
  };

  return (
    <>
      <Row className='mb-5' gutter={[8, 8]} align={"middle"} justify={'start'}>
        {products.length > 0 &&
          products.map((product) => {
            return (
              <Col sm={'50%'} md={'33.33%'} lg={'25%'} xl={'20%'} xxl={'20%'}>
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
      <Row align={"middle"} justify={'center'}>
        <Col span={'100%'}>
          <Button
            size="large"
            className="border border-blue-600 border-solid text-blue-600 hover:border-none hover:bg-blue-600 hover:!text-white"
            value={categoryId}
            onClick={handleViewMore}
          >
            {t('see_more')}
            <RightOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
}
