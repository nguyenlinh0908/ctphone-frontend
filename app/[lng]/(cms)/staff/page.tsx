'use client';

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetStaffs } from './services/apis';
import { IPaginateResponse } from '@interfaces/auth/paginate.interface';
import { IStaff } from '@interfaces/auth/staff.interface';
import { useTranslation } from '@i18n';
import { useParams } from 'next/navigation';
import { formatPhoneNumber, timestampMongoToDate } from '@utils/string';

export default function StaffPage() {
  const [staffs, setStaffs] = useState<IPaginateResponse<IStaff>>();
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const { data: staffList, isSuccess } = useGetStaffs();
  const columns: ColumnsType<IStaff> = [
    {
      title: '#',
      key: 'index',
      render: (text, record, index) => ((staffList?.page || 0) - 1) * (staffList?.limit || 0) + index + 1,
      width: 50,
    },
    {
      title: t('full_name'),
      dataIndex: 'fullName',
      width: 150,
    },
    {
      title: t('gender'),
      dataIndex: 'gender',
      width: 150,
      render: (text, record, index) => t(`${record.gender.toLowerCase()}`),
    },
    {
      title: t('address'),
      dataIndex: 'address',
      width: 150,
    },
    {
      title: t('date_of_birth'),
      dataIndex: 'dateOfBirth',
      width: 150,
      render: (text, record, index) => timestampMongoToDate(record.dateOfBirth),
    },
    {
      title: t('citizen_id'),
      dataIndex: 'citizenId',
      width: 150,
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      width: 150,
      render: (text, record, index) => formatPhoneNumber(record.phone),
    },
  ];

  useEffect(() => {
    setStaffs(staffList);
  }, [isSuccess]);

  return (
    <>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={staffs?.data}
        pagination={{ pageSize: 13 }}
        scroll={{ y: 240 }}
      />
    </>
  );
}
