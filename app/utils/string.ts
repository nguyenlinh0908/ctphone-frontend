import dayjs from 'dayjs';
import * as _ from 'lodash';

export const timestampMongoToDate = (timestamp: string, format: string = 'DD/MM/YYYY') => {
  return dayjs(timestamp).format(format);
};

export const formatPhoneNumber = (phone: string, countryCode: string = '+84') => {
  return phone.replace(countryCode, '0');
};

export const formatPrice = (price: string) => {
  return Number(price).toLocaleString('vi-VI');
};

export const buildQueryString = (obj: Object) => {
  let queryString = '';
  _(obj)
    .toPairs(obj)
    .forEach((i: any, idx: number) => {
      if (i[1]) {
        queryString += `${idx > 0 ? '&' : '?'}${i[0]}=${i[1]}`;
      }
    });

  return queryString;
};
