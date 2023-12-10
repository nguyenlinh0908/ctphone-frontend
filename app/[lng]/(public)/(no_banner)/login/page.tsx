'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { ILoginInput, Role } from '@interfaces/auth/auth.interface';
import LoginBanner from '@public/login/VNU_M492_08 1.jpeg';
import { Button, Checkbox, Col, Form, Image, Input, Row, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { getCookie } from 'cookies-next';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLogin } from './services/apis';

export default function Login() {
  const router = useRouter();
  const params = useParams()

  const { t } = useTranslation(params?.lng || "vi");
  const [form] = useForm<ILoginInput>();

  const { mutateAsync: loginAsync } = useLogin();

  useEffect(() => {
    const refreshToken = getCookie('refreshToken');
    if (refreshToken) router.push('/');
  }, [router]);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    loginAsync(values)
      .then((data) => {
        const roles = data.data.me.roles;
        message.success(t('success'));
        if (roles.includes(Role.ADMIN)) {
          router.push('/dashboard');
        } else {
          router.push('/');
        }
      })
      .catch((err) => {
        message.error(t('login_fail'));
      });
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Image preview={false} className="w-50" src={LoginBanner.src} />
        </Col>
        <Col span={24 - 12}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            form={form}
          >
            <h1>{t('login')}</h1>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: t('required_username') && 'Tên đăng nhập là bắt buộc',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon p-3" />}
                placeholder={t('username') && 'Tên người dùng'}
                name="username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t('required_password') && 'Mật khẩu là bắt buộc',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon p-3" />}
                type="password"
                placeholder={t('password') && 'Mật khẩu'}
                name="password"
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
    </>
  );
}
