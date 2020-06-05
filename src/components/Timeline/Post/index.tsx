import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaThumbsUp, FaComment } from 'react-icons/fa';

import UserPicture from '../../UserPicture';
import { PostProps } from '../../../store/timeline/types';
import { toggleLike } from '../../../store/timeline/actions';

import Comments from '../Comments';

import {
  Container, Header, LinkName, Actions, ButtonIcon, ButtonLink,
} from './styles';

const { REACT_APP_API_URL } = process.env;

function formatDate(date: string) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options)
    .format(new Date(date));
}

interface Props {
  data: PostProps;
}

function Post({ data }: Props) {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState<boolean>(false);
  const {
    postId, text, file, createdAt, likesCount, commentsCount, user, liked,
  } = data;

  return (
    <Container>
      <Header>
        <UserPicture
          src={user.profile.picture}
          height={50}
          username={user.username}
        />
        <div>
          <LinkName to={`/${user.username}`}>{user.profile.name}</LinkName>
          <div>{formatDate(createdAt)}</div>
        </div>
      </Header>

      { text && <p>{ text }</p> }
      { file && <img src={`${REACT_APP_API_URL}/files/${file}`} alt="post" /> }

      <Actions>
        <div>
          <ButtonIcon
            type="button"
            title="Like"
            actived={liked}
            onClick={() => dispatch(toggleLike(postId))}
          >
            <FaThumbsUp size={22} />
          </ButtonIcon>
          <ButtonIcon
            type="button"
            title="Comments"
            actived={showComments}
            onClick={() => setShowComments(!showComments)}
          >
            <FaComment size={22} />
          </ButtonIcon>
        </div>
        <div>
          <ButtonLink type="button">{likesCount} likes</ButtonLink>
          <ButtonLink
            type="button"
            onClick={() => setShowComments(!showComments)}
          >
            {commentsCount} comments
          </ButtonLink>
        </div>
      </Actions>

      { showComments && <Comments postId={postId} /> }
    </Container>
  );
}

export default Post;
