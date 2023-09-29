'use client';

import { useAllProducts } from './services/apis';
import ProductLine from './component/product-line';

export default function HomePage() {
  const { data } = useAllProducts();

  return (
    <>
      <ProductLine title={'IPhone'} products={data || []} />
    </>
  );
}
