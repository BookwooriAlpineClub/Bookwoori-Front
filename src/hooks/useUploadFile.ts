import { useEffect, useState } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import useToast from '@src/hooks/useToast';
import { validateMimeTypes } from '@src/utils/validators';

const useUploadFile = (
  previewImg: string | undefined,
  fileState: RecoilState<File | null>,
) => {
  const addToast = useToast();

  const [file, setFile] = useRecoilState<File | null>(fileState);
  const [preview, setPreview] = useState<string | undefined>(previewImg);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles?.length) return;

    const newFile = selectedFiles[0];

    if (!validateMimeTypes(newFile)) {
      addToast('error', '.png, .jpeg의 파일 형식만 지원합니다.');
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

  useEffect(() => {
    if (!previewImg) {
      handleFileDelete();
      return;
    }

    setPreview(previewImg);
  }, [previewImg]);

  return { file, preview, handleFileUpload, handleFileDelete };
};

export default useUploadFile;
