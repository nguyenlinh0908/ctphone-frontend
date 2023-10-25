import { ICreateCategoryInput } from '@interfaces/category/category.interface';
import { CategoryService } from '@services/category.service';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const categoryService = new CategoryService();

export const useAllCategories = () => {
  return useQuery('allCategories', () => categoryService.allCategories());
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation('createCategory', (data: ICreateCategoryInput) => categoryService.create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('allCategories');
    },
  });
};
