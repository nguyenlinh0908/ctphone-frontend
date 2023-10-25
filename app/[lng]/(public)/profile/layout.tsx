'use client';

import withAuth from '@hocs/withAuth';

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default withAuth(ProfileLayout);
