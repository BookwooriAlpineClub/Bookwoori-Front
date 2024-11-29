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
  return data?.message === '만료된 액세스 토큰입니다.';
};