import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as CameraIcon } from '@src/assets/icons/md_camera_alt.svg';
import useUploadFile from '@src/hooks/useUploadFile';
import { communityFileState } from '@src/states/atoms';

interface ImageUploadFieldProps {
  previewImg?: string;
  onFileChange: (file: File | null) => void;
}

const ImageField = ({ previewImg, onFileChange }: ImageUploadFieldProps) => {
  const { file, preview, handleFileUpload, handleFileDelete } = useUploadFile(
    previewImg,
    communityFileState,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    onFileChange(file);
  }, [file, onFileChange]);

  return (
    <ImageUploadContainer>
      <ImageWrapper onClick={openFilePicker}>
        {preview ? (
          <img src={preview} alt='uploaded preview' />
        ) : (
          <CameraIcon aria-label='Upload an image' />
        )}
        <HiddenInput
          type='file'
          accept='.jpg, .jpeg, .png'
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
      </ImageWrapper>
      {preview && (
        <DeleteButton onClick={handleFileDelete}>사진 삭제</DeleteButton>
      )}
    </ImageUploadContainer>
  );
};

export default ImageField;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  width: 9.375rem;
  height: 9.375rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.colors.neutral0};
  color: ${({ theme }) => theme.colors.neutral400};
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.625rem;
    position: absolute;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const DeleteButton = styled.button`
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.neutral0};
  font-family: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.neutral950};
  padding: 0.3rem;
  border-radius: 0.2rem;
  margin-top: 0.5rem;
  box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.05);
`;
