import Banner from '../component/banner';

export default function BannerLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <>
      <Banner />
      <div className="sm:px-0 md:px-30 lg:px-60 min-h-[100vh]">{children}</div>
    </>
  );
}
