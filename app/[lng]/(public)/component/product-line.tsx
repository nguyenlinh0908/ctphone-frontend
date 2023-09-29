'use client';

import { RightOutlined } from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { IProduct } from '@interfaces/auth/product.interface';
import ProductCard from '@lng/component/product-card';
import { Button } from 'antd';
import { useParams } from 'next/navigation';

export interface IProductLineProps {
  title: string;

  products: IProduct[];
}

export default function ProductLine({ title, products }: IProductLineProps) {
  const { lng } = useParams();
  const { t } = useTranslation(lng);

  return (
    <>
      <div className="my-9">
        <div className="text-3xl font-bold text-center">{title}</div>
        <div className="flex gap-3 mb-9">
          {products.length > 0 &&
            products.map((product) => {
              return <ProductCard avatar={''} name={product.name} price={product.price} _id={product._id} />;
            })}
        </div>
        <div className="flex justify-center">
          <Button
            size="large"
            className="border border-blue-600 border-solid text-blue-600 hover:border-none hover:bg-blue-600 hover:!text-white"
          >
            {t('see_more')}
            <RightOutlined />
          </Button>
        </div>
      </div>
    </>
  );
}
