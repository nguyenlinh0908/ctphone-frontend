import { ILoginInput } from '@models/auth/auth.model';
import { AuthService } from '@services/auth.service';
import { useMutation } from 'react-query';

const authService = new AuthService();

export const useLogin = () => {
  return useMutation(
    'login',
    (body: ILoginInput) => {
      return authService.login(body);
    },
    { onSuccess: (data) => {
      console.log('data :>> ', data);
    } },
  );
};
