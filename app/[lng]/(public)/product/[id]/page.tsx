'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useProductDetail } from './services/api';
import { Col, Row } from 'antd';
import ImageGallery from './component/image-gallery';
import WrapperInfo from './component/wrapper-info';
import Prices from './component/prices';
import Attributes from './component/attributes';
import ActionButton from './component/action-button';

export default function ProductDetail() {
  const { id, lng } = useParams();
  const { data, isSuccess } = useProductDetail(id);

  useEffect(() => {
    console.log(data);
  }, [isSuccess]);

  return (
    <>
      <Row justify={'center'}>
        <Col className="flex justify-center" span={12}>
          <ImageGallery />
        </Col>
        <Col span={12}>
          <WrapperInfo name={data?.name || ''} rate={'4.5'} />
          <Prices price={data?.price || ''} oldPrice={'40000000'} />
          <Attributes capacities={[]} colors={[]} />
          <ActionButton id={data?._id || ''} />
        </Col>
      </Row>
    </>
  );
}
