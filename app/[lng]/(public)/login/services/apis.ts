import { ILoginInput, ILoginResponse } from '@interfaces/auth/auth.interface';
import { AuthService } from '@services/auth.service';
import { useMutation } from 'react-query';
import { setCookie } from 'cookies-next';

const authService = new AuthService();

export const useLogin = () => {
  return useMutation(
    'login',
    (body: ILoginInput): Promise<ILoginResponse> => {
      return authService.login(body);
    },
    {
      onSuccess: (data: ILoginResponse) => {
        console.log("access", data?.accessToken)
        console.log("access", data?.refreshToken)

        setCookie('accessToken', data.accessToken, { expires: new Date(data.accessTokenExpiresIn) });
        setCookie('refreshToken', data.refreshToken, { expires: new Date(data.refreshTokenExpiresIn) });
      },
    },
  );
};
