import { IFilterCategory } from '@interfaces/category/category.interface';
import { IPaginateDto } from '@interfaces/paginate.interface';
import { IProductFilter } from '@interfaces/product/product.interface';
import { AuthService } from '@services/auth.service';
import { CategoryService } from '@services/category.service';
import { ProductService } from '@services/product.service';
import { deleteCookie } from 'cookies-next';
import { useMutation, useQuery } from 'react-query';

const productService = new ProductService();
const categoryService = new CategoryService();
const authService = new AuthService();

export const useNavigationCategories = (filter: IFilterCategory) => {
  return useQuery('navigation', () => categoryService.navigationCategories(filter));
};

export const useProducts = (paginate: IPaginateDto, filter: IProductFilter) => {
  return useQuery([`products`, filter], () => productService.find(paginate, filter), { enabled: !!filter });
};

export const useProfile = () => {
  return useQuery('profile', () => authService.profile());
};

export const useLogout = () => {
  return useMutation(
    'logout',
    ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) =>
      authService.logout({ accessToken, refreshToken }),
    { onSuccess: () => {
      deleteCookie("accessToken")
      deleteCookie("refreshToken")
      deleteCookie("accessTokenExpiresAt")
      deleteCookie("refreshTokenExpiresAt")
      deleteCookie("me")
    } },
  );
};
