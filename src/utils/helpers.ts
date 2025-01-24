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
