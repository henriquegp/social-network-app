import { all, takeLatest } from 'redux-saga/effects';

import { SystemTypes } from './system/types';
import { checkCredentials, hideSnackBarMd } from './system/sagas';

import { TimelineTypes } from './timeline/types';
import {
  fetchNextPageTimeline,
  fetchToggleLike,
  fetchCommentList,
  fetchCommentCreate,
  fetchCommentUpdate,
  fetchCommentDelete,
} from './timeline/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(SystemTypes.LOGIN_REQUEST, checkCredentials),
    takeLatest(SystemTypes.SHOW_SNACK_BAR, hideSnackBarMd),

    // takeLatest(TimelineTypes.TIMELINE_REQUEST, fetchTimeline),
    takeLatest(TimelineTypes.NEXT_PAGE, fetchNextPageTimeline),
    takeLatest(TimelineTypes.TOGGLE_LIKE, fetchToggleLike),
    takeLatest(TimelineTypes.POST_COMMENTS_REQUEST, fetchCommentList),
    takeLatest(TimelineTypes.POST_COMMENTS_CREATE, fetchCommentCreate),
    takeLatest(TimelineTypes.POST_COMMENTS_UPDATE, fetchCommentUpdate),
    takeLatest(TimelineTypes.POST_COMMENTS_DELETE, fetchCommentDelete),
  ]);
}
