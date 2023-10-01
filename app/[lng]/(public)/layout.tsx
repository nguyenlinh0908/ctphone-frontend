'use client';

import React, { useEffect } from 'react';
import { Breadcrumb, Layout, Menu, MenuProps, Space, theme } from 'antd';
import { useNavigationCategories } from './services/apis';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MenuItem from 'antd/es/menu/MenuItem';
import { HomeOutlined, MailOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

export default function PublicLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const params = useParams();
  const { data: categories, isSuccess } = useNavigationCategories({ dept: 1 }); // dept of category level 1 => navigation category

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
            ]
          }
        />
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <Breadcrumb className="m-3" items={[{ title: 'Home' }, { title: 'List' }]}></Breadcrumb>
        <div className="px-60 min-h-[100vh]">{children}</div>
      </Content>
      <Footer className="text-center">CTPhone</Footer>
    </Layout>
  );
}
