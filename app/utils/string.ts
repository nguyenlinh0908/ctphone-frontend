import dayjs from 'dayjs';

export const timestampMongoToDate = (timestamp: string, format: string = 'DD/MM/YYYY') => {
  return dayjs(timestamp).format(format);
};

export const formatPhoneNumber = (phone: string, countryCode: string = '+84') => {
  return phone.replace(countryCode, "0");
};

export const formatPrice = (price:string)=>{
  return Number(price).toLocaleString('vi-VI')
}