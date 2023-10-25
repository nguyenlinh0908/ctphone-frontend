import { IProduct } from '@interfaces/product/product.interface';
import { formatPrice } from '@utils/string';
import { Card } from 'antd';
import Image from 'next/image';
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
            <Image width={258} height={258} src={avatar} alt={'product image'}/>
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
