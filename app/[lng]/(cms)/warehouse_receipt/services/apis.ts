import {
  IUpdateWarehouseReceiptProductInput,
  IWarehouseReceiptInput,
} from '@interfaces/warehouse_receipt/warehouse-receipt.interface';
import { WarehouseReceiptService } from '@services/warehouse--receipt.service';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const warehouseReceiptService = new WarehouseReceiptService();

export const useAllWarehouseReceipts = () => {
  return useQuery('allWarehouseReceipt', () => warehouseReceiptService.all());
};

export const useCreateWarehouseReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation('createWarehouseReceipt', (data: IWarehouseReceiptInput) => warehouseReceiptService.create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('allWarehouseReceipt');
    },
  });
};

export const useUpdateStatusWarehouseReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation(
    'updateWarehouseReceipt',
    (data: IUpdateWarehouseReceiptProductInput) => warehouseReceiptService.updateStatus(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('allWarehouseReceipt');
      },
    },
  );
};

export const useWarehouseReceiptDetail = (id: string) => {
  return useQuery(`warehouseReceiptDetail${id}`, () => warehouseReceiptService.detail(id), { enabled: !!id });
};
