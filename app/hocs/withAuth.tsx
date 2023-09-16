import { getAuthLocal } from '@utils/token';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (Component: any) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();
    const { lng } = useParams();
    const pathname = usePathname();
    const auth = getAuthLocal();

    // useEffect(() => {
    //   if (auth) {
    //     if (pathname.endsWith('login')) {
    //       router.push(`/${lng}`);
    //     }
    //   } else {
    //     router.push(`/${lng}/auth/login`);
    //   }
    // }, []);

    return <Component {...props} />;
  };
};

export default withAuth;
