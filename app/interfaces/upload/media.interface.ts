export interface IMedia {
  _id: string;
  url: string;
  type: MediaType;
  ownerId?: string;
}

export enum MediaType {
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO',
}
