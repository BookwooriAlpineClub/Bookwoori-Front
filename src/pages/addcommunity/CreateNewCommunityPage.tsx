import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import TitleAndFieldContainer from '@src/components/common/TitleAndFieldContainer';
import InputField from '@src/components/common/InputField';
import TextAreaField from '@src/components/common/TextAreaField';
import Button from '@src/components/common/Button';
import ImageUploadField from '@src/components/addcommunity/ImageUploadField';
import { postServer } from '@src/apis/server';
import { useMutation } from '@tanstack/react-query';
import useToast from '@src/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import { encodeId } from '@src/utils/formatters';

const headerText = '새로운 공동체 생성하기';
const headerType = 'back';

const CreateNewCommunityPage = () => {
  const [communityName, setCommunityName] = useState<string>('');
  const [communityImage, setCommunityImage] = useState<File | null>(null);
  const [communityDescription, setCommunityDescription] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const addToast = useToast();

  const navigate = useNavigate();

  const { mutate: createServer } = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      serverImg: File | null;
    }) => postServer(data),
    onSuccess: (response) => {
      addToast({ content: '공동체 생성 완료' });
      setCommunityName('');
      setCommunityImage(null);
      setCommunityDescription('');
      const encodedId = encodeId(response.serverId);
      navigate(ROUTE_PATH.server.replace(':serverId', encodedId));
    },
    onError: (err) => {
      console.error(err);
      alert('공동체 생성에 실패했습니다.');
    },
  });
  useEffect(() => {
    setIsFormValid(
      communityName.trim().length > 0 && communityDescription.trim().length > 0,
    );
  }, [communityName, communityImage, communityDescription]);

  const handleFileUpload = (file: File | null) => {
    setCommunityImage(file);
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
          <TitleAndFieldContainer title='공동체 이름'>
            <InputField
              value={communityName}
              placeholder='공동체 이름을 입력하세요'
              maxLength={20}
              onChange={handleNameChange}
            />
          </TitleAndFieldContainer>
          <TitleAndFieldContainer title='공동체 사진'>
            <ImageUploadField
              previewImg={
                communityImage ? URL.createObjectURL(communityImage) : ''
              }
              onFileChange={handleFileUpload}
            />
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
`;
