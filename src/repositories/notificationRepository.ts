import api from '../services/api';
import { Response } from './index';
import { User } from '../store/system/types';

const resource = '/notification';

export interface Notification {
  notificationId: number;
  text: string;
  seen: number;
  user: User;
}

const notificationRepository = {
  async get() {
    const { data } = await api.get<Notification[]>(`${resource}`);
    return data;
  },

  async seen() {
    const { data } = await api.put<Response>(`${resource}`);
    return data;
  },
};

export default notificationRepository;
