import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

import useFetchApi from '../../../hooks/useFetchApi';
import useShowMenu from '../../../hooks/useShowMenu';
import { profileRepository } from '../../../repositories';
import UserPicture from '../../UserPicture';

import {
  Container, StyledInput, CardProfiles, Picture, Info,
} from './styles';

function SearchProfile() {
  const [cardEl, show, setShow] = useShowMenu();
  const [{ isLoading, isError, data }, setFetchApi] = useFetchApi(profileRepository.searchProfile);

  async function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    const name = target.value.trim();
    if (name.length > 3 && !isLoading) {
      await setFetchApi({ name });
    }
  }

  return (
    <Container ref={cardEl}>
      <StyledInput>
        <div><FiSearch size="16" /></div>
        <input
          placeholder="Search"
          onClick={() => setShow(true)}
          onChange={handleChange}
        />
      </StyledInput>

      <CardProfiles show={show}>
        <ul>
          {!isError && data?.map(({ userId, username, profile }) => (
            <li key={userId}>
              <Link to={`/${username}`} onClick={() => setShow(false)}>
                <Picture><UserPicture height={36} src={profile.picture} /></Picture>
                <Info>
                  <p className="nm">{profile.name}</p>
                  <p className="un">{username}</p>
                </Info>
              </Link>
            </li>
          ))}
        </ul>
      </CardProfiles>
    </Container>
  );
}

export default SearchProfile;
