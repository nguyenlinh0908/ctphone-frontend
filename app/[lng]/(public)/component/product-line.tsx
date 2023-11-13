'use client';

import { RightOutlined } from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { IProduct } from '@interfaces/product/product.interface';
import ProductCard from '@lng/component/product-card';
import { Button, Col, Row } from 'antd';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import vercelSvg from "@public/vercel.svg"
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
      <h2 className="text-center font-bold text-3xl">{products[0].categoryId.name}</h2>
      <Row className="mb-5" gutter={[8, 8]} align={'middle'} justify={'start'}>
        {products.length > 0 &&
          products.map((product, idx) => {
            return (
              <Col key={idx} sm={'50%'} md={'33.33%'} lg={'25%'} xl={'20%'} xxl={'20%'}>
                <ProductCard
                  key={product._id}
                  avatar={product.media && product.media.length > 0 ? process.env.NEXT_PUBLIC_ACCESS_FILE + product.media[0].url : vercelSvg}
                  name={product.name}
                  price={product.price}
                  _id={product._id}
                  rom={product.rom}
                  ram={product.ram}
                  enable={false}
                  romUnit={product.romUnit}
                  ramUnit={product.ramUnit}
                  categoryId={product.categoryId} quantity={product.quantity}                  
                />
              </Col>
            );
          })}
      </Row>
      <Row align={'middle'} justify={'center'}>
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
