import { SyntheticEvent } from 'react';
import styled from 'styled-components';
import useUploadFile from '@src/hooks/useUploadFile';
import { bgFileState, profileState } from '@src/states/atoms';
import Background from '@src/assets/images/userSettings/background_default.svg';
import Profile from '@src/assets/images/userSettings/profile_default.svg';
import { ReactComponent as Camera } from '@src/assets/icons/camera.svg';

interface UserProfileImgProps {
  edit?: boolean;
  profile?: string;
  background?: string;
}

const UserProfilImg = ({
  edit,
  profile = Profile,
  background = Background,
}: UserProfileImgProps) => {
  const {
    preview: backgroundPreview,
    handleFileUpload: handleBackgroundUpload,
  } = useUploadFile(background, bgFileState);
  const { preview: profilePreview, handleFileUpload: handleProfileUpload } =
    useUploadFile(profile, profileState);

  const handleImgError = (
    e: SyntheticEvent<HTMLImageElement>,
    type: 'back' | 'profile',
  ) => {
    e.currentTarget.src = type === 'back' ? Background : Profile;
  };

  return (
    <SImages>
      <SBox>
        <SBackgroundImg
          src={backgroundPreview}
          onError={(e) => handleImgError(e, 'back')}
        />
        {edit && (
          <SLabel htmlFor='backgroundFile'>
            <SInput
              id='backgroundFile'
              type='file'
              onChange={handleBackgroundUpload}
            />
            <Camera />
          </SLabel>
        )}
      </SBox>
      <SProfileBox>
        <SProfileImg
          src={profilePreview}
          onError={(e) => handleImgError(e, 'profile')}
        />
        {edit && (
          <>
            <SProfileLabel htmlFor='profileFile'>
              <Camera />
            </SProfileLabel>
            <SInput
              id='profileFile'
              type='file'
              onChange={handleProfileUpload}
            />
          </>
        )}
      </SProfileBox>
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
const SBox = styled.div`
  display: flex;

  position: relative;
  width: 100%;
  height: 10.4688rem;
`;
const SBackgroundImg = styled.img`
  width: 100%;

  border-radius: 1.875rem 1.875rem 0 0;

  object-fit: cover;
`;
const SLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  border-radius: 1.875rem 1.875rem 0 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );

  cursor: pointer;
`;
const SInput = styled.input`
  display: none;
`;
const SProfileBox = styled.div`
  position: relative;

  margin-top: -3.125rem;
  width: 6.25rem;
  height: 6.25rem;
`;
const SProfileImg = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.neutral0};

  object-fit: contain;
`;
const SProfileLabel = styled(SLabel)`
  border-radius: 50%;
`;
