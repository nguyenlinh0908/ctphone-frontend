'use client';

import withAuth from '@hocs/withAuth';

function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default withAuth(CartLayout);
