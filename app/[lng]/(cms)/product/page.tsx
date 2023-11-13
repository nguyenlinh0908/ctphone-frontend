'use client';

import { CheckOutlined, CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { IProduct } from '@interfaces/product/product.interface';
import {
  Button,
  ColorPicker,
  ColorPickerProps,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  Upload,
  UploadFile,
  message,
} from 'antd';
import { Color } from 'antd/es/color-picker';
import { useForm } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table';
import { RcFile, UploadProps } from 'antd/es/upload';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useAllCategories } from '../category/services/apis';
import { useAllProducts, useCreateProduct, useUpdateProductStatus } from './services/apis';
import { GATEWAY } from '@services/base';
import { getCookie } from 'cookies-next';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export default function ProductPage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const { data: allProducts } = useAllProducts();
  const { data: allCategories } = useAllCategories();
  const [parentCategoryId, setParentCategoryId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const { mutate: updateProductStatusMutate } = useUpdateProductStatus();
  const { mutateAsync: createProductMutateAsync } = useCreateProduct();
  const [formatHex, setFormatHex] = useState<ColorPickerProps['format']>('hex');
  const [colorHex, setColorHex] = useState<Color | string>('#1677ff');
  const [form] = useForm();

  const columns: ColumnsType<IProduct> = [
    {
      title: '#',
      key: 'index',
      width: '5%',
      render: (text, record, index) => ++index,
    },
    {
      title: 'SKU',
      key: 'sku',
      render: (text, record, index) => record.sku,
    },
    {
      title: t('product_name'),
      key: 'productName',
      render: (text, record, index) => record.name,
    },
    {
      title: t('quantity'),
      key: 'quantity',
      render: (text, record, index) => record.quantity,
    },
    {
      title: t('color'),
      key: 'color',
      render: (text, record, index) => (
        <div className="flex gap-3">
          <span>{record.colorName}</span>
          <div className={`rounded-full w-7 h-7`} style={{ backgroundColor: record.colorCode }}></div>
        </div>
      ),
    },
    {
      title: t('memory'),
      key: 'memory',
      render: (text, record, index) => (
        <>
          <span>{record.ram}</span>
          <span>{record.ramUnit}</span>
        </>
      ),
    },
    {
      title: t('storage'),
      key: 'storage',
      render: (text, record, index) => (
        <>
          <span>{record.rom}</span>
          <span>{record.romUnit}</span>
        </>
      ),
    },
    {
      title: t('price'),
      key: 'price',
      render: (text, record, index) => record.price,
    },
    {
      title: t('category'),
      key: 'category',
      render: (text, record, index) => record.categoryId.name,
    },
    {
      title: t('status'),
      key: 'status',
      render: (text, record, index) => (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={record.enable}
          onChange={() => handleSwitchStatus(record._id, record.enable)}
        />
      ),
    },
    {
      title: t('action'),
      key: 'action',
      render: (text, record, index) => (
        <Space size={'small'}>
          <Button
            type="primary"
            className="bg-yellow-600 text-white hover:!text-white hover:!bg-yellow-500"
            size="large"
            icon={<EditOutlined />}
            onChange={handleActionWithProduct}
          />
        </Space>
      ),
    },
  ];

  const hexString = useMemo(() => (typeof colorHex === 'string' ? colorHex : colorHex.toHexString()), [colorHex]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleSwitchStatus = (id: string, status: boolean) => {
    updateProductStatusMutate({ id, status: !status });
  };

  const handleActionWithProduct = async () => {
    const values = await form.validateFields();
    if (values) {
      if (values.colorCode) {
        values.colorCode = `#${typeof colorHex == 'string' ? colorHex : colorHex.toHex()}`;
      }
      const mediaIds = fileList.map((i) => i.response.data._id);

      createProductMutateAsync({ ...values, mediaIds })
        .then(() => {
          message.success(t('create_product_success'));
          form.resetFields();
          setFileList([]);
          setOpenModal(false);
        })
        .catch(() => {
          message.destroy('create_product_fail');
        });
    }
  };

  const handleChangeImageList: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <>
      <div className="w-full flex justify-end">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          <PlusOutlined />
        </Button>
      </div>
      <Modal
        title={t('product_info')}
        centered
        open={openModal}
        onOk={() => handleActionWithProduct()}
        onCancel={() => {
          form.resetFields();
          setFileList([]);
          setOpenModal(false);
        }}
        width={1000}
      >
        <Upload
          action={`${GATEWAY.root}${GATEWAY.upload.single_upload}`}
          headers={{
            'Accept-Language': 'vi',
            Authorization: `Bearer ${getCookie('accessToken')}`,
          }}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChangeImageList}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Form layout="vertical" form={form}>
          <Form.Item>
            <Form.Item label={'SKU'} name={'sku'}>
              <Input />
            </Form.Item>
            <Form.Item label={t('product_name')} name={'name'}>
              <Input />
            </Form.Item>
            <Form.Item label={t('category_name')} name={'categoryId'}>
              <Select
                value={parentCategoryId}
                onChange={(e) => setParentCategoryId(e)}
                options={allCategories?.data.map((category) => ({ label: category.name, value: category._id }))}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item label={t('color_name')} name={'colorName'}>
              <Input />
            </Form.Item>
            <Form.Item label={t('color_code')} name={'colorCode'}>
              <ColorPicker format={formatHex} value={colorHex} onChange={setColorHex} onFormatChange={setFormatHex} />
            </Form.Item>
          </Form.Item>
          <Form.Item label={t('price')} name="price">
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Form.Item label={'Ram'} name={'ram'}>
              <InputNumber />
            </Form.Item>
            <Form.Item label={`${t('unit')} ram`} name={'ramUnit'}>
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item label={'Rom'} name={'rom'}>
              <InputNumber />
            </Form.Item>
            <Form.Item label={`${t('unit')} rom`} name={'romUnit'}>
              <Input />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={allProducts?.data} />
    </>
  );
}
