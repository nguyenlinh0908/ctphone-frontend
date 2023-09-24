import { Image } from 'antd';

export default function ImageGallery() {
  return (
    <>
      <Image.PreviewGroup
        items={[
          'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
          'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
          'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
        ]}
      >
        <Image
          width={550}
          height={550}
          src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
        />
      </Image.PreviewGroup>
    </>
  );
}
