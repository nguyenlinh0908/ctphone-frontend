'use client';

import ProductGrid from '@lng/(public)/component/product-grid';
import { useProducts } from '@lng/(public)/services/apis';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const { id: categoryId } = useParams();
  const { data: products } = useProducts({ limit: 10, page: 1 }, { categoryId: categoryId });


  return (
    <>
      <ProductGrid categoryId={categoryId} title={''} products={products?.data || []} changeProducts={()=> {clo}} />
    </>
  );
}
