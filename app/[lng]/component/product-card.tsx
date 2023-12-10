import { IProduct } from '@interfaces/product/product.interface';
import { formatPrice } from '@utils/string';
import { Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
export default function ProductCard({ _id, avatar, name, price, startingPrice }: IProduct) {
  return (
    <>
      <Link href={`product/${_id}`}>
        <Card
          className="shadow-lg pt-5 px-3"
          hoverable
          style={{ minHeight: 408 }}
          cover={<Image width={240} height={240} src={avatar} alt={'product image'} />}
        >
          <h3 className="text-left text-lg">{name}</h3>
          <div className="flex justify-between gap-2 text-base font-bold h-full">
            <div className="text-blue-500">{formatPrice(price.toString())}</div>
            <span className="text-sm line-through text-gray-400">
              {startingPrice && formatPrice(startingPrice?.toString())}
            </span>
            {startingPrice && (
              <>
                <span className="text-sm text-gray-400">{Math.ceil((startingPrice - price) / startingPrice * 100)}%</span>
              </>
            )}
          </div>
        </Card>
      </Link>
    </>
  );
}
