import { ICost, IResAPI } from '@interfaces/base-response.interface';
import {
  IUpdateWarehouseReceiptProductInput,
  IWarehouseReceipt,
  IWarehouseReceiptInput,
  IWarehouseReceiptProductDetail,
} from '@interfaces/warehouse_receipt/warehouse-receipt.interface';
import { BaseService, GATEWAY } from './base';

export class WarehouseReceiptService {
  private warehouseReceiptService: BaseService;

  constructor() {
    this.warehouseReceiptService = new BaseService();
  }

  create(data: IWarehouseReceiptInput) {
    return this.warehouseReceiptService.post<IWarehouseReceiptInput, IResAPI<IWarehouseReceipt>>({
      url: GATEWAY.warehouse_receipt.create,
      data,
    });
  }

  all() {
    return this.warehouseReceiptService.get<IResAPI<IWarehouseReceipt[]>>({ url: GATEWAY.warehouse_receipt.all });
  }

  detail(warehouseReceiptId: string) {
    return this.warehouseReceiptService.get<IResAPI<IWarehouseReceiptProductDetail[]>>({
      url: GATEWAY.warehouse_receipt.detail.replace(':id', warehouseReceiptId),
    });
  }

  updateStatus(data: IUpdateWarehouseReceiptProductInput) {
    const id = data.warehouseReceiptId;
    delete data.warehouseReceiptId;

    return this.warehouseReceiptService.patch<IUpdateWarehouseReceiptProductInput, IResAPI<IWarehouseReceipt>>({
      url: GATEWAY.warehouse_receipt.update.replace(':id', id || ''),
      data,
    });
  }

  totalCost() {
    return this.warehouseReceiptService.get<IResAPI<ICost>>({ url: GATEWAY.warehouse_receipt.cost });
  }

  costByMonths() {
    return this.warehouseReceiptService.get<IResAPI<ICost[]>>({ url: GATEWAY.warehouse_receipt.cost_by_months });
  }
}
