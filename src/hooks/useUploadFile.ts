import { useState } from 'react';

const useUploadFile = (previewImg: string | undefined) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(previewImg);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles?.length) return;

    const newFile = selectedFiles[0];
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
