import { AuthService } from '@services/auth.service';
import { useQuery } from 'react-query';

const authService = new AuthService();

export const useProfile = () => {
  return useQuery('profile', () => authService.profile());
};
