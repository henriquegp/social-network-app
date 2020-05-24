import { Reducer } from 'redux';
import {
  TimelineState, TimelineTypes, PostProps, PostComments,
} from './types';

const initialPages = {
  current: 0,
  last: 1,
};

const initialState: TimelineState = {
  userId: undefined,
  posts: [],
  pages: initialPages,
  isLoading: false,
  errorMessage: '',
  postsComments: [],
};

interface ChangePost {
  (post: PostProps): PostProps;
}

function findPost(posts: PostProps[], postId: number, changedPost: ChangePost) {
  return posts.map((post) => (post.postId === postId
    ? { ...changedPost(post) }
    : post
  ));
}

interface ChangePostComments {
  (postComments: PostComments): PostComments;
}

function findPostComments(
  postsComments: PostComments[], postId: number, cgdPost: ChangePostComments,
) {
  return postsComments.map((postComment) => (postComment.postId === postId
    ? { ...cgdPost(postComment) }
    : postComment
  ));
}

function setPostCommentsRequest(state: TimelineState, postId: number) {
  const index = state
    .postsComments
    .findIndex((postComments) => postComments.postId === postId);

  if (index < 0) {
    return {
      ...state,
      postsComments: [
        ...state.postsComments,
        {
          postId,
          comments: [],
          pages: initialPages,
          isLoading: true,
          errorMessage: '',
        },
      ],
    };
  }

  return {
    ...state,
    postsComments: findPostComments(
      state.postsComments,
      postId,
      (postComments) => ({
        ...postComments,
        isLoading: true,
        errorMessage: '',
      }),
    ),
  };
}

const timelineReducer: Reducer<TimelineState> = (state = initialState, action) => {
  switch (action.type) {
    case TimelineTypes.TIMELINE_RESET:
      return {
        ...state,
        userId: action.payload.userId,
        posts: [],
        pages: initialPages,
        isLoading: false,
        errorMessage: '',
      };

    case TimelineTypes.TIMELINE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };

    case TimelineTypes.NEXT_PAGE:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };

    case TimelineTypes.NEXT_PAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: [
          ...state.posts,
          ...action.payload.posts,
        ],
        pages: {
          current: action.payload.nextPage,
          last: Math.ceil(action.payload.count / 15),
        },
      };

    case TimelineTypes.NEXT_PAGE_FINISH:
      return { ...state, isLoading: false };

    case TimelineTypes.ADD_LIKE:
      return {
        ...state,
        posts: findPost(state.posts, action.payload.postId, (post) => ({
          ...post, likesCount: post.likesCount + 1, liked: true,
        })),
      };

    case TimelineTypes.REMOVE_LIKE:
      return {
        ...state,
        posts: findPost(state.posts, action.payload.postId, (post) => ({
          ...post, likesCount: post.likesCount - 1, liked: false,
        })),
      };

    case TimelineTypes.EDIT_COMMENTS_COUNT:
      return {
        ...state,
        posts: findPost(state.posts, action.payload.postId, (post) => ({
          ...post, commentsCount: action.payload.count,
        })),
      };

    case TimelineTypes.POST_COMMENTS_REQUEST:
      return setPostCommentsRequest(state, action.payload.postId);

    case TimelineTypes.POST_COMMENTS_SUCCESS:
      return {
        ...state,
        postsComments: findPostComments(
          state.postsComments,
          action.payload.postId,
          (postComments) => ({
            ...postComments,
            comments: action.payload.comments,
            pages: action.payload.pages,
            isLoading: false,
            errorMessage: '',
          }),
        ),
      };

    case TimelineTypes.POST_COMMENTS_FAILURE:
      return {
        ...state,
        postsComments: findPostComments(
          state.postsComments,
          action.payload.postId,
          (postComments) => ({
            ...postComments,
            isLoading: false,
            errorMessage: action.payload.errorMessage,
          }),
        ),
      };

    case TimelineTypes.POST_COMMENTS_CREATE:
      return {
        ...state,
        postsComments: findPostComments(
          state.postsComments,
          action.payload.postId,
          (postComments) => ({
            ...postComments,
            isLoading: true,
          }),
        ),
      };

    case TimelineTypes.POST_COMMENTS_ADD:
      return {
        ...state,
        posts: findPost(state.posts, action.payload.postId, (post) => ({
          ...post, commentsCount: post.commentsCount + 1,
        })),
        postsComments: findPostComments(
          state.postsComments,
          action.payload.postId,
          (postComments) => ({
            ...postComments,
            comments: [
              ...postComments.comments,
              action.payload.comment,
            ],
            isLoading: false,
          }),
        ),
      };

    case TimelineTypes.POST_COMMENTS_UPDATE:
      return {
        ...state,
        postsComments: findPostComments(
          state.postsComments,
          action.payload.postId,
          (postComments) => ({
            ...postComments,
            isLoading: true,
          }),
        ),
      };

    case TimelineTypes.POST_COMMENTS_EDIT:
      return {
        ...state,
        postsComments: findPostComments(
          state.postsComments,
          action.payload.postId,
          (postComments) => ({
            ...postComments,
            comments: postComments.comments.map((comment) => (
              (comment.commentId !== action.payload.commentId)
                ? comment
                : { ...comment, text: action.payload.text })),
            isLoading: false,
          }),
        ),
      };

    case TimelineTypes.POST_COMMENTS_REMOVE:
      return {
        ...state,
        posts: findPost(state.posts, action.payload.postId, (post) => ({
          ...post, commentsCount: post.commentsCount - 1,
        })),
        postsComments: findPostComments(
          state.postsComments,
          action.payload.postId,
          (postComments) => ({
            ...postComments,
            comments: postComments.comments.filter(
              (comment) => comment.commentId !== action.payload.commentId,
            ),
            isLoading: false,
          }),
        ),
      };

    default:
      return state;
  }
};

export default timelineReducer;
