import { SyntheticEvent } from 'react';
import styled from 'styled-components';
import Background from '@src/assets/images/userSettings/background_default.svg';
import Profile from '@src/assets/images/userSettings/profile_default.svg';

const UserProfilImg = () => {
  const handleImgError = (
    e: SyntheticEvent<HTMLImageElement>,
    type: string,
  ) => {
    if (type === 'back') {
      e.currentTarget.src = Background;
      return;
    }
    e.currentTarget.src = Profile;
  };

  return (
    <SImages>
      <SBackgroundImg src='url' onError={(e) => handleImgError(e, 'back')} />
      <SProfileImg src='url' onError={(e) => handleImgError(e, 'profile')} />
    </SImages>
  );
};

export default UserProfilImg;

const SImages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;
const SBackgroundImg = styled.img`
  width: 100%;
  height: 10.4688rem;

  border-radius: 1.875rem 1.875rem 0 0;

  object-fit: cover;
`;
const SProfileImg = styled.img`
  margin-top: -3.125rem;
  width: 6.25rem;
  height: 6.25rem;

  border-radius: 50%;

  object-fit: contain;
`;
