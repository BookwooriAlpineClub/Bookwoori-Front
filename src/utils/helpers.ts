import { SyntheticEvent } from 'react';

// ms초 만큼 기다리는 함수
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const empty = {};

export const handleImgError = (
  e: SyntheticEvent<HTMLImageElement>,
  altImg: string,
) => {
  e.currentTarget.src = altImg;
};

export const adjustHeight = (
  inputRef: React.MutableRefObject<HTMLTextAreaElement | null>,
  MIN_HEIGHT: number,
) => {
  if (inputRef.current) {
    inputRef.current.style.height = `${MIN_HEIGHT}px`;

    if (inputRef.current.scrollHeight > MIN_HEIGHT) {
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }
};
