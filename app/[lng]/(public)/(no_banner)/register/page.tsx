'use client';

import { Col, Row, Image, Form, Input, DatePicker, Select, Button, message } from 'antd';
import RegisterBanner from '@public/login/register-banner.jpeg';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from '@i18n';
import { useForm } from 'antd/es/form/Form';
import { Gender } from '@interfaces/customer/customer.interface';
import { useCreateCustomerAccount } from './services/apis';
import { useEffect, useState } from 'react';

export default function RegisterPage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [form] = useForm();
  const router = useRouter();

  const {
    data: registerCustomerAccountData,
    isSuccess: registerCustomerAccountSuccess,
    isError: registerCustomerAccountError,
    mutate: registerCustomerAccountMutate,
  } = useCreateCustomerAccount();

  useEffect(() => {
    if (registerCustomerAccountSuccess) {
      message.success(t('register_account_success'));
      router.push('/login');
    }
    if (registerCustomerAccountError) message.error(t('register_account_fail'));
  }, [registerCustomerAccountSuccess, registerCustomerAccountError, t, router]);

  const registerAccount = async () => {
    try {
      const values = await form.validateFields();
      values['gender'] = gender;
      registerCustomerAccountMutate(values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <>
      <Row className="mt-9" gutter={20} align={'top'} justify={'center'}>
        <Col sm={0} md={6} lg={14} xl={14} xxl={14}>
          <Image preview={false} className="w-50" src={RegisterBanner.src} />
        </Col>
        <Col sm={24} md={18} lg={10} xl={10} xxl={10}>
          <Form form={form} layout="vertical">
            <Form.Item label={t('full_name')} required name={'fullName'}>
              <Input placeholder={t('full_name') || 'Full name'} />
            </Form.Item>
            <Form.Item label={t('date_of_birth')} required name={'dateOfBirth'}>
              <DatePicker format={'DD/MM/YYYY'} />
            </Form.Item>
            <Form.Item label={t('gender')} required name="gender">
              <Select defaultValue={gender} onChange={(e) => setGender(e)} allowClear>
                <Select.Option value={Gender.MALE}>{t('male')}</Select.Option>
                <Select.Option value={Gender.FEMALE}>{t('female')}</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label={t('address')} name={'address'}>
              <Input placeholder={t('address') || 'address'} />
            </Form.Item>
            <Form.Item label={'Email'} name={'email'}>
              <Input type="email" placeholder={'Email'} />
            </Form.Item>
            <Form.Item label={t('phone')} required name={'phone'}>
              <Input placeholder={t('phone') || 'Phone'} />
            </Form.Item>
            <Form.Item label={t('username')} required name={'username'}>
              <Input placeholder={t('username') || 'Username'} />
            </Form.Item>
            <Form.Item label={t('password')} required name={'password'}>
              <Input type="password" placeholder={t('password') || 'Password'} />
            </Form.Item>
            <Form.Item label={t('verify_password')} required name={'verifyPassword'}>
              <Input type="password" placeholder={t('verify_password') || 'verify_password'} />
            </Form.Item>
            <Form.Item>
              <Button onClick={registerAccount} size="large" type="primary" htmlType="submit" className="w-full">
                {t('register_account_now')}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
