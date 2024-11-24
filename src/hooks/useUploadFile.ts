import { useState } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import useToast from './useToast';

const useUploadFile = (
  previewImg: string | undefined,
  fileState: RecoilState<File | null>,
) => {
  const [file, setFile] = useRecoilState<File | null>(fileState);
  const [preview, setPreview] = useState<string | undefined>(previewImg);
  const addToast = useToast();

  const validateMimeTypes = (newFile: File) => {
    const validMimeTypes = ['image/png', 'image/jpeg'];
    return validMimeTypes.includes(newFile.type);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles?.length) return;

    const newFile = selectedFiles[0];

    if (!validateMimeTypes(newFile)) {
      addToast({ content: '.png, .jpeg의 파일 형식만 지원합니다.' });
      e.target.value = '';
      return;
    }

    setFile(newFile);
    setPreview(URL.createObjectURL(newFile));

    e.target.value = '';
  };

  const handleFileDelete = () => {
    setFile(null);
    setPreview(undefined);
  };

  return { file, preview, handleFileUpload, handleFileDelete };
};

export default useUploadFile;
