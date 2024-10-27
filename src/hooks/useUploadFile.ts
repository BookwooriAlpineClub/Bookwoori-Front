import { useState } from 'react';

const useUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFile = selectedFiles[0];
      setFile(newFile);
      setPreview(URL.createObjectURL(newFile));
    }
  };

  return { file, preview, handleFileUpload };
};

export default useUploadFile;
