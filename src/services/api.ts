import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/system/actions';

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL,
});

api.defaults.headers.common.Accept = 'application/json';
api.defaults.headers.common['Content-Type'] = 'application/json';

api.interceptors.request.use((config) => {
  const { system } = store.getState();
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${system.token}`,
    },
  };
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response.status === 401) {
      store.dispatch(logout());
    }
    throw error;
  },
);

export default api;
