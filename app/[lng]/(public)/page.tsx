'use client';

import { useAllProducts } from './services/apis';
import { useEffect } from 'react';
import ProductLine from './component/product-line';

export default function HomePage() {
  const { data, isSuccess } = useAllProducts();

  useEffect(() => {
    console.log('data :>> ', data);
  }, [isSuccess]);

  return (
    <>
     <ProductLine products={data || []} />
    </>
  );
}
