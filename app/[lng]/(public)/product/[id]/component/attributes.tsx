'use client';

import { useTranslation } from '@i18n';
import { IProduct } from '@interfaces/product/product.interface';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Attributes({ primaryProduct, products }: { primaryProduct: IProduct; products: IProduct[] }) {
  const { lng } = useParams();
  const { t } = useTranslation(lng);

  return (
    <div>
      <div className="my-3">
        <label>{t('storage')}</label>
        <ul className="flex justify-start gap-3 list-none p-0 ">
          {products.map((i, idx) => {
            return (
              <li
                key={idx}
                className={`border-1 border-solid ${
                  i._id == primaryProduct._id ? 'border-blue-300' : 'border-gray-300'
                } rounded-md w-20 px-3 py-2 text-center `}
              >
                <Link href={`/product/${i._id}`}>{i.rom}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <label>{t('color')}</label>
        <div className="flex justify-start gap-3 mt-3">
          {products.map((i, idx) => {
            return (
              <>
                <Link href={`/product/${i._id}`}>
                  <div
                    key={idx}
                    className={`w-7 h-7 rounded-full ${
                      i._id == primaryProduct._id && ' border-1 border-solid border-blue-300'
                    }`}
                    style={{ backgroundColor: i.colorCode }}
                  ></div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
