'use client';

import { useTranslation } from '@i18n';
import { IProduct } from '@interfaces/product/product.interface';
import ProductCard from '@lng/component/product-card';
import vercelSvg from '@public/vercel.svg';
import { Col, Pagination, Row } from 'antd';
import { useParams } from 'next/navigation';

export interface IProductGridProps {
  categoryId: string;

  title: string;

  products: IProduct[];

  currentPage: number;

  totalPage: number;

  totalRecords: number;

  limit: number;

  handleChangePage?: (page: number, pageSize: number) => void;
}

export default function ProductGrid({ products, limit, totalRecords, handleChangePage }: IProductGridProps) {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  return (
    <>
      <Row className="mb-5" gutter={[64, 32]} align={'middle'} justify={'start'}>
        {products.length > 0 &&
          products.map((product, idx) => {
            return (
              <Col key={idx} sm={'50%'} md={'33.33%'} lg={'25%'} xl={'25%'} xxl={'25%'}>
                <ProductCard
                  key={product._id}
                  avatar={
                    product.media && product.media.length > 0
                      ? process.env.NEXT_PUBLIC_ACCESS_FILE + product.media[0].url
                      : vercelSvg
                  }
                  name={product.name}
                  price={product.price}
                  _id={product._id}
                  rom={product.rom}
                  ram={product.ram}
                  enable={false}
                  romUnit={product.romUnit}
                  ramUnit={product.ramUnit}
                  categoryId={product.categoryId}
                />
              </Col>
            );
          })}
      </Row>
      {products.length > 0 && (
        <Row align={'middle'} justify={'center'}>
          <Col span={'100%'}>
            <Pagination onChange={handleChangePage} pageSize={limit} total={totalRecords} />
          </Col>
        </Row>
      )}
    </>
  );
}
