import { TimelineTypes, Pages } from './types';
import { PostList } from '../../repositories/postRepository';
import { Comment } from '../../repositories/commentRepository';

export function timelineReset(userId?: number) {
  return {
    type: TimelineTypes.TIMELINE_RESET,
    payload: { userId },
  };
}

export function timelineFailure(errorMessage: string) {
  return {
    type: TimelineTypes.TIMELINE_FAILURE,
    payload: { errorMessage },
  };
}

export function nextPage() {
  return { type: TimelineTypes.NEXT_PAGE };
}

interface NextPageSuccess extends PostList {
  nextPage: number;
}

export function nextPageSuccess(data: NextPageSuccess) {
  return {
    type: TimelineTypes.NEXT_PAGE_SUCCESS,
    payload: data,
  };
}

export function nextPageFinish() {
  return { type: TimelineTypes.NEXT_PAGE_FINISH };
}

export function toggleLike(postId: number) {
  return {
    type: TimelineTypes.TOGGLE_LIKE,
    payload: { postId },
  };
}

export function addLike(postId: number) {
  return {
    type: TimelineTypes.ADD_LIKE,
    payload: { postId },
  };
}

export function removeLike(postId: number) {
  return {
    type: TimelineTypes.REMOVE_LIKE,
    payload: { postId },
  };
}

export function editCommentsCount(postId: number, count: number) {
  return {
    type: TimelineTypes.EDIT_COMMENTS_COUNT,
    payload: { postId, count },
  };
}

export function postCommentsInit(postId: number) {
  return {
    type: TimelineTypes.POST_COMMENTS_INIT,
    payload: { postId },
  };
}

export function postCommentsRequest(postId: number, page: number) {
  return {
    type: TimelineTypes.POST_COMMENTS_REQUEST,
    payload: { postId, page },
  };
}

interface PosCommentsSuccessProps {
  comments: Comment[];
  pages: Pages;
}

export function postCommentsSuccess(postId: number, props: PosCommentsSuccessProps) {
  return {
    type: TimelineTypes.POST_COMMENTS_SUCCESS,
    payload: { postId, ...props },
  };
}

export function postCommentsFailure(postId: number, errorMessage: string) {
  return {
    type: TimelineTypes.POST_COMMENTS_FAILURE,
    payload: { postId, errorMessage },
  };
}

export function postCommentsCreate(postId: number, text: string) {
  return {
    type: TimelineTypes.POST_COMMENTS_CREATE,
    payload: { postId, text },
  };
}

export function postCommentsAdd(postId: number, comment: Comment) {
  return {
    type: TimelineTypes.POST_COMMENTS_ADD,
    payload: { postId, comment },
  };
}

export function postCommentsUpdate(postId: number, commentId: number, text: string) {
  return {
    type: TimelineTypes.POST_COMMENTS_UPDATE,
    payload: { postId, commentId, text },
  };
}

export function postCommentsEdit(postId: number, commentId: number, text: string) {
  return {
    type: TimelineTypes.POST_COMMENTS_EDIT,
    payload: { postId, commentId, text },
  };
}

export function postCommentsDelete(postId: number, commentId: number) {
  return {
    type: TimelineTypes.POST_COMMENTS_DELETE,
    payload: { postId, commentId },
  };
}

export function postCommentsRemove(postId: number, commentId: number) {
  return {
    type: TimelineTypes.POST_COMMENTS_REMOVE,
    payload: { postId, commentId },
  };
}
