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
        <DescriptionsItem label={t('username')}>profile?.data.username</DescriptionsItem>
        <DescriptionsItem label={t('full_name')}>{profile?.data.userId?.fullName}</DescriptionsItem>
        <DescriptionsItem label={t('gender')}>{profile?.data.userId?.gender}</DescriptionsItem>
        <DescriptionsItem label={t('address')}>{profile?.data.userId?.address}</DescriptionsItem>
        <DescriptionsItem label={'Email'}>{profile?.data?.userId?.email}</DescriptionsItem>
        <DescriptionsItem label={t('date_of_birth')}>
          {dayjs(profile?.data.userId?.dateOfBirth).format('DD/MM/YYYY')}
        </DescriptionsItem>
        <DescriptionsItem label={t('phone')}>{profile?.data.userId?.phone} </DescriptionsItem>
      </Descriptions>
    </>
  );
}
