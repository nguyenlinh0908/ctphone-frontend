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
          className="shadow-lg pt-5 px-3"
          hoverable
          style={{ width: 285, minHeight: 408 }}
          cover={
            <Image width={240} height={240} src={avatar} alt={'product image'}/>
          }
        >
          <h3 className="text-left text-lg">{name}</h3>
          <div className="flex justify-between gap-2 text-base font-bold h-full">
            <div className="text-blue-500">{formatPrice(price)}</div>
            <span className="text-sm line-through text-gray-400">40.000.000</span>
            <span className="text-sm text-gray-400">25%</span>
          </div>
        </Card>
      </Link>
    </>
  );
}
