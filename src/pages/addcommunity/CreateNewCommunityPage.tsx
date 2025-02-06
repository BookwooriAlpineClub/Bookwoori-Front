import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import Button from '@src/components/common/button/Button';
import ImageField from '@src/components/common/input/ImageField';
import Fieldset from '@src/components/common/Fieldset';
import TextField from '@src/components/common/input/TextField';
import Section from '@src/components/common/Section';
import { usePostServer } from '@src/hooks/query/server';

const headerText = '새로운 공동체 생성하기';
const headerType = 'back';

const CreateNewCommunityPage = () => {
  // form 내부의 states
  const [communityName, setCommunityName] = useState<string>('');
  const [communityImage, setCommunityImage] = useState<File | null>(null);
  const [communityDescription, setCommunityDescription] = useState<string>('');

  // form 유효성 검증
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // form 내부 states 초기화
  const resetFields = useCallback(() => {
    setCommunityName('');
    setCommunityImage(null);
    setCommunityDescription('');
  }, []);

  const { mutate: createServer } = usePostServer(resetFields);

  useEffect(() => {
    setIsFormValid(
      communityName.trim().length > 0 && communityDescription.trim().length > 0,
    );
  }, [communityName, communityDescription]);

  // eslint-disable-next-line
  const handleFileUpload = (file: File | null) => {
    setCommunityImage(file);
  };

  const handleCreateCommunity = () => {
    const imageToSave = communityImage as File;
    if (isFormValid) {
      createServer({
        name: communityName,
        description: communityDescription,
        serverImg: imageToSave,
      });
    }
  };
  return (
    <>
      <Header text={headerText} headerType={headerType} />
      <Main>
        <div className='scroll-area'>
          <Fieldset title='공동체 이름'>
            <Section>
              <TextField
                as='input'
                name={communityName}
                placeholder='공동체 이름을 입력하세요'
                maxLength={20}
                required
                value={communityName}
                setValue={setCommunityName}
              />
            </Section>
          </Fieldset>
          <Fieldset title='공동체 사진'>
            <ImageField
              previewImg={
                communityImage ? URL.createObjectURL(communityImage) : ''
              }
              onFileChange={handleFileUpload}
            />
          </Fieldset>
          <Fieldset title='공동체 소개'>
            <Section>
              <TextField
                as='textarea'
                name={communityDescription}
                placeholder='사람들에게 공동체에 대해 조금 더 알려주세요.'
                maxLength={200}
                required
                value={communityDescription}
                setValue={setCommunityDescription}
              />
            </Section>
          </Fieldset>
        </div>
        <Button
          type='submit'
          disabled={!isFormValid}
          onClick={handleCreateCommunity}
        >
          생성하기
        </Button>
      </Main>
    </>
  );
};

export default CreateNewCommunityPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 1.875rem 1.25rem 0;
  width: 100%;
  height: calc(100svh - 4.375rem);
  background-color: ${({ theme }) => theme.colors.neutral50};

  fieldset {
    width: 100%;
  }

  textarea {
    &::-webkit-scrollbar {
      display: block;
      width: 0.2rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.neutral200};
      border-radius: 0.2rem;
    }
  }
`;
