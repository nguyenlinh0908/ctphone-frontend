'use client';

import { useTranslation } from '@i18n';
import { Button } from 'antd';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Attributes({ capacities, colors }: { capacities: string[]; colors: string[] }) {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const [productActive, setProductActive] = useState(1);

  const items = [
    { name: '128GB', colorCode: '#f20505', colorName: 'Red' },
    { name: '256GB', colorCode: '#29f205', colorName: 'Red' },
    { name: '512GB', colorCode: '#0531f7', colorName: 'Red' },
  ];

  return (
    <div>
      <div className="my-3">
        <label>{t('storage')}</label>
        <ul className="flex justify-start gap-3 list-none p-0 ">
          {items.map((i, idx) => {
            return (
              <li
                key={idx}
                className={`border-1 border-solid ${
                  idx == productActive ? 'border-blue-300' : 'border-gray-300'
                } rounded-md w-20 px-3 py-2 text-center `}
              >
                {i.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <label>{t('color')}</label>
        <div className="flex justify-start gap-3 mt-3">
          {items.map((i, idx) => {
            return (
              <div
              key={idx}
                className={`w-7 h-7 rounded-full ${idx == productActive && ' border-1 border-solid border-blue-300'}`}
                style={{ backgroundColor: i.colorCode }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
