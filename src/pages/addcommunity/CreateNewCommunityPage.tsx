import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import Button from '@src/components/common/Button';
import ImageUploadField from '@src/components/addcommunity/ImageUploadField';
import Fieldset from '@src/components/common/Fieldset';
import InputText from '@src/components/common/InputText';
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
      <Container>
        <Fieldset title='공동체 이름'>
          <Section>
            <InputText
              as='input'
              name='communityName'
              placeholder='공동체 이름을 입력하세요'
              maxLength={20}
              value={communityName}
              setValue={setCommunityName}
              required={true}
            />
          </Section>
        </Fieldset>
        <Fieldset title='공동체 사진'>
          <ImageUploadField
            previewImg={
              communityImage ? URL.createObjectURL(communityImage) : ''
            }
            // onFileChange={handleFileUpload}
          />
        </Fieldset>
        <Fieldset title='공동체 소개'>
          <Section>
            <InputText
              as='textarea'
              name='communityDescription'
              placeholder='사람들에게 공동체에 대해 조금 더 알려주세요.'
              maxLength={200}
              required={false}
              value={communityDescription}
              setValue={setCommunityDescription}
            />
          </Section>
        </Fieldset>
        <ButtonWrapper>
          <Button
            type='submit'
            disabled={!isFormValid}
            onClick={handleCreateCommunity}
          >
            생성하기
          </Button>
        </ButtonWrapper>
        <BottomSpacer />
      </Container>
    </>
  );
};

export default CreateNewCommunityPage;

const Container = styled.div`
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

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: calc(1.875rem + 2px);
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 0 1.25rem;
`;

const BottomSpacer = styled.div`
  height: calc(1.875rem + 2px + 2.56rem + 2.56rem);
  width: 100%;
`;
