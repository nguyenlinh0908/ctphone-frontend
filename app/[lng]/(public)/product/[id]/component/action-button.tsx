'use client';
import { useTranslation } from '@i18n';
import { Button, Space } from 'antd';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ActionButton({ id }: { id: string }) {
  const { lng } = useParams();
  const { t } = useTranslation(lng);

  const handleBuyNow = (productId: string) => {
    console.log('buy now', productId);
  };

  return (
    <>
      <Space className="py-3" direction="vertical" style={{ width: '100%' }}>
        <Button className='font-bold bg-[#0066cc]' type="primary" size="large" block onClick={() => handleBuyNow(id)} style={{ height: 64 }}>
          {t("buy_now")}
        </Button>
      </Space>
    </>
  );
}
