'use client';

import withAuth from '@hocs/withAuth';

function PurchaseHistoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default withAuth(PurchaseHistoryLayout);
