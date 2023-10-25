'use client';

import { EditOutlined } from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { ICategory } from '@interfaces/category/category.interface';
import { Button, Col, Form, Input, Row, Select, Space, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Table, { ColumnsType } from 'antd/es/table';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAllCategories, useCreateCategory } from './services/apis';
import { useForm } from 'antd/es/form/Form';

export default function CategoryPage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const { data: allCategories } = useAllCategories();
  const [parentCategoryId, setParentCategoryId] = useState();
  const { mutate: createCategoryMutate, isSuccess: createCategorySuccess } = useCreateCategory();
  const [form] = useForm();

  useEffect(() => {
    if (createCategorySuccess) message.success(t('success'));
  }, [createCategorySuccess, t]);

  const columns: ColumnsType<ICategory> = [
    {
      title: '#',
      key: 'index',
      width: '5%',
      render: (text, record, index) => ++index,
    },
    {
      title: t('category_name'),
      key: 'categoryName',
      width: '25%',
      render: (text, record, index) => record.name,
    },
    {
      title: t('category_parent'),
      key: 'categoryName',
      width: '25%',
      render: (text, record, index) => record.dept,
    },
    {
      title: t('dept'),
      key: 'dept',
      width: '10%',
      render: (text, record, index) => record.dept,
    },
    {
      title: t('action'),
      key: 'action',
      render: (text, record, index) => (
        <Space size={'small'}>
          <Button
            type="primary"
            className="bg-yellow-600 text-white hover:!text-white hover:!bg-yellow-500"
            size="large"
            icon={<EditOutlined />}
          />
        </Space>
      ),
    },
  ];

  const handleCreateCategory = async () => {
    try {
      const values = await form.validateFields();
      if (parentCategoryId) {
        createCategoryMutate({ ...values, parentId: parentCategoryId });
      } else {
        createCategoryMutate(values);
      }
    } catch (error) {
      message.error(t('something_wrong'));
    }
  };

  return (
    <>
      <Row>
        <Col span={14}>
          <Table columns={columns} dataSource={allCategories?.data} />
        </Col>
        <Col span={24 - 14}>
          <Form form={form} layout="vertical">
            <FormItem label={t('category_name')} name={'name'}>
              <Input type="text" />
            </FormItem>
            <FormItem label={t('category_parent')}>
              <Select
                value={parentCategoryId}
                onChange={(e) => setParentCategoryId(e)}
                options={allCategories?.data.map((category) => ({ label: category.name, value: category._id }))}
              />
            </FormItem>
            <Form.Item>
              <Button onClick={handleCreateCategory} size="large" type="primary" htmlType="submit" className="w-full">
                {t('submit')}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
