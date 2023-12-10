import { ICreateDeliveryAddress } from '@interfaces/delivery_address/delivery_address.interface';
import { DeliveryAddressService } from '@services/delivery-address.service';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const deliveryAddressService = new DeliveryAddressService();

export const useMyDeliveryAddress = () => {
  return useQuery('myDeliveryAddress', () => deliveryAddressService.myDeliveryAddress());
};

export const useProvinces = () => {
  return useQuery('provinces', () => deliveryAddressService.provinces());
};

export const useDistricts = (provinceId: string) => {
  return useQuery('districts', () => deliveryAddressService.districts(provinceId), { enabled: !!provinceId });
};

export const useWards = (districtId: string) => {
  return useQuery('wards', () => deliveryAddressService.wards(districtId), { enabled: !!districtId });
};

export const useCreateDeliveryAddress = () => {
  const queryClient = useQueryClient();

  return useMutation('createDeliveryAddress', (data: ICreateDeliveryAddress) => deliveryAddressService.create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('myDeliveryAddress');
    },
  });
};

export const useDeleteDeliveryAddress = () => {
  const queryClient = useQueryClient();
  return useMutation('deleteDeliveryAddress', (id: string) => deliveryAddressService.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('myDeliveryAddress');
    },
  });
};

export const useDeliveryAddress = (id: string) => {
  return useQuery(`deliveryAddress${id}`, () => deliveryAddressService.deliveryAddress(id), { enabled: !!id });
};

export const useUpdateDeliveryAddress = () => {
  const queryClient = useQueryClient();

  return useMutation(
    'updateDeliveryAddress',
    ({ id, data }: { id: string; data: ICreateDeliveryAddress }) => deliveryAddressService.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('myDeliveryAddress');
      },
    },
  );
};
