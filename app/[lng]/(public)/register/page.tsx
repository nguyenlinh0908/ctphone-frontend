'use client';

import { Col, Row, Image, Form, Input, DatePicker, Select, Button } from 'antd';
import RegisterBanner from '@public/login/register-banner.jpeg';
import { useParams } from 'next/navigation';
import { useTranslation } from '@i18n';

export default function RegisterPage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);

  return (
    <>
      <Row>
        <Col sm={'0%'} md={'25%'} xl={'40%'} lg={'50%'} xxl={'50%'}>
          <Image preview={false} className="w-50" src={RegisterBanner.src} />
        </Col>
        <Col sm={'100%'} md={'75%'} xl={'60%'} lg={'50%'} xxl={'50%'}>
          <Form layout="vertical" size="large">
            <Form.Item label={t('full_name')}>
              <Input placeholder={t('full_name') || 'Full name'} />
            </Form.Item>
            <Form.Item label={t('date_of_birth')}>
              <DatePicker />
            </Form.Item>
            <Form.Item label={t('gender')}>
              <Select defaultValue={'male'} onChange={() => {}} allowClear>
                <Select.Option value="male">male</Select.Option>
                <Select.Option value="female">female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label={t('email')}>
              <Input placeholder={t('email') || 'Email'} />
            </Form.Item>
            <Form.Item label={t('phone')}>
              <Input placeholder={t('phone') || 'Phone'} />
            </Form.Item>
            <Form.Item label={t('username')}>
              <Input placeholder={t('username') || 'Username'} />
            </Form.Item>
            <Form.Item label={t('password')}>
              <Input placeholder={t('password') || 'Password'} />
            </Form.Item>
            <Form.Item label={t('verify_password')}>
              <Input placeholder={t('verify_password') || 'verify_password'} />
            </Form.Item>
            <Form.Item>
              <Button onClick={() => {}} size="large" type="primary" htmlType="submit" className="w-full">
                {t('register_account_now')}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
