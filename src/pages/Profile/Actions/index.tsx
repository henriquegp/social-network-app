import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '../../../store';
import { profileRepository } from '../../../repositories';
import Button from '../../../components/Button';
import useFetchApi from '../../../hooks/useFetchApi';
import Modal from '../../../components/Modal';

import Account from './Account';
import Container from './styles';

interface Props {
  userId: number;
  isFollowing: boolean;
  reload(): void;
}

function Actions({
  userId, isFollowing, reload,
}: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const loggedUserId = useSelector<ApplicationState, number>((state) => state.system.user.userId);

  const [
    { isLoading: isLoadingFollow },
    fetchFollow,
  ] = useFetchApi(profileRepository.follow);

  const [
    { isLoading: isLoadingUnFollow },
    fetchUnfollow,
  ] = useFetchApi(profileRepository.unfollow);

  async function toggleFollow(toggle: boolean) {
    try {
      if (toggle) {
        await fetchFollow({ userId });
      } else {
        await fetchUnfollow({ userId });
      }
      reload();
    } catch (error) {
      console.log(error);
    }
  }

  if (userId === loggedUserId) {
    return (
      <Container>
        <Button onClick={() => setVisible(true)}>
          Edit Profile
        </Button>

        <Modal
          show={visible}
          onClose={() => setVisible(false)}
        >
          <Account userId={userId} reload={reload} onClose={() => setVisible(false)} />
        </Modal>
      </Container>
    );
  }

  return (
    <Container>
      {!isFollowing
        ? (
          <Button
            color="primary"
            onClick={() => toggleFollow(true)}
            loading={isLoadingFollow}
          >
            Follow
          </Button>
        )
        : (
          <Button
            onClick={() => toggleFollow(false)}
            loading={isLoadingUnFollow}
          >
            Unfollow
          </Button>
        )}
    </Container>
  );
}

export default Actions;
