'use client';

import { Layout } from 'antd';
import React from 'react';
import PublicHeader from './component/public-header';
import Banner from './component/banner';

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
      <Content className="site-layout">{children}</Content>
      <Footer className="text-center">CTPhone</Footer>
    </Layout>
  );
}
