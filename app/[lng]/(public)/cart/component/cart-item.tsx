'use client';

import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Row, Image, Button, InputNumber, Space } from 'antd';
import Link from 'next/link';

export default function CartItem() {
  return (
    <>
      <Row gutter={24}>
        <Col className="gutter-row" span={6}>
          <Image
            width={80}
            preview={false}
            src="https://gaubongonline.vn/wp-content/uploads/2019/05/Gau-bong-pika-chu.jpg"
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <Link className="text-gray-900 font-bold text-base" href={'#'}>
            IPhone 15 Pro Max
          </Link>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, dolor? Explicabo, illo.
          </p>
        </Col>
        <Col className="gutter-row" span={6}>
          <span className="text-gray-700 font-bold text-base">29000000 VND</span>
        </Col>
        <Col  className="gutter-row" span={2}>
          <div className="bg-gray-300 px-3 py-1 rounded-md text-center">
            <MinusOutlined />
            <InputNumber
              style={{ textAlign: 'center' }}
              bordered={false}
              controls={false}
              className="bg-gray-300 text-red-600 w-10"
              min={1}
            />
            <PlusOutlined />
          </div>
        </Col>
        <Col className="gutter-row" span={2}>
          <DeleteOutlined width={24} height={24} />
        </Col>
      </Row>
    </>
  );
}
