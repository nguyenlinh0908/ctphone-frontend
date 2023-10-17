'use client';

import {
  HomeOutlined,
  KeyOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { Layout, Menu, message } from 'antd';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useLogout, useNavigationCategories, useProfile } from './services/apis';
import { getCookie } from 'cookies-next';

const { Header, Content, Footer } = Layout;

export default function PublicLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const { t } = useTranslation(lng);
  const { data: categories, isSuccess } = useNavigationCategories({ dept: 1 }); // dept of category level 1 => navigation category
  const { data: profile, isSuccess: isSuccessProfile } = useProfile();
  const { mutate: logoutMutate, data: logoutData } = useLogout();

  useEffect(() => {}, [isSuccessProfile]);

  const handleLogout = () => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    if (accessToken && refreshToken) {
      logoutMutate({ accessToken, refreshToken });
    }

    message.success("logout success")
  };

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          className="w-full"
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={
            categories && [
              {
                key: 'home',
                label: (
                  <Link href={'/'}>
                    <HomeOutlined />
                  </Link>
                ),
              },
              ...categories.data.map((category, idx) => ({
                key: category._id,
                label: (
                  <>
                    <Link href={`/category/${category._id}`}>{category.name}</Link>
                  </>
                ),
              })),
              {
                key: 'personal',
                label: (
                  <>
                    <UserOutlined /> {profile?.data && profile.data.username}
                  </>
                ),
                children: profile?.data
                  ? [
                      {
                        key: 'profile',
                        label: (
                          <>
                            <Link href={'/profile'}>
                              <SolutionOutlined /> {t('profile')}
                            </Link>
                          </>
                        ),
                      },
                      {
                        key: 'cart',
                        label: (
                          <>
                            <Link href={'/cart'}>
                              <ShoppingCartOutlined /> {t('cart')}
                            </Link>
                          </>
                        ),
                      },
                      {
                        key: 'logout',
                        label: (
                          <>
                            <KeyOutlined /> {t('logout')}
                          </>
                        ),
                      },
                    ]
                  : [
                      {
                        key: 'login',
                        label: (
                          <>
                            <Link href={'/login'}>
                              <KeyOutlined /> {t('login')}
                            </Link>
                          </>
                        ),
                      },
                      {
                        key: 'register',
                        label: (
                          <>
                            <Link href={'/register'}>
                              <UserAddOutlined /> {t('register')}
                            </Link>
                          </>
                        ),
                      },
                    ],
              },
            ]
          }
        />
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        {/* <Breadcrumb className="m-3" items={[{ title: 'Home' }, { title: 'List' }]}></Breadcrumb> */}
        <div className="sm:px-0 md:px-30 lg:px-60 min-h-[100vh]">{children}</div>
      </Content>
      <Footer className="text-center">CTPhone</Footer>
    </Layout>
  );
}
