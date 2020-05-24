import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Picture } from './styles';

import Default from '../../assets/default.jpeg';

interface UserPictureProps {
  src?: string;
  username?: string;
  height: number;
}

function UserPicture({ src, username, height }: UserPictureProps) {
  const srcImage = src ? `${process.env.REACT_APP_API_URL}/files/${src}` : Default;

  const picture = <Picture src={srcImage} height={height} />;

  return (
    <Container>
      {username
        ? (
          <Link to={`/${username}`}>
            {picture}
          </Link>
        )
        : picture}

    </Container>
  );
}

export default UserPicture;
