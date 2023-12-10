export default function NoBannerLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <div className="sm:px-0 md:px-30 lg:px-60 min-h-[100vh]">{children}</div>
  );
}
