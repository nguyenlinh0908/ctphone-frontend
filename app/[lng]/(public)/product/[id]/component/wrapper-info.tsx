'use client';
import { useTranslation } from '@i18n';
import { Rate } from 'antd';
import { useParams } from 'next/navigation';

export default function WrapperInfo({ name, rate }: { name: string; rate: string }) {
  const { lng } = useParams();
  const { t } = useTranslation(lng);

  return (
    <>
      <div className="border-0 border-b-2 border-solid border-gray-300 pb-3 mb-3">
        <h1 className="text-2xl">{name}</h1>
        <div>
          <Rate className="text-base" disabled={true} allowHalf defaultValue={Number(rate)} />
          <span className="inline ml-2 mr-1 text-blue-600">99</span>
          <span className="text-blue-600">{t('rating')}</span>
        </div>
      </div>
    </>
  );
}
