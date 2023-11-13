'use client';

import { FallOutlined, RiseOutlined } from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { IPaginateDto } from '@interfaces/paginate.interface';
import { IProductFilter } from '@interfaces/product/product.interface';
import ProductGrid from '@lng/(public)/component/product-grid';
import { useProducts } from '@lng/(public)/services/apis';
import { Select } from 'antd';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function CategoryPage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const { id: categoryId } = useParams();
  const [paginate, setPaginate] = useState<IPaginateDto>({ limit: 2, page: 1 });
  const [filter, setFilter] = useState<IProductFilter>();
  const { data: products } = useProducts(paginate, { categoryId: categoryId, ...filter });

  const handleChangePage = (page: number, pageSize: number) => {
    setPaginate((preState) => {
      return { ...preState, page };
    });
  };

  const handleFilter = (value: string) => {
    setFilter({ order: 'price', dir: value });
  };

  return (
    <>
      <Select
        className="my-3"
        defaultValue="desc"
        style={{ width: 120 }}
        onChange={handleFilter}
        options={[
          {
            value: 'asc',
            label: (
              <>
                <div className="flex gap-3">
                  <RiseOutlined />
                  <p>{t('price')}</p>
                </div>
              </>
            ),
          },
          {
            value: 'desc',
            label: (
              <>
                <div className="flex gap-3">
                  <FallOutlined />
                  <p>{t('price')}</p>
                </div>
              </>
            ),
          },
        ]}
      />
      <ProductGrid
        limit={products?.data.limit || 1}
        handleChangePage={handleChangePage}
        currentPage={products?.data.page || 1}
        totalPage={products?.data.totalPages || 1}
        categoryId={categoryId}
        title={''}
        products={products?.data.data || []}
        totalRecords={products?.data.totalRecords || 1}
      />
    </>
  );
}
