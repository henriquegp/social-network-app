import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import useFetchApi from '../../hooks/useFetchApi';
import { profileRepository } from '../../repositories';
import NotFound from '../NotFound';
import Timeline from '../../components/Timeline';

import {
  Container, InfoProfile, Titles, Infos,
} from './styles';
import Picture from './Picture';
import Actions from './Actions';

function Profile(): JSX.Element {
  const { username } = useParams();
  const [
    { isError, data, isLoading },
    fetchApi,
  ] = useFetchApi(profileRepository.getProfileByUsername);

  const loadProfile = useCallback(() => {
    if (username) {
      fetchApi({ username });
    }
  }, [username, fetchApi]);

  useEffect(() => { loadProfile(); }, [loadProfile]);

  return (
    <Container>
      { isError && <NotFound /> }
      {data && (
        <>
          <InfoProfile>
            <div>
              <Picture
                src={data.picture}
                userId={data.userId}
                reload={loadProfile}
              />
            </div>

            <div>
              <Titles>
                <h1>{data.name}</h1>
                <h2>{username}</h2>
              </Titles>

              <Infos>
                <div> <span>{data.countPosts}</span> Posts </div>
                <div> <span>{data.countFollowers}</span> Followers </div>
                <div> <span>{data.countFollowing}</span> Following </div>
              </Infos>

              <p>{data.about}</p>

              <Actions
                userId={data.userId}
                isFollowing={data.isFollowing}
                reload={loadProfile}
              />
            </div>
          </InfoProfile>

          {!isLoading && <Timeline userId={data.userId} /> }
        </>
      )}
    </Container>
  );
}

export default Profile;
