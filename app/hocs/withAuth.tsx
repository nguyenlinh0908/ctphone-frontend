import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';

const withAuth = (Component: any) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();
    const { lng } = useParams();
    const pathname = usePathname();

    useEffect(() => {
      const refreshToken = getCookie('refreshToken');
      if (refreshToken) {
        if (pathname.endsWith('login')) {
          router.push(`/${lng}/dashboard`);
        }
      } else {
        router.push(`/${lng}/login`);
      }
    }, [lng, router, pathname]);

    return <Component {...props} />;
  };
};

export default withAuth;
