'use client';

import {
  DashboardOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  KeyOutlined,
  LoginOutlined,
  PicLeftOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { Menu, message } from 'antd';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useLogout, useNavigationCategories } from '../services/apis';

export default function PublicHeader() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const router = useRouter();
  const { mutate: logoutMutate, data: logoutData } = useLogout();
  const { data: categories, isSuccess } = useNavigationCategories({ dept: 1 }); // dept of category level 1 => navigation category
  const me = getCookie('me');

  const handleClickMenuItem = (key: any) => {
    switch (key.key) {
      case 'logout':
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        if (accessToken && refreshToken) {
          logoutMutate({ accessToken, refreshToken });
          message.success('logout success');
          router.push('/');
        }
        break;
      default:
    }
  };

  const handleSearch = (newValue: string) => {
    router.push(`search?q=${newValue}`);
  };

  return (
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
        onClick={(key) => handleClickMenuItem(key)}
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
                  <UserOutlined /> {me && JSON.parse(me)?.username}
                </>
              ),
              children: me
                ? JSON.parse(me)?.roles.includes('CUSTOMER')
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
                        key: 'deliveryAddress',
                        label: (
                          <>
                            <Link href={'/delivery_address'}>
                              <PicLeftOutlined /> {t('delivery_address')}
                            </Link>
                          </>
                        ),
                      },
                      {
                        key: 'purchaseHistory',
                        label: (
                          <>
                            <Link href={'/purchase_history'}>
                              <FieldTimeOutlined /> {t('purchase_history')}
                            </Link>
                          </>
                        ),
                      },
                      {
                        key: 'logout',
                        label: (
                          <>
                            <LoginOutlined />
                            {t('logout')}
                          </>
                        ),
                      },
                    ]
                  : [
                      {
                        key: 'profile',
                        label: (
                          <>
                            <Link href={'/dashboard'}>
                              <DashboardOutlined /> {t('dashboard')}
                            </Link>
                          </>
                        ),
                      },
                      {
                        key: 'logout',
                        label: (
                          <>
                            <LoginOutlined />
                            {t('logout')}
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
            {
              key: 'search',
              label: (
                <div className="flex justify-center items-center h-full">
                  <Search onSearch={handleSearch} placeholder="Search" loading={false} />
                </div>
              ),
            },
          ]
        }
      />
    </Header>
  );
}
