import { Image } from 'antd';

export default function ImageGallery({ media }: { media: string[] }) {
  console.log("media", media)
  return (
    <>
      <Image.PreviewGroup items={media}>
        <Image alt="product intro" width={550} height={550} src={media[0]} />
      </Image.PreviewGroup>
    </>
  );
}
