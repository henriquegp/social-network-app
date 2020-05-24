import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

import socket from '../../../services/socket';
import { ApplicationState } from '../../../store';
import { SystemState } from '../../../store/system/types';
import { TimelineState } from '../../../store/timeline/types';
import {
  postCommentsRequest, postCommentsAdd, postCommentsEdit, postCommentsRemove,
} from '../../../store/timeline/actions';
import { Comment } from '../../../repositories/commentRepository';

import CreateComments from './CreateComments';
import ListComments from './ListComments';
import { Container, Loader, ButtonMore } from './styles';

interface CommentsProps {
  postId: number;
}

function Comments({ postId }: CommentsProps) {
  const dispatch = useDispatch();
  const { user } = useSelector<ApplicationState, SystemState>((state) => state.system);
  const { postsComments } = useSelector<ApplicationState, TimelineState>((state) => state.timeline);

  useEffect(() => {
    dispatch(postCommentsRequest(postId, 1));

    socket.on(
      `post-comments-create:${postId}`,
      (comment: Comment) => dispatch(postCommentsAdd(postId, comment)),
    );

    socket.on(
      `post-comments-update:${postId}`,
      (commentId: number, text: string) => {
        console.log('teste', commentId, text);

        dispatch(postCommentsEdit(postId, +commentId, text));
      },
    );

    socket.on(
      `post-comments-delete:${postId}`,
      (commentId: number) => dispatch(postCommentsRemove(postId, +commentId)),
    );

    return () => {
      socket.off(`post-comments-create:${postId}`);
      socket.off(`post-comments-update:${postId}`);
      socket.off(`post-comments-delete:${postId}`);
    };
  }, [dispatch, postId]);

  const postComments = useMemo(() => postsComments.find((comment) => comment.postId === postId), [
    postId, postsComments,
  ]);

  return (
    <Container>
      {postComments?.isLoading && <Loader><FaSpinner size={18} /></Loader>}
      {!postComments?.isLoading
        && postComments && postComments.pages.last > postComments.pages.current
        && (
          <ButtonMore
            type="button"
            onClick={() => dispatch(postCommentsRequest(postId, postComments.pages.current + 1))}
          >
            More comments
          </ButtonMore>
        )}

      {!postComments?.errorMessage && (
        <ListComments
          postId={postId}
          user={user}
          comments={postComments?.comments}
        />
      )}

      <CreateComments
        postId={postId}
        user={user}
        isLoading={!!postComments?.isLoading}
      />
    </Container>
  );
}

export default Comments;
