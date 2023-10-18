'use client';

import { Layout } from 'antd';
import React from 'react';
import PublicHeader from './component/public-header';

const { Content, Footer } = Layout;

export default function PublicLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  
  return (
    <Layout>
      <PublicHeader />
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        {/* <Breadcrumb className="m-3" items={[{ title: 'Home' }, { title: 'List' }]}></Breadcrumb> */}
        <div className="sm:px-0 md:px-30 lg:px-60 min-h-[100vh]">{children}</div>
      </Content>
      <Footer className="text-center">CTPhone</Footer>
    </Layout>
  );
}
