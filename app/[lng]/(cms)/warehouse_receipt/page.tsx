'use client';

import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useTranslation } from '@i18n';
import {
  IWarehouseReceipt,
  IWarehouseReceiptInput,
  IWarehouseReceiptProductDetail,
  IWarehouseReceiptProductInput,
  WarehouseReceiptStatus,
} from '@interfaces/warehouse_receipt/warehouse-receipt.interface';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Table, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAllProducts } from '../product/services/apis';
import {
  useAllWarehouseReceipts,
  useCreateWarehouseReceipt,
  useUpdateStatusWarehouseReceipt,
  useUpdateWarehouseReceipt,
  useWarehouseReceiptById,
  useWarehouseReceiptDetail,
} from './services/apis';
import { formatPrice } from '@utils/string';
import dayjs from 'dayjs';

export default function WarehouseReceiptPage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const [openModal, setOpenModal] = useState(false);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [warehouseReceiptEditingId, setWarehouseReceiptEditingId] = useState('');

  const [form] = useForm<IWarehouseReceiptInput>();
  const [formAddProduct] = useForm<IWarehouseReceiptProductInput>();
  const [warehouseReceiptInput, setWarehouseReceiptInput] = useState<IWarehouseReceiptInput>({
    delivererName: '',
    deliveryTime: '',
    products: [],
  });
  const { data: allProducts } = useAllProducts();
  const { data: allWarehouseReceipts } = useAllWarehouseReceipts();
  const { mutateAsync: createWarehouseReceiptAsync } = useCreateWarehouseReceipt();
  const [viewWarehouseReceiptDetailId, setViewWarehouseReceiptDetailId] = useState('');
  const { data: warehouseReceiptDetail } = useWarehouseReceiptDetail(viewWarehouseReceiptDetailId);
  const { mutateAsync: updateStatusWarehouseReceiptMutateAsync } = useUpdateStatusWarehouseReceipt();
  const {
    data: warehouseReceiptEditingData,
    isSuccess: getWarehouseReceiptEditingSuccess,
  } = useWarehouseReceiptById(warehouseReceiptEditingId);
  const { mutateAsync: updateWarehouseReceiptMutateAsync } = useUpdateWarehouseReceipt();

  useEffect(() => {
    form;
    if (getWarehouseReceiptEditingSuccess) {
      form.setFieldValue('delivererName', warehouseReceiptEditingData.data.delivererName);
      form.setFieldValue('deliveryTime', dayjs(warehouseReceiptEditingData.data.deliveryTime));
      if (warehouseReceiptEditingData.data.details && warehouseReceiptEditingData.data.details.length > 0) {
        const products: IWarehouseReceiptProductInput[] = warehouseReceiptEditingData.data.details.map((i) => {
          return {
            _id: i._id,
            productId: i.product?._id || '',
            amount: i.amount,
            quantity: i.quantity,
            name: i.product?.name || '',
          };
        });
        setWarehouseReceiptInput((pre) => {
          return { ...pre, products };
        });
      }

      setOpenModal(true);
    }
  }, [getWarehouseReceiptEditingSuccess]);

  const handleDeleteWarehouseReceiptDetailEditing = (itemIdx: number) => {
    setWarehouseReceiptInput((pre) => {
      const products = pre.products;
      products.splice(itemIdx, 1);
      return { ...pre, products };
    });
  };

  const columns: ColumnsType<IWarehouseReceipt> = [
    {
      title: '#',
      key: 'index',
      width: '5%',
      render: (text, record, index) => ++index,
    },
    {
      title: t('deliverer_name'),
      key: 'delivererName',
      width: '25%',
      render: (text, record, index) => record.delivererName,
    },
    {
      title: t('delivery_date'),
      key: 'deliveryDate',
      width: '25%',
      render: (text, record, index) => dayjs(record.deliveryTime).format('DD/MM/YYYY'),
    },
    {
      title: t('status'),
      key: 'status',
      width: '10%',
      render: (text, record, index) => {
        switch (record.status) {
          case WarehouseReceiptStatus.PENDING:
            return <span className="text-yellow-600">{t('pending')}</span>;
          case WarehouseReceiptStatus.SUCCESS:
            return <span className="text-green-600">{t('success')}</span>;
          case WarehouseReceiptStatus.CANCEL:
            return <span className="text-red-600">{t('cancel')}</span>;
          default:
            return <span className="text-yellow-600">{t('pending')}</span>;
        }
      },
    },
    {
      title: t('quantity'),
      key: 'totalQuantity',
      width: '10%',
      render: (text, record, index) => record.totalQuantity,
    },
    {
      title: t('amount'),
      key: 'totalAmount',
      width: '10%',
      render: (text, record, index) => formatPrice(record.totalAmount.toString()),
    },
    {
      title: t('action'),
      key: 'action',
      render: (text, record, index) => (
        <Space size={'small'}>
          <Button onClick={() => handleViewDetail(record._id)} type="primary" size="large" icon={<EyeOutlined />} />
          {record.status == WarehouseReceiptStatus.PENDING && (
            <>
              <Button
                className="bg-yellow-600 text-white hover:!text-white hover:!bg-yellow-500"
                size="large"
                icon={<EditOutlined />}
                onClick={() => onClickEditing(record._id)}
              />

              <Popconfirm
                key={'1'}
                title={t('change_order_status')}
                description={t('do_want_change_order_status')}
                onConfirm={() => handleConfirmWarehouseReceipt(record._id, WarehouseReceiptStatus.SUCCESS)}
                onCancel={() => {}}
                okText={t('yes')}
                cancelText={t('no')}
              >
                <Button
                  type="primary"
                  className="bg-green-600 text-white hover:!text-white hover:!bg-green-500"
                  size="large"
                  icon={<CheckCircleOutlined key="1" />}
                />
              </Popconfirm>

              <Popconfirm
                key={'2'}
                title={t('change_order_status')}
                description={t('do_want_change_order_status')}
                onConfirm={() => handleConfirmWarehouseReceipt(record._id, WarehouseReceiptStatus.CANCEL)}
                onCancel={() => {}}
                okText={t('yes')}
                cancelText={t('no')}
              >
                <Button type="primary" danger size="large" icon={<DeleteOutlined />} />
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  const columnsCreateForm: ColumnsType<IWarehouseReceiptProductInput> = [
    {
      title: '#',
      key: 'index',
      width: '5%',
      render: (text, record, index) => ++index,
    },
    {
      title: t('product_name'),
      key: 'name',
      render: (text, record, index) => record.name,
    },
    {
      title: t('quantity'),
      key: 'quantity',
      render: (text, record, index) => record.quantity,
    },
    {
      title: t('amount'),
      key: 'amount',
      render: (text, record, index) => formatPrice(record.amount.toString()),
    },
    {
      title: t('action'),
      key: 'action',
      render: (text, record, index) => (
        <Button
          type="primary"
          className="bg-red-600 text-white hover:!text-white hover:!bg-red-500"
          size="large"
          icon={<DeleteOutlined />}
          onClick={() => {
            if (warehouseReceiptEditingId == '') {
              handleRemoveProductsInWarehouseReceiptInput(index);
            } else {
              handleDeleteWarehouseReceiptDetailEditing(index);
            }
          }}
        />
      ),
    },
  ];

  const columnsWarehouseReceiptDetail: ColumnsType<IWarehouseReceiptProductDetail> = [
    {
      title: '#',
      key: 'index',
      width: '5%',
      render: (text, record, index) => ++index,
    },
    {
      title: t('product_name'),
      key: 'name',
      render: (text, record, index) => record.productId.name,
    },
    {
      title: t('quantity'),
      key: 'quantity',
      render: (text, record, index) => record.quantity,
    },
    {
      title: t('amount'),
      key: 'amount',
      render: (text, record, index) => record.amount,
    },
  ];

  const filterProductOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handleAddProductsInWarehouseReceiptInput = async () => {
    const productValues = await formAddProduct.validateFields();
    const productIdAndName = productValues.productId.split('|');

    const idxProductExisted = warehouseReceiptInput?.products.findIndex(
      (product) => product.productId == productIdAndName[0],
    );
    if (idxProductExisted > -1) {
      let temp = warehouseReceiptInput.products;
      temp[idxProductExisted].amount += productValues.amount;
      temp[idxProductExisted].quantity += productValues.quantity;
      setWarehouseReceiptInput({
        ...warehouseReceiptInput,
        products: temp,
      });
    } else {
      setWarehouseReceiptInput({
        ...warehouseReceiptInput,
        products: [
          ...warehouseReceiptInput.products,
          { ...productValues, productId: productIdAndName[0], name: productIdAndName[1] },
        ],
      });
    }
    formAddProduct.resetFields();
    setOpenAddProductModal(false);
  };

  const handleRemoveProductsInWarehouseReceiptInput = (itemIdx: number) => {
    warehouseReceiptInput.products.splice(itemIdx, 1);
    setWarehouseReceiptInput({ ...warehouseReceiptInput, products: warehouseReceiptInput.products });
  };

  const handleCreateWarehouseReceipt = async () => {
    const warehouseReceiptValues = await form.validateFields();
    if (warehouseReceiptEditingId == '') {
      createWarehouseReceiptAsync({ ...warehouseReceiptValues, products: warehouseReceiptInput.products })
        .then((data) => {
          form.resetFields();
          message.success('success');
        })
        .catch(() => message.destroy('fail'));
    } else {
      updateWarehouseReceiptMutateAsync({
        warehouseReceiptId: warehouseReceiptEditingId,
        ...warehouseReceiptValues,
        products: warehouseReceiptInput.products,
      })
        .then((data) => {
          console.log('data :>> ', data);
          message.success('success');
        })
        .catch((err) => {
          console.log('error', err);
          message.error(err);
        })
        .finally(() => {
          setWarehouseReceiptEditingId('');
          form.resetFields();
        });
    }

    setOpenModal(false);
    setWarehouseReceiptEditingId('');
  };

  const handleViewDetail = (warehouseReceiptId: string) => {
    setViewWarehouseReceiptDetailId(warehouseReceiptId);
    setOpenDetailModal(true);
  };

  const handleConfirmWarehouseReceipt = (warehouseReceiptId: string, status: WarehouseReceiptStatus) => {
    updateStatusWarehouseReceiptMutateAsync({ warehouseReceiptId, status })
      .then(() => message.success('update success'))
      .catch(() => message.error('update fail'));
  };

  const onClickEditing = (warehouseReceiptId: string) => {
    if (warehouseReceiptEditingId != warehouseReceiptId) setWarehouseReceiptEditingId(warehouseReceiptId);
    setOpenModal(true);
  };

  return (
    <>
      <div className="w-full flex justify-end">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          <PlusOutlined />
        </Button>
      </div>
      <Modal
        title={t('warehouse_receipt_info')}
        centered
        open={openModal}
        onOk={handleCreateWarehouseReceipt}
        onCancel={() => {
          setOpenModal(false);
          setWarehouseReceiptEditingId('');
        }}
        width={1000}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label={t('deliverer_name')} name={'delivererName'}>
            <Input />
          </Form.Item>
          <Form.Item label={t('delivery_date')} name={'deliveryTime'}>
            <DatePicker format={'DD/MM/YYYY'} placeholder={t('select_delivery_date') || 'Chọn thời gian giao hàng'} />
          </Form.Item>
        </Form>
        <div className="w-full flex justify-end">
          <Button type="primary" onClick={() => setOpenAddProductModal(true)}>
            <PlusOutlined />
          </Button>
        </div>
        <Table
          columns={columnsCreateForm}
          dataSource={
            warehouseReceiptInput && warehouseReceiptInput?.products.length > 0 ? warehouseReceiptInput.products : []
          }
        />
      </Modal>

      <Modal
        title={t('product_info')}
        centered
        open={openAddProductModal}
        onOk={handleAddProductsInWarehouseReceiptInput}
        onCancel={() => setOpenAddProductModal(false)}
      >
        <Form form={formAddProduct} layout='vertical'>
          <Form.Item label={t('product')} name={'productId'}>
            <Select
              placeholder={t('select_product')}
              optionFilterProp="children"
              onChange={() => {}}
              filterOption={filterProductOption}
              options={allProducts?.data.map((product) => ({
                label: product.name,
                value: `${product._id}|${product.name}`,
              }))}
            />
          </Form.Item>
          <Form.Item label={t('quantity')} name={'quantity'}>
            <InputNumber min={0}></InputNumber>
          </Form.Item>
          <Form.Item label={t('amount')} name={'amount'}>
            <InputNumber className="w-56" min={0}></InputNumber>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={t('product_info')}
        centered
        open={openDetailModal}
        onOk={() => setOpenDetailModal(false)}
        onCancel={() => setOpenDetailModal(false)}
      >
        <Table
          columns={columnsWarehouseReceiptDetail}
          dataSource={warehouseReceiptDetail?.data && warehouseReceiptDetail.data}
        />
      </Modal>

      <Table columns={columns} dataSource={allWarehouseReceipts?.data} />
    </>
  );
}
