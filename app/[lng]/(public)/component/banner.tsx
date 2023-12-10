import { Carousel } from 'antd';
import banner1 from '@public/banner/banner1.png';
import banner2 from '@public/banner/banner2.png';
import banner3 from '@public/banner/banner3.png';
import Image from 'next/image';

export default function Banner() {
  return (
    <>
      <Carousel autoplay>
        <div>
          <Image src={banner1} alt="banner 1" style={{ width: '100%', height: 'auto', maxHeight: 428 }} />
        </div>
        <div>
          <Image src={banner2} alt="banner 2" style={{ width: '100%', height: 'auto', maxHeight: 428 }} />
        </div>
        <div>
          <Image src={banner3} alt="banner 3" style={{ width: '100%', height: 'auto', maxHeight: 428 }} />
        </div>
      </Carousel>
    </>
  );
}
