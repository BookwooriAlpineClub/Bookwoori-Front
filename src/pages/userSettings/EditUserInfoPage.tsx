import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { bgFileState, profileState } from '@src/states/atoms';
import useMember from '@src/hooks/query/useMember';
import { convertURLToFile } from '@src/utils/formatters';
import UserProfilImg from '@src/components/userSettings/UserProfileImg';
import Button from '@src/components/common/Button';
import Header from '@src/components/common/Header';
import ButtonBackground from '@src/components/common/ButtonBackground';
import LoadingPage from '@src/pages/fallback/LoadingPage';

const EditUserInfoPage = () => {
  const { profileData, isLoading, isError, editProfile } = useMember();
  const [value, setValue] = useState<string | undefined>(profileData?.nickname);
  const [length, setLength] = useState<number>(0);
  const profileFile = useRecoilValue(profileState);
  const backgroundFile = useRecoilValue(bgFileState);
  const ref = useRef(value);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    const targetLength = e.target.value.length;

    if (targetLength > 20) {
      setValue(targetValue.slice(0, 20));
      setLength(20);
      return;
    }
    setValue(targetValue);
    setLength(targetLength);
  };

  const handleEditProfile = async () => {
    const formData = new FormData();
    if (value) {
      formData.append('nickname', value);
    }
    const file =
      profileFile ||
      (profileData?.profileImg &&
        (await convertURLToFile(profileData?.profileImg ?? '')));
    const bgFile =
      backgroundFile ||
      (profileData?.backgroundImg &&
        (await convertURLToFile(profileData?.backgroundImg ?? '')));

    if (file) {
      formData.append('profileImg', file);
    }
    if (bgFile) {
      formData.append('backgroundImg', bgFile);
    }

    editProfile.mutate(formData);
  };

  useEffect(() => {
    if (profileData) {
      setValue(profileData.nickname);
      setLength(profileData.nickname.length);
      ref.current = profileData.nickname;
    }
  }, [profileData]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    console.error('데이터를 불러오는데 실패했습니다.');
  }

  return (
    <>
      <Header text='인물 정보 수정하기' headerType='back' />
      <SLayout>
        <SContainer>
          <UserProfilImg edit profile={profileData?.profileImg || undefined} />
          <SBox>
            <SLabel>별명</SLabel>
            <SWrapper>
              <SInput
                type='text'
                placeholder='별명을 입력하세요.'
                value={value}
                onChange={handleChangeValue}
                $color={ref.current === value}
              />
              <SSmallLabel>{length}/10</SSmallLabel>
            </SWrapper>
          </SBox>
        </SContainer>
        <ButtonBackground color='transparent'>
          <Button
            disabled={
              !((value && length <= 10 && ref.current !== value) || profileFile)
            }
            onClick={handleEditProfile}
          >
            수정하기
          </Button>
        </ButtonBackground>
      </SLayout>
    </>
  );
};

export default EditUserInfoPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.875rem 1.25rem 0;
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  width: 100%;
`;

const SBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const SLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};
`;

const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.875rem 0.625rem;

  border-radius: 0.3125rem;
  background: ${({ theme }) => theme.colors.neutral0};
`;

const SInput = styled.input<{ $color: boolean }>`
  width: 100%;

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme, $color }) =>
    $color ? theme.colors.neutral950 : theme.colors.blue500};
`;

const SSmallLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral400};
`;
