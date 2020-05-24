import api from '../services/api';
import { Response } from './index';
import { User } from '../store/system/types';
import { Credential } from '../store/system/actions';

const resource = '/auth';

interface Authenticated {
  token: string;
  user: User;
}

interface RegisterProps {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ResetPassword {
  email: string;
}

interface ChangePassword {
  password: string;
  newPassword: string;
}

const authRepository = {
  async authenticate(credential: Credential) {
    const { data } = await api.post<Authenticated>(`${resource}/login`, credential);
    return data;
  },

  async register(registerData: RegisterProps) {
    const { data } = await api.post<Response>(`${resource}/register`, registerData);
    return data;
  },

  async resetPassword({ email }: ResetPassword) {
    const { data } = await api.put<Response>(`${resource}/reset`, { email });
    return data;
  },

  async changePassword({ password, newPassword }: ChangePassword) {
    const { data } = await api.put<Response>(`${resource}/change`, { password, newPassword });
    return data;
  },
};

export default authRepository;
