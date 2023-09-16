'use client';
import { useTranslation } from '@i18n';

export default function Home() {
  const { t } = useTranslation('vi');
  return (
    <main className="min-h-screen">
      <div>{t('welcome')}</div>
    </main>
  );
}
