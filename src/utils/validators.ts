/* eslint-disable */
export const isBase64Encoded = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false; // 디코딩 실패 시 Base64가 아님
  }
};

// 후에 에러 타입 반영 수정
export const isTokenExpiredMessage = (data: any): boolean => {
  return data?.message == '만료된 엑세스 토큰입니다.';
};

export const isTokenWrong = (data: any): boolean => {
  return (
    data?.message == '잘못된 JWT 서명입니다.' ||
    data?.message == '잘못된 토큰입니다.'
  );
};

export const isRefreshExpired = (data: any): boolean => {
  return data?.message == '만료된 리프레쉬 토큰입니다.';
};


export const validateMimeTypes = (newFile: File) => {
  const validMimeTypes = ['image/png', 'image/jpeg'];
  return validMimeTypes.includes(newFile.type);
};