import { IRegisterCustomerAccountInput } from '@interfaces/auth/auth.interface';
import { AuthService } from '@services/auth.service';
import { useMutation } from 'react-query';

const authService = new AuthService();

export const useCreateCustomerAccount = () => {
  return useMutation('createCustomerAccount', (createCustomerAccountInput: IRegisterCustomerAccountInput) =>
    authService.registerCustomerAccount(createCustomerAccountInput),
  );
};
