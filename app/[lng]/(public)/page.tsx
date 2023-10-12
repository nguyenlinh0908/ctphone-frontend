'use client';

import { useProducts } from './services/apis';
import ProductLine from './component/product-line';

export default function HomePage() {
  const { data: iphones } = useProducts({ limit: 5, page: 1 }, { categoryId: '65274fced038920802ed1420' });

  return (
    <>
      <ProductLine categoryId="651857d727a7af5ea5e39958" title={'IPhone'} products={iphones?.data || []} />
    </>
  );
}
