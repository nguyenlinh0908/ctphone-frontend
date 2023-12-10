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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button

  ['link', 'image', 'video'], // link and image, video
];

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
  const [ramUnit, setRamUnit] = useState('GB');
  const [romUnit, setRomUnit] = useState('GB');
  const [description, setDescription] = useState('');

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
      render: (text, record, index) => (
        <span className={record.quantity < 5 ? 'text-yellow-600' : ''}>{record.quantity}</span>
      ),
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
      key: 'enable',
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
      console.log('object :>> ', values, description);
      createProductMutateAsync({ ...values, mediaIds, description, romUnit, ramUnit })
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
        style={{
          overflowY: 'auto', // Enable vertical scrolling
          maxHeight: '100vh', // Set a maximum height if needed
        }}
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
          <div className="flex justify-start items-center gap-3">
            <Form.Item
              label={'SKU'}
              name={'sku'}
              rules={[
                {
                  required: true,
                  message: 'Mã sku là bắt buộc',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('product_name')}
              name={'name'}
              rules={[
                {
                  required: true,
                  message: 'Tên sản phẩm là bắt buộc',
                },
              ]}
            >
              <Input className="!w-48" />
            </Form.Item>
            <Form.Item label={t('category_name')} name={'categoryId'}>
              <Select
                className="!w-48"
                value={parentCategoryId}
                onChange={(e) => setParentCategoryId(e)}
                options={allCategories?.data.map((category) => ({ label: category.name, value: category._id }))}
              />
            </Form.Item>
          </div>

          <div className="flex justify-start items-center gap-3">
            <Form.Item
              label={t('color_name')}
              name={'colorName'}
              rules={[
                {
                  required: true,
                  message: 'Tên màu sản phẩm là bắt buộc',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('color_code')}
              name={'colorCode'}
              rules={[
                {
                  required: true,
                  message: 'Mã màu sản phẩm là bắt buộc',
                },
              ]}
            >
              <ColorPicker format={formatHex} value={colorHex} onChange={setColorHex} onFormatChange={setFormatHex} />
            </Form.Item>
          </div>

          <div className="flex justify-start gap-3">
            <Form.Item
              label={t('price')}
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Giá bán sản phẩm là bắt buộc',
                },
              ]}
            >
              <InputNumber min={0} className="!w-64" />
            </Form.Item>
            <Form.Item label={t('starting_price')} name="startingPrice" rules={[{ required: false }]}>
              <InputNumber min={0} className="!w-64" />
            </Form.Item>
          </div>

          <div className="flex justify-start items-center gap-3">
            <Form.Item label={'Ram'} name={'ram'} rules={[{ required: true, message: 'Số lượng ram là bắt buộc' }]}>
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item label={`${t('unit')} ram`} name={'ramUnit'}>
              <Select
                className="!w-48"
                defaultValue={ramUnit}
                onChange={(e) => setRamUnit(e)}
                options={[
                  {
                    value: 'MB',
                    label: 'Megabyte (MB)',
                  },
                  {
                    value: 'GB',
                    label: 'Gigabyte (GB)',
                  },
                  {
                    value: 'TB',
                    label: 'Terabyte (TB)',
                  },
                ]}
              />
            </Form.Item>
          </div>

          <div className="flex justify-start items-center gap-3">
            <Form.Item label={'Rom'} name={'rom'} rules={[{ required: true, message: 'Số lượng rom là bắt buộc' }]}>
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item label={`${t('unit')} rom`} name={'romUnit'}>
              <Select
                className="!w-48"
                defaultValue={romUnit}
                onChange={(e) => setRomUnit(e)}
                options={[
                  {
                    value: 'MB',
                    label: 'Megabyte (MB)',
                  },
                  {
                    value: 'GB',
                    label: 'Gigabyte (GB)',
                  },
                  {
                    value: 'TB',
                    label: 'Terabyte (TB)',
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="description" label={t('description')} rules={[{ required: false }]}>
              <ReactQuill
                modules={{
                  toolbar: toolbarOptions,
                }}
                theme="snow"
                style={{ height: 256 }}
                onChange={(value: string) => setDescription(value)}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={allProducts?.data} />
    </>
  );
}
