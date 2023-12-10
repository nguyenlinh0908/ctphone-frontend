'use client';

import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from '@i18n';
import { DeliveryAddressType } from '@interfaces/delivery_address/delivery_address.interface';
import { Button, Form, Input, List, Modal, Popconfirm, Radio, RadioChangeEvent, Select, Skeleton, message } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  useCreateDeliveryAddress,
  useDeleteDeliveryAddress,
  useDeliveryAddress,
  useDistricts,
  useMyDeliveryAddress,
  useProvinces,
  useWards,
  useUpdateDeliveryAddress,
} from './services/apis';

export default function DeliveryAddressPage() {
  const { lng } = useParams();
  const { t } = useTranslation(lng);
  const { data } = useMyDeliveryAddress();
  const [openModal, setOpenModal] = useState(false);
  const [provinceId, setProvinceId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedDeliveryAddressId, setEditedDeliveryAddressId] = useState('');
  const [form] = useForm();
  const { data: provincesData } = useProvinces();
  const { data: districtsData } = useDistricts(provinceId);
  const { data: wardsData } = useWards(districtId);
  const [typeAddress, setTypeAddress] = useState(DeliveryAddressType.HOME);
  const [isDefault, setIsDefault] = useState(false);
  const { mutate: createDeliveryAddressMutate, isSuccess } = useCreateDeliveryAddress();
  const { mutate: deleteDeliveryAddressMutate, isSuccess: deleteSuccess } = useDeleteDeliveryAddress();
  const { data: editedDeliveryAddressData, isSuccess: editedDeliveryAddressIdSuccess } =
    useDeliveryAddress(editedDeliveryAddressId);
  const { mutate: updateDeliveryAddressMutate, isSuccess: updateDeliveryAddressSuccess } = useUpdateDeliveryAddress();

  useEffect(() => {
    form.resetFields();
    setOpenModal(false);
    if (isSuccess) message.success('Thêm địa chỉ thành công');
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess) message.success('Xóa địa chỉ thành công');
  }, [deleteSuccess]);

  useEffect(() => {
    if (editedDeliveryAddressIdSuccess) {
      setIsDefault(editedDeliveryAddressData.data.isDefault);
      form.setFieldsValue({ ...editedDeliveryAddressData.data });
    }
  }, [editedDeliveryAddressIdSuccess]);

  useEffect(() => {
    if (updateDeliveryAddressSuccess) message.success('Cập nhật địa chỉ thành công');
    setIsEditing(false);
    setOpenModal(false);
  }, [updateDeliveryAddressSuccess]);

  const typeAddressOptions = [
    { label: t('home'), value: DeliveryAddressType.HOME },
    { label: t('company'), value: DeliveryAddressType.COMPANY },
  ];

  const handleActionWithDeliveryAddress = async () => {
    const values = await form.validateFields();
    const [provinceId, province] = values?.province.split('|');
    const [districtId, district] = values?.district.split('|');
    const [wardId, ward] = values?.ward.split('|');
    if (!isEditing) {
      createDeliveryAddressMutate({
        ...values,
        province,
        provinceId,
        districtId,
        district,
        wardId,
        ward,
        isDefault,
        type: typeAddress,
      });
    } else {
      updateDeliveryAddressMutate({
        id: editedDeliveryAddressId,
        data: values,
      });
    }
  };

  const typeAddressOnChange = ({ target: { value } }: RadioChangeEvent) => {
    setTypeAddress(value);
  };

  const onChangeDefaultAddress = (e: CheckboxChangeEvent) => {
    setIsDefault(!isDefault);
  };

  const handleEditDeliveryAddress = (id: string) => {
    setEditedDeliveryAddressId(id);
    setIsEditing(true);
    setOpenModal(true);
  };

  return (
    <>
      <Button className="w-full mt-3" type="dashed" onClick={() => setOpenModal(true)}>
        <PlusOutlined />
        Thêm địa chỉ mới
      </Button>
      <List
        className=""
        itemLayout="horizontal"
        dataSource={data?.data || []}
        renderItem={(item, index) => (
          <List.Item
            className="bg-white my-3 p-3"
            actions={[
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleEditDeliveryAddress(item._id)}
                key="list-loadmore-edit"
              >
                {t('edit')}
              </span>,
              <Popconfirm
                key="ist-loadmore-delete"
                placement="right"
                onConfirm={() => {
                  if (item.isDefault) {
                    message.warning('Không thể xóa địa chỉ mặc định');
                  } else {
                    deleteDeliveryAddressMutate(item._id);
                  }
                }}
                okText="Yes"
                cancelText="No"
                title={t('delete_product_confirm')}
              >
                <span style={{ cursor: 'pointer' }} className="text-red-600" key="list-loadmore-more">
                  {t('delete')}
                </span>
              </Popconfirm>,
            ]}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                className="px-3"
                title={
                  <>
                    <span>{item.fullName} </span>
                    <span className="text-blue-300"> {item.isDefault ? t('default_address') : ''}</span>
                  </>
                }
                description={
                  <>
                    <p>
                      {t('address')}: {item.address},{item.ward},{item.district},{item.province}
                    </p>
                    <p>
                      {t('phone')}: {item.phone}
                    </p>
                  </>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <Modal
        title={t('delivery_address')}
        centered
        open={openModal}
        onOk={() => handleActionWithDeliveryAddress()}
        onCancel={() => {
          form.resetFields();
          setOpenModal(false);
          setIsEditing(false);
        }}
        width={1000}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label={t('full_name')}
            name={'fullName'}
            required={true}
            rules={[
              {
                required: true,
                message: 'Không được bỏ trông họ tên',
              },
              {
                validator: (rule: any, value: string, callback: (message?: string) => void) => {
                  // Check if the input is not empty
                  if (!value) {
                    callback('Không được bỏ trông họ tên');
                  } else {
                    // Check if the input contains special characters
                    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

                    if (specialCharRegex.test(value)) {
                      callback('Họ tên không chứa ký tự đặc biệt');
                    } else {
                      callback();
                    }
                  }
                },
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item label={t('company')} name={'company'}>
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label={t('phone')}
            name={'phone'}
            required={true}
            rules={[
              {
                required: true,
                message: 'Số điện thoại là bắt buộc',
              },
              {
                validator: (rule: any, value: string, callback: (message?: string) => void) => {
                  // Validate Vietnamese phone number format
                  const vietnamesePhoneRegex = /^\+84\d{9,10}$/;
                  if (!vietnamesePhoneRegex.test(value)) {
                    callback('Format không đúng số điện thoại');
                  } else {
                    callback();
                  }
                },
              },
            ]}
          >
            <Input type="tel" />
          </Form.Item>
          <Form.Item label={t('province')} name={'province'} required={true}>
            <Select
              style={{ width: 320 }}
              allowClear
              options={
                provincesData?.data && provincesData?.data.length
                  ? provincesData.data.map((item) => {
                      return { value: `${item.code}|${item.name}`, label: item.name };
                    })
                  : []
              }
              onSelect={(value: string) => setProvinceId(value.split('|')[0])}
            />
          </Form.Item>
          <Form.Item label={t('district')} name={'district'} required={true}>
            <Select
              style={{ width: 320 }}
              allowClear
              options={
                districtsData?.data && districtsData?.data.districts.length > 0
                  ? districtsData.data.districts.map((item) => {
                      return { value: `${item.code}|${item.name}`, label: item.name };
                    })
                  : []
              }
              onSelect={(districtValue: string) => setDistrictId(districtValue.split('|')[0])}
            />
          </Form.Item>
          <Form.Item label={t('ward')} name={'ward'} required={true}>
            <Select
              style={{ width: 320 }}
              allowClear
              options={
                wardsData?.data && wardsData?.data.wards.length > 0
                  ? wardsData.data.wards.map((item) => {
                      return { value: `${item.code}|${item.name}`, label: item.name };
                    })
                  : []
              }
            />
          </Form.Item>
          <Form.Item label={t('address')} name={'address'} required={true}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label={'Loại địa chỉ'} name={'type'}>
            <Radio.Group
              defaultValue={DeliveryAddressType.HOME}
              options={typeAddressOptions}
              onChange={typeAddressOnChange}
              value={typeAddress}
            />
          </Form.Item>
          <Form.Item label={t('set_default')} name={'isDefault'} valuePropName="checked">
            <Checkbox value={isDefault} onChange={onChangeDefaultAddress}>
              Đồng ý
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
