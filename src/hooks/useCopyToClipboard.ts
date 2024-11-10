import { useState } from 'react';

const useCopyToClipboard = (copyText: string) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsCopied(false);
    }
  };

  return { isCopied, handleCopy };
};

export default useCopyToClipboard;
