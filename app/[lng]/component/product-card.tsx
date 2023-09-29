import { IProduct } from '@interfaces/auth/product.interface';
import { formatPrice } from '@utils/string';
import { Card } from 'antd';
import Link from 'next/link';

export default function ProductCard({ _id, avatar, name, price }: IProduct) {
  return (
    <>
      <Link href={`product/${_id}`}>
        <Card
          className="shadow-lg"
          hoverable
          style={{ width: 258, minHeight: 423 }}
          cover={
            <img alt="example" src="https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_240.png" />
          }
        >
          <h3 className="text-left text-lg">{name}</h3>
          <div className="flex justify-between gap-2 text-base font-bold h-full">
            <div className="text-blue-500">{formatPrice(price)}</div>
            <span className="line-through text-gray-500">40.000.000</span>
            <span className="text-gray-500">25%</span>
          </div>
        </Card>
      </Link>
    </>
  );
}
