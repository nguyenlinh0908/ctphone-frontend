'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Inter } from 'next/font/google';
import { dir } from 'i18next';
import { languages } from '@i18n/settings';
import '../globals.css';
import withAuth from '@hocs/withAuth';
import { AxiosError } from 'axios';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const RootLayout = ({ children, params: { lng } }: { children: React.ReactNode; params: { lng: string } }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          if (error instanceof AxiosError && error.response?.status === 401 && failureCount === 0) {
            return true;
          }
          return false;
        },
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <title>TinTin</title>
      </head>
      <QueryClientProvider client={queryClient}>
        <body className={`${inter.className} max-w-2xl mx-auto`}>
          {/* <SwitcherLanguage lng={lng} /> */}
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
};

export default withAuth(RootLayout);
