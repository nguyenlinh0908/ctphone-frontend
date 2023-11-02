'use client';

import { IPaginateDto } from '@interfaces/paginate.interface';
import ProductGrid from '@lng/(public)/component/product-grid';
import { useProducts } from '@lng/(public)/services/apis';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function CategoryPage() {
  const { id: categoryId } = useParams();
  const [paginate, setPaginate] = useState<IPaginateDto>({ limit: 2, page: 1 });
  const { data: products } = useProducts(paginate, { categoryId: categoryId });

  const handleChangePage = (page: number, pageSize: number) => {
    setPaginate((preState) => {
      return { ...preState, page };
    });
  };

  return (
    <>
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
