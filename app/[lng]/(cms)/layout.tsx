'use client';

import {
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  SwitcherOutlined,
  CoffeeOutlined,
  PlusSquareOutlined
} from '@ant-design/icons';
import withAuth from '@hocs/withAuth';
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Layout, Menu, message, theme } from 'antd';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import CmsLoading from './loading';
import { getCookie } from 'cookies-next';
import { useLogout } from '@lng/(public)/services/apis';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const { Header, Content, Footer, Sider } = Layout;

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href={'/dashboard'}>Tổng quan</Link>, 'dashboard', <PieChartOutlined />),
  getItem(<Link href={'/staff'}>Nhân viên</Link>, 'staff', <DesktopOutlined />),
  getItem(<Link href={'/order'}>Đơn bán hàng</Link>, 'order', <ShoppingCartOutlined />),
  getItem(<Link href={'/category'}>Danh mục</Link>, 'category', <SwitcherOutlined />),
  getItem(<Link href={'/product'}>Sản phẩm</Link>, 'product', <CoffeeOutlined />),
  getItem(<Link href={'/warehouse_receipt'}>Đơn nhập hàng</Link>, 'warehouse_receipt', <PlusSquareOutlined />),
  getItem('Logout', 'logout', <LogoutOutlined />),
];

function CmsLayout({ children, params: { lng } }: { children: React.ReactNode; params: { lng: string } }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { mutate: logoutMutate, data: logoutData } = useLogout();
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Suspense fallback={<CmsLoading />}>
        <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu
            onClick={(key) => handleClickMenuItem(key)}
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={[getItem(me && JSON.parse(me)?.username, '0', <UserOutlined />), ...items]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Apple' }, { title: 'Samsung' }]} />
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Suspense>
    </Layout>
  );
}

export default withAuth(CmsLayout);
