'use client';

import { useProductsLine } from './services/apis';
import ProductLine from './component/product-line';

export default function HomePage() {
  const { data: iphones,  } = useProductsLine({ limit: 5, page: 1 }, { categoryId: '6515967d0f823a5d715b7d1e' });

  return (
    <>
      <ProductLine categoryId='6515967d0f823a5d715b7d1e' title={'IPhone'} products={iphones || []} />
    </>
  );
}
