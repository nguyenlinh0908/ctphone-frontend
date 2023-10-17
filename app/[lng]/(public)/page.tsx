'use client';

import { useNavigationCategories, useProducts } from './services/apis';
import ProductLine from './component/product-line';

export default function HomePage() {
  const { data: categories } = useNavigationCategories({ dept: 1 });

  const { data: productsLine1 } = useProducts({ limit: 4, page: 1 }, { categoryId: categories?.data[0]._id });
  const { data: productsLine2 } = useProducts({ limit: 4, page: 1 }, { categoryId: categories?.data[1]._id });
  const { data: productsLine3 } = useProducts({ limit: 4, page: 1 }, { categoryId: categories?.data[2]._id });

  return (
    <>
      {productsLine1?.data && productsLine1?.data.length > 0 && (
        <ProductLine
          categoryId={categories?.data[0]._id || '1'}
          title={categories?.data[0].name || ''}
          products={productsLine1?.data || []}
        />
      )}

      {productsLine2?.data && productsLine2?.data.length > 0 && (
        <ProductLine
          categoryId={categories?.data[1]._id || '1'}
          title={categories?.data[1].name || ''}
          products={productsLine2?.data || []}
        />
      )}

      {productsLine3?.data && productsLine3?.data.length > 0 && (
        <ProductLine
          categoryId={categories?.data[2]._id || '1'}
          title={categories?.data[2].name || ''}
          products={productsLine3?.data || []}
        />
      )}
    </>
  );
}
