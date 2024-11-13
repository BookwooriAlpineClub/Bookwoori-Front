/* eslint-disable */
export const isBase64Encoded = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false; // 디코딩 실패 시 Base64가 아님
  }
};
