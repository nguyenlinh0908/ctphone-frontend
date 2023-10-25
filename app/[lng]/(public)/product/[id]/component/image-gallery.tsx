import { Image } from 'antd';

export default function ImageGallery() {
  return (
    <>
      <Image.PreviewGroup
        items={[
          'https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_240.png',
          'https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_240.png',
          'https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_240.png',
        ]}
      >
        <Image
          alt="product intro"
          width={550}
          height={550}
          src="https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_240.png"
        />
      </Image.PreviewGroup>
    </>
  );
}
