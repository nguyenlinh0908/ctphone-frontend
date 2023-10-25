'use client';

import { useTranslation } from '@i18n';
import { Descriptions } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import { useParams } from 'next/navigation';
import { useProfile } from '../services/apis';
import dayjs from 'dayjs';

export default function ProfilePage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const { data: profile } = useProfile();

  return (
    <>
      <Descriptions className="my-5" title={t('user_info')} layout="vertical">
        <DescriptionsItem label={t('username')} children={profile?.data.username} />
        <DescriptionsItem label={t('full_name')} children={profile?.data.userId?.fullName} />
        <DescriptionsItem label={t('gender')} children={profile?.data.userId?.gender} />
        <DescriptionsItem label={t('address')} children={profile?.data.userId?.address} />
        <DescriptionsItem label={"Email"} children={profile?.data?.userId?.email} />
        <DescriptionsItem
          label={t('date_of_birth')}
          children={dayjs(profile?.data.userId?.dateOfBirth).format('DD/MM/YYYY')}
        />
        <DescriptionsItem label={t('phone')} children={profile?.data.userId?.phone} />
      </Descriptions>
    </>
  );
}
