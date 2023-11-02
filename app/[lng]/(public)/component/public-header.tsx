'use client';

import {
  FieldTimeOutlined,
  HomeOutlined,
  KeyOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  UserAddOutlined,
  UserOutlined,
  LoginOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { Col, Input, Menu, Row, Select, message } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useLogout, useNavigationCategories, useProducts, useProfile } from '../services/apis';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatPrice } from '@utils/string';

export default function PublicHeader() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const router = useRouter();
  const { mutate: logoutMutate, data: logoutData } = useLogout();
  const { data: categories, isSuccess } = useNavigationCategories({ dept: 1 }); // dept of category level 1 => navigation category
  const me = getCookie('me');
  const [searchValue, setSearchValue] = useState<string>();
  const { data: searchingProductData } = useProducts({ page: 1, limit: 9 }, { name: searchValue });

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
    setSearchValue(newValue);
  };

  const handleChange = (newValue: string) => {
    setSearchValue(newValue);
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
                <Select
                  placeholder={'Search'}
                  style={{ width: 200 }}
                  defaultActiveFirstOption={false}
                  suffixIcon={null}
                  filterOption={false}
                  onSearch={handleSearch}
                  onChange={handleChange}
                  notFoundContent={null}
                  autoClearSearchValue
                  value={""}
                  options={(searchingProductData?.data.data || []).map((d) => ({
                    value: d.name,
                    label: (
                      <Link className="text-black" href={`product/${d._id}`} >
                        <Row gutter={3} align="middle" justify="center">
                          <Col span={9} className={"flex justify-center items-center"}>
                          <Image
                              alt="product intro"
                              width={32}
                              height={32}
                              src={d.media && d.media.length > 0 ? process.env.NEXT_PUBLIC_ACCESS_FILE +d.media[0].url : ''}
                            />
                          </Col>
                          <Col span={15}>
                            <h5>{d.name}</h5>
                            <span>{formatPrice(d.price)}</span>
                          </Col>
                        </Row>
                      </Link>
                    ),
                  }))}
                />
              ),
            },
          ]
        }
      />
    </Header>
  );
}
