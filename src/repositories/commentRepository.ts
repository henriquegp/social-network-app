import api from '../services/api';
import { Response } from './index';
import { User } from '../store/system/types';

const resource = (postId: number) => `/post/${postId}/comment`;

export interface Comment {
  commentId: number;
  text: string;
  user: User;
}

interface CommentList {
  comments: Comment[],
  lastPage: number;
  count: number;
}

interface GetProps {
  page: number;
  postId: number;
}

interface CreateProps {
  text: string;
  postId: number;
}

interface CreateResponse extends Response {
  comment: Comment;
}

interface DeleteProps {
  postId: number;
  commentId: number;
}

interface UpdateProps extends DeleteProps {
  text: string;
}

const commentRepository = {
  async get({ postId, page }: GetProps) {
    const { data } = await api.get<CommentList>(`${resource(postId)}`, {
      params: { page },
    });
    return data;
  },

  async create({ postId, text }: CreateProps) {
    const { data } = await api.post<Response>(`${resource(postId)}`, { text });
    return data;
  },

  async update({ postId, commentId, text }: UpdateProps) {
    const { data } = await api.put<Response>(`${resource(postId)}/${commentId}`, { text });
    return data;
  },

  async delete({ postId, commentId }: DeleteProps) {
    const { data } = await api.delete<Response>(`${resource(postId)}/${commentId}`);
    return data;
  },
};

export default commentRepository;
