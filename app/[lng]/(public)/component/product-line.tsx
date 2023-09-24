import { IProduct } from '@interfaces/auth/product.interface';
import ProductCard from '@lng/component/product-card';
import { Button } from 'antd';

export default function ProductLine({ products }: { products: IProduct[] }) {
  return (
    <>
      <div className="text-3xl font-bold text-center">Horizontal</div>
      <div className="flex gap-3">
        {products.length > 0 &&
          products.map((product) => {
            return <ProductCard avatar={''} name={product.name} price={product.price} _id={product._id} />;
          })}
      </div>
      <div className="flex justify-center">
        <Button size="middle">Show more</Button>
      </div>
    </>
  );
}
