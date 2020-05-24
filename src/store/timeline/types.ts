import { User } from '../system/types';
import { Comment } from '../../repositories/commentRepository';

export enum TimelineTypes {
  TIMELINE_RESET = 'timeline/TIMELINE_REQUEST',
  TIMELINE_FAILURE = 'timeline/TIMELINE_FAILURE',
  NEXT_PAGE = 'timeline/NEXT_PAGE',
  NEXT_PAGE_SUCCESS = 'timeline/NEXT_PAGE_SUCCESS',
  NEXT_PAGE_FINISH = 'timeline/NEXT_PAGE_FINISH',
  TOGGLE_LIKE = 'timeline/TOGGLE_LIKE',
  ADD_LIKE = 'timeline/ADD_LIKE',
  REMOVE_LIKE = 'timeline/REMOVE_LIKE',
  EDIT_COMMENTS_COUNT = 'timeline/EDIT_COMMENTS_COUNT',
  POST_COMMENTS_INIT = 'timeline/POST_COMMENTS_INIT',
  POST_COMMENTS_REQUEST = 'timeline/POST_COMMENTS_REQUEST',
  POST_COMMENTS_SUCCESS = 'timeline/POST_COMMENTS_SUCCESS',
  POST_COMMENTS_FAILURE = 'timeline/POST_COMMENTS_FAILURE',
  POST_COMMENTS_CREATE = 'timeline/POST_COMMENTS_CREATE',
  POST_COMMENTS_ADD = 'timeline/POST_COMMENTS_ADD',
  POST_COMMENTS_UPDATE = 'timeline/POST_COMMENTS_UPDATE',
  POST_COMMENTS_EDIT = 'timeline/POST_COMMENTS_EDIT',
  POST_COMMENTS_DELETE = 'timeline/POST_COMMENTS_DELETE',
  POST_COMMENTS_REMOVE = 'timeline/POST_COMMENTS_REMOVE',
}

export interface Pages {
  current: number;
  last: number;
}

export interface PostProps {
  postId: number;
  text: string;
  file: string;
  createdAt: string;
  liked: boolean;
  likesCount: number;
  commentsCount: number;
  user: User;
}

export interface PostComments {
  postId: number;
  comments: Comment[];
  pages: Pages;
  isLoading: boolean;
  errorMessage: string;
}

export interface TimelineState {
  userId?: number,
  posts: PostProps[];
  postsComments: PostComments[];
  pages: Pages;
  isLoading: boolean;
  errorMessage: string;
}
