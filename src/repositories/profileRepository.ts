import api from '../services/api';
import { Response } from './index';
import { User, Profile } from '../store/system/types';

const resource = '/profile';

interface ProfileByUsernameResponse extends Profile {
  userId: number;
  countPosts: number;
  countFollowers: number;
  countFollowing: number;
  isFollowing: boolean;
}

interface UpdateProps {
  name: string;
  about: string;
  privated: boolean;
}

interface SetPictureProps {
  picture: File;
}

interface SetPictureResponse extends Response {
  src: string;
}

const profileRepository = {
  async getProfile({ userId }: { userId: number }) {
    const { data } = await api.get<Profile>(`${resource}/${userId}`);
    return data;
  },

  async getProfileByUsername({ username }: { username: string }) {
    const { data } = await api.get<ProfileByUsernameResponse>(`${resource}/username/${username}`);
    return data;
  },

  async searchProfile({ name }: { name: string }) {
    const { data } = await api.get<User[]>(`${resource}`, { params: { name } });
    return data;
  },

  async update(props: UpdateProps) {
    const { data } = await api.put<Response>(`${resource}`, props);
    return data;
  },

  async setPicture({ picture }: SetPictureProps) {
    const formData = new FormData();
    formData.append('picture', picture);

    const { data } = await api.put<SetPictureResponse>(`${resource}/picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async follow({ userId }: { userId: number }) {
    const { data } = await api.post<Response>(`${resource}/${userId}/follow`);
    return data;
  },

  async unfollow({ userId }: { userId: number }) {
    const { data } = await api.delete<Response>(`${resource}/${userId}/unfollow`);
    return data;
  },
};

export default profileRepository;
