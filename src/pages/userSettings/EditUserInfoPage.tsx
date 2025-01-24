import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { bgFileState, profileState } from '@src/states/atoms';
import { useGetProfile, usePatchProfile } from '@src/hooks/query/member';
import UserProfileImg from '@src/components/userSettings/UserProfileImg';
import Button from '@src/components/common/Button';
import Header from '@src/components/common/Header';
import ButtonBackground from '@src/components/common/ButtonBackground';

const addNicknamePromise = (
  promises: Promise<void>[],
  refValue: string,
  newValue: string,
  mutateFunc: (nickname: string) => Promise<void>,
) => {
  if (refValue !== newValue) {
    promises.push(mutateFunc(newValue));
  }
};

const addImagePromise = (
  promises: Promise<void>[],
  file: File | null,
  mutateFunc: (
    data: FormData,
    options?: {
      onSuccess?: () => void;
    },
  ) => Promise<void>,
  resetFunc: () => void,
) => {
  if (file) {
    const formData = new FormData();
    formData.append('imageFile', file);
    promises.push(
      mutateFunc(formData, {
        onSuccess: resetFunc,
      }),
    );
  }
};

const EditUserInfoPage = () => {
  const { profileData } = useGetProfile('me');
  const { editNickname, editProfileImg, editBackgroundImg } = usePatchProfile();
  const [profileFile, setProfileFile] = useRecoilState(profileState);
  const [backgroundFile, setBackgroundFile] = useRecoilState(bgFileState);

  const [value, setValue] = useState<string>(profileData?.nickname ?? '');
  const ref = useRef(value);

  const handleEditProfile = async () => {
    const promises: Promise<void>[] = [];

    addNicknamePromise(promises, ref.current, value, editNickname.mutateAsync);
    addImagePromise(promises, profileFile, editProfileImg.mutateAsync, () =>
      setProfileFile(null),
    );
    addImagePromise(
      promises,
      backgroundFile,
      editBackgroundImg.mutateAsync,
      () => setBackgroundFile(null),
    );

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
      <Main>
        <Container className='scroll-area'>
          <UserProfileImg
            edit
            profileImg={profileData?.profileImg ?? undefined}
            backgroundImg={profileData?.backgroundImg ?? undefined}
          />
          <Fieldset title='별명'>
            <Section>
              <InputText
                as='input'
                name='nickname'
                placeholder='별명을 입력하세요.'
                maxLength={10}
                value={value}
                setValue={setValue}
                required
              />
            </Section>
          </Fieldset>
        </Container>
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
      </Main>
    </>
  );
};

export default EditUserInfoPage;

const Main = styled.main`
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
