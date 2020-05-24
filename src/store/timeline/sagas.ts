import { call, put, select } from 'redux-saga/effects';
import {
  timelineFailure,
  nextPageSuccess,
  nextPageFinish,
  addLike,
  removeLike,
  postCommentsSuccess,
  postCommentsFailure,
  editCommentsCount,
} from './actions';
import { showSnackBar } from '../system/actions';
import { PostProps } from './types';
import { postRepository, commentRepository } from '../../repositories';

export function* fetchNextPageTimeline() {
  try {
    const { pages, userId } = yield select((state) => state.timeline);
    const nextPage = pages.current + 1;

    if (nextPage > pages.last) {
      yield put(nextPageFinish());
      return;
    }

    const data = yield call(postRepository.get, {
      page: nextPage,
      userId,
    });

    data.posts = data.posts.map((post: PostProps) => ({
      ...post,
    }));

    yield put(nextPageSuccess({
      ...data,
      nextPage,
    }));
  } catch ({ response }) {
    yield put(timelineFailure(response?.data.message));
  }
}

interface Action {
  type: string;
}

interface PostPayload {
  postId: number;
}

interface PostAction extends Action {
  payload: PostPayload;
}

export function* fetchToggleLike({ payload: { postId } }: PostAction) {
  const { posts } = yield select((state) => state.timeline);
  const post: PostProps = posts.find((key: PostProps) => key.postId === postId);

  try {
    if (!post.liked) {
      yield call(postRepository.like, { postId });
      yield put(addLike(postId));
    } else {
      yield call(postRepository.deslike, { postId });
      yield put(removeLike(postId));
    }
  } catch (error) {
    console.log(error);
  }
}

interface PostComments extends Action {
  payload: {
    postId: number;
    page: number;
  }
}

export function* fetchCommentList({ payload }: PostComments) {
  try {
    const { comments, lastPage, count } = yield call(commentRepository.get, {
      postId: payload.postId,
      page: payload.page,
    });

    yield put(postCommentsSuccess(
      payload.postId,
      {
        comments,
        pages: {
          current: payload.page,
          last: lastPage,
        },
      },
    ));
    yield put(editCommentsCount(payload.postId, count));
  } catch ({ response }) {
    const message = response?.message;
    yield put(postCommentsFailure(payload.postId, message));
  }
}

interface PostCommentsCreate extends Action {
  payload: {
    postId: number;
    text: string;
  }
}

export function* fetchCommentCreate({ payload }: PostCommentsCreate) {
  try {
    const { message } = yield call(commentRepository.create, {
      postId: payload.postId,
      text: payload.text,
    });

    yield put(showSnackBar({ type: 'success', message }));
  } catch ({ response }) {
    const message = response?.message;
    yield put(showSnackBar({ type: 'danger', message }));
  }
}

interface PostCommentsUpdate extends Action {
  payload: {
    postId: number;
    commentId: number;
    text: string;
  }
}

export function* fetchCommentUpdate({ payload }: PostCommentsUpdate) {
  try {
    const { message } = yield call(commentRepository.update, {
      postId: payload.postId,
      commentId: payload.commentId,
      text: payload.text,
    });

    yield put(showSnackBar({ type: 'success', message }));
  } catch ({ response }) {
    const message = response?.message;
    yield put(showSnackBar({ type: 'danger', message }));
  }
}

interface PostCommentsDelete extends Action {
  payload: {
    postId: number;
    commentId: number;
  }
}

export function* fetchCommentDelete({ payload }: PostCommentsDelete) {
  try {
    const { message } = yield call(commentRepository.delete, {
      postId: payload.postId,
      commentId: payload.commentId,
    });

    yield put(showSnackBar({ type: 'success', message }));
  } catch ({ response }) {
    const message = response?.message;
    yield put(showSnackBar({ type: 'danger', message }));
  }
}
