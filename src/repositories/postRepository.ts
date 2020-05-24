import api from '../services/api';
import { Response } from './index';
import { PostProps } from '../store/timeline/types';

const resource = '/post';

export interface PostList {
  posts: PostProps[],
  count: number;
}

export interface GetProps {
  page: number;
  userId?: number;
}

interface CreateProps {
  text: string;
  file: File | null;
}

interface UpdateProps {
  postId: number;
  text: string;
}

const postRepository = {
  async get(params: GetProps) {
    const { data } = await api.get<PostList>(`${resource}`, { params });
    return data;
  },

  async create({ text, file }: CreateProps) {
    const formData = new FormData();
    formData.append('text', text);
    if (file) {
      formData.append('file', file);
    }
    const { data } = await api.post<Response>(`${resource}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async update({ postId, text }: UpdateProps) {
    const { data } = await api.put<Response>(`${resource}/${postId}`, { text });
    return data;
  },

  async delete({ postId }: { postId: number }) {
    const { data } = await api.delete<Response>(`${resource}/${postId}`);
    return data;
  },

  async like({ postId }: { postId: number }) {
    const { data } = await api.post<Response>(`${resource}/${postId}/like`);
    return data;
  },

  async deslike({ postId }: { postId: number }) {
    const { data } = await api.delete<Response>(`${resource}/${postId}/dislike`);
    return data;
  },
};

export default postRepository;
