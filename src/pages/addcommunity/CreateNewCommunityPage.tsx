import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import TitleAndFieldContainer from '@src/components/common/TitleAndFieldContainer';
import InputField from '@src/components/common/InputField';
import TextAreaField from '@src/components/common/TextAreaField';
import Button from '@src/components/common/Button';
import ImageUploadField from '@src/components/addcommunity/ImageUploadField';

const headerText = '새로운 공동체 생성하기';
const headerType = 'back';

const CreateNewCommunityPage = () => {
  const [communityName, setCommunityName] = useState<string>('');
  const [communityImage, setCommunityImage] = useState<File | null>(null);
  const [communityDescription, setCommunityDescription] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    setIsFormValid(
      communityName.trim().length > 0 && communityDescription.trim().length > 0,
    );
  }, [communityName, communityImage, communityDescription]);

  const handleFileUpload = (file: File | null) => {
    if (file) {
      setCommunityImage(file);
    } else {
      setCommunityImage(null);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityName(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommunityDescription(e.target.value);
  };

  const handleCreateCommunity = () => {
    const imageToSave = communityImage as File;
    if (isFormValid) {
      alert(
        `Create community with name: ${communityName}\nDescription: ${communityDescription}\nImage: ${imageToSave?.name}`,
      );
    }
  };
  return (
    <>
      <Header text={headerText} headerType={headerType} />
      <Container>
        <TitleAndFieldContainer title='공동체 이름'>
          <InputField
            value={communityName}
            placeholder='공동체 이름을 입력하세요'
            maxLength={20}
            onChange={handleNameChange}
          />
        </TitleAndFieldContainer>
        <TitleAndFieldContainer title='공동체 사진'>
          <ImageUploadField onFileChange={handleFileUpload} />
        </TitleAndFieldContainer>
        <TitleAndFieldContainer title='공동체 소개'>
          <TextAreaField
            value={communityDescription}
            placeholder='사람들에게 공동체에 대해 조금 더 알려주세요.'
            maxLength={200}
            rows={6}
            onChange={handleDescriptionChange}
          />
        </TitleAndFieldContainer>
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
  width: 100svw;
  min-height: calc(100svh - 4.375rem);
  background-color: ${({ theme }) => theme.colors.black300};
`;
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: calc(1.875rem + 2px); // Button에 px가 포함되어 있어 어쩔 수 없다
  left: 50%;
  transform: translateX(-50%);
`;

const BottomSpacer = styled.div`
  height: calc(1.875rem + 2px + 2.56rem + 2.56rem);
  width: 100%;
`;