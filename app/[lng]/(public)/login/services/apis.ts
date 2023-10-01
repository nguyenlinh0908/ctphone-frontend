import { ILoginInput, ILoginResponse } from '@interfaces/auth/auth.interface';
import { AuthService } from '@services/auth.service';
import { useMutation } from 'react-query';
import { setCookie } from 'cookies-next';
import { IResAPI } from '@interfaces/base-response.interface';

const authService = new AuthService();

export const useLogin = () => {
  return useMutation(
    'login',
    (body: ILoginInput): Promise<IResAPI<ILoginResponse>> => {
      return authService.login(body);
    },
    {
      onSuccess: (data: IResAPI<ILoginResponse>) => {
        setCookie('accessToken', data.data.accessToken, { expires: new Date(data.data.accessTokenExpiresAt) });
        setCookie('refreshToken', data.data.refreshToken, { expires: new Date(data.data.refreshTokenExpiresAt) });
        setCookie('accessTokenExpiresAt', data.data.accessTokenExpiresAt,{ expires: new Date(data.data.accessTokenExpiresAt) });
        setCookie('refreshTokenExpiresAt', data.data.refreshTokenExpiresAt, { expires: new Date(data.data.refreshTokenExpiresAt) });
      },
    },
  );
};
