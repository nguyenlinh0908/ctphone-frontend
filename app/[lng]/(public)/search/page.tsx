'use client';

import { Empty } from 'antd';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '../component/product-grid';
import { useProducts } from '../services/apis';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('q');
  const { data: searchingProductData, isSuccess } = useProducts({ page: 1, limit: 9 }, { name: search || '' });

  return (
    <>
      {isSuccess ? (
        <>
          <ProductGrid
            categoryId={''}
            title={''}
            products={searchingProductData.data.data}
            currentPage={searchingProductData.data.page}
            totalPage={searchingProductData.data.totalPages}
            totalRecords={searchingProductData.data.totalRecords}
            limit={searchingProductData.data.limit}
          />
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
}
