import { IResAPI } from '@interfaces/base-response.interface';
import { BaseService, GATEWAY } from './base';
import { IMedia } from '@interfaces/upload/media.interface';

export class UploadService {
  private uploadService: BaseService;

  constructor() {
    this.uploadService = new BaseService();
  }

  singleUpload(data: FormData) {
    return this.uploadService.post<FormData, IResAPI<IMedia>>({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: GATEWAY.upload.single_upload,
      data,
    });
  }
}
