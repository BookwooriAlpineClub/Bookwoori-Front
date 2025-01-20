import styled from 'styled-components';
import useUploadFile from '@src/hooks/useUploadFile';
import { bgFileState, profileState } from '@src/states/atoms';
import { handleImgError } from '@src/utils/helpers';
import Background from '@src/assets/images/userSettings/background_default.svg';
import Profile from '@src/assets/images/userSettings/profile_default.svg';
import { ReactComponent as Camera } from '@src/assets/icons/md_camera_enhance.svg';

interface UserProfileImgProps {
  edit?: boolean;
  profileImg?: string;
  backgroundImg?: string;
}

const useProfileImages = (
  background: string | undefined,
  profile: string | undefined,
) => ({
  background: useUploadFile(background, bgFileState),
  profile: useUploadFile(profile, profileState),
});

const UserProfilImg = ({
  edit,
  profileImg,
  backgroundImg,
}: UserProfileImgProps) => {
  const { background, profile } = useProfileImages(backgroundImg, profileImg);

  return (
    <Layout>
      <Container>
        <BackgroundImg
          src={background.preview ?? Background}
          onError={(e) => handleImgError(e, Background)}
        />
        {edit && (
          <Label htmlFor='backgroundFile'>
            <Input
              id='backgroundFile'
              type='file'
              onChange={background.handleFileUpload}
            />
            <Camera />
          </Label>
        )}
      </Container>
      <ProfileContainer>
        <ProfileImg
          src={profile.preview ?? Profile}
          onError={(e) => handleImgError(e, Profile)}
        />
        {edit && (
          <ProfileLabel htmlFor='profileFile'>
            <Input
              id='profileFile'
              type='file'
              onChange={profile.handleFileUpload}
            />
            <Camera />
          </ProfileLabel>
        )}
      </ProfileContainer>
    </Layout>
  );
};

export default UserProfilImg;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Container = styled.div`
  display: flex;

  position: relative;
  width: 100%;
  height: 10.4688rem;
`;
const BackgroundImg = styled.img`
  width: 100%;

  border-radius: 1.875rem 1.875rem 0 0;

  object-fit: cover;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.colors.neutral200};
  border-radius: 1.875rem 1.875rem 0 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );

  cursor: pointer;
`;
const Input = styled.input`
  display: none;
`;
const ProfileContainer = styled.div`
  position: relative;

  margin-top: -3.125rem;
  width: 6.25rem;
  height: 6.25rem;
`;
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.neutral0};

  object-fit: cover;
`;
const ProfileLabel = styled(Label)`
  border-radius: 50%;
`;
