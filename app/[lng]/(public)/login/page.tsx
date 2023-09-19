'use client';

import { Row, Col, Image, Form, Input, Button, Checkbox } from 'antd';
import LoginBanner from '@public/login/VNU_M492_08 1.jpeg';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ILoginInput } from '@models/auth/auth.model';
import { useState } from 'react';
import { useTranslation } from '@i18n';
import { useLogin } from './services/apis';

interface ILoginProps {
  params: { lng: string };
}

export default function Login({ params: { lng } }: ILoginProps) {
  const [loginInput, setLoginInput] = useState<ILoginInput>({ username: '', password: '' });
  const { t } = useTranslation(lng);
  const { mutate: login, isSuccess } = useLogin();

  const handleInputChange = (e: any) => {
    switch (e.target.name) {
      case 'username': {
        setLoginInput((preState) => {
          return { ...preState, username: e.target.value };
        });
        break;
      }
      case 'password': {
        setLoginInput({ ...loginInput, password: e.target.value });
        break;
      }
      default:
    }
  };

  const handleSubmit = () => {
    login(loginInput);
  };

  return (
    <Row>
      <Col span={12}>
        <Image preview={false} className="w-full" src={LoginBanner.src} />
      </Col>
      <Col span={12}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <h1>{t('login')}</h1>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: t('required_username') && ' Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon p-3" />}
              placeholder={t('username') && 'Username'}
              name="username"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t('required_password') && 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon p-3" />}
              type="password"
              placeholder={t('password') && 'Password'}
              name="password"
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('remember_me')}</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                {t('forgot_password')}
              </a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button onClick={handleSubmit} size="large" type="primary" htmlType="submit" className="w-full">
              {t('login')}
            </Button>
            <div className="py-3 flex items-center">
              <label htmlFor="">{t('you_do_not_account')}</label>
              <Button type="link">{t('register_account_now')}</Button>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
