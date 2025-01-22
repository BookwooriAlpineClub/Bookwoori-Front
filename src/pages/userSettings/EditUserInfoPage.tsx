import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { bgFileState, profileState } from '@src/states/atoms';
import { useGetProfile, usePatchProfile } from '@src/hooks/query/member';
import UserProfileImg from '@src/components/userSettings/UserProfileImg';
import Button from '@src/components/common/Button';
import Header from '@src/components/common/Header';
import ButtonBackground from '@src/components/common/ButtonBackground';
import Fieldset from '@src/components/common/Fieldset';
import InputText from '@src/components/common/InputText';

const EditUserInfoPage = () => {
  const { profileData } = useGetProfile('me');
  const { editNickname, editProfileImg, editBackgroundImg } = usePatchProfile();
  const [profileFile, setProfileFile] = useRecoilState(profileState);
  const [backgroundFile, setBackgroundFile] = useRecoilState(bgFileState);

  const [value, setValue] = useState<string>(profileData?.nickname ?? '');
  const ref = useRef(value);

  const handleEditProfile = async () => {
    const promises: Promise<void>[] = [];

    if (ref.current !== value) {
      promises.push(editNickname.mutateAsync(value));
    }

    if (profileFile) {
      const profileFormData = new FormData();
      profileFormData.append('imageFile', profileFile);
      promises.push(
        editProfileImg.mutateAsync(profileFormData, {
          onSuccess: () => setProfileFile(null),
        }),
      );
    }

    if (backgroundFile) {
      const backgroundFormData = new FormData();
      backgroundFormData.append('imageFile', backgroundFile);
      promises.push(
        editBackgroundImg.mutateAsync(backgroundFormData, {
          onSuccess: () => setBackgroundFile(null),
        }),
      );
    }

    await Promise.all(promises);
  };

  useEffect(() => {
    if (profileData?.nickname) {
      setValue(profileData.nickname);
      ref.current = profileData.nickname;
    }
  }, [profileData]);

  return (
    <>
      <Header text='인물 정보 수정하기' headerType='back' />
      <Layout>
        <Container>
          <UserProfileImg
            edit
            profileImg={profileData?.profileImg ?? undefined}
            backgroundImg={profileData?.backgroundImg ?? undefined}
          />
          <Fieldset title='별명'>
            <Wrapper>
              <InputText
                as='input'
                name='nickname'
                placeholder='별명을 입력하세요.'
                maxLength={10}
                value={value}
                setValue={setValue}
                required
              />
            </Wrapper>
          </Fieldset>
        </Container>
        <ButtonBackground color='transparent'>
          <Button
            disabled={
              !(
                value &&
                value.length <= 10 &&
                (ref.current !== value || profileFile || backgroundFile)
              )
            }
            onClick={handleEditProfile}
          >
            수정하기
          </Button>
        </ButtonBackground>
      </Layout>
    </>
  );
};

export default EditUserInfoPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.875rem 1.25rem 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.875rem 0.625rem;

  border-radius: ${({ theme }) => theme.rounded[6]};
  background: ${({ theme }) => theme.colors.neutral0};
`;
