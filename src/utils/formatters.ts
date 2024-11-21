import { isBase64Encoded } from '@src/utils/validators'; // at decodedIdParam

/**
 * input[type="date"] 태그는 "YYYY-MM-DD" 형식만 이해할 수 있습니다.
 * @param date new Date()로 생성한 객체
 * @returns "YYYY-MM-DD" 형식의 string
 */
export const formatDate = (date: Date): string => {
  return date
    .toLocaleDateString('ko-KR', {
      timeZone: undefined,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/(\d{4}). (\d{2}). (\d{2})./, '$1-$2-$3');
};

/**
 * a와 b의 시간 차를 특정 형식으로 반환합니다.
 * @param a new Date()로 생성한 객체
 * @param b new Date()로 생성한 객체
 * @returns "n년" | "n개월" | "n일" | "n시간" | "n분" | "n초" | "방금"
 */
export const formatTimeGap = (a: Date, b: Date): string => {
  const epochDate = new Date('1970-01-01');
  const diffDate = new Date(Math.abs(a.getTime() - b.getTime()));

  const diffList = [
    { diff: epochDate.getFullYear() - diffDate.getFullYear(), unit: '년' },
    { diff: epochDate.getMonth() - diffDate.getMonth(), unit: '개월' },
    { diff: epochDate.getDate() - diffDate.getDate(), unit: '일' },
    { diff: epochDate.getHours() - diffDate.getHours(), unit: '시간' },
    { diff: epochDate.getMinutes() - diffDate.getMinutes(), unit: '분' },
    { diff: epochDate.getSeconds() - diffDate.getSeconds(), unit: '초' },
  ];

  const timeGap = diffList.find((diffItem) => diffItem.diff !== 0);
  return timeGap ? `${Math.abs(timeGap.diff)}${timeGap.unit}` : '방금';
};

/* number를 base64로 인코딩하는 함수 */
export const encodeId = (id: number) => {
  return btoa(String(id));
};

/* param id가 base64로 인코딩된 string일 경우 디코딩하는 함수 */
export const decodeIdParam = (id: string | undefined): number => {
  if (!id) {
    throw new Error('Missing id');
  }
  if (!isBase64Encoded(id)) {
    return Number(id); // 추후에는 throw Error로 변경 예정 코드
  }
  try {
    const decodedString = atob(id);
    const decodedNumber = Number(decodedString);
    if (Number.isNaN(decodedNumber)) {
      throw new Error('Decoded ID is not a valid number');
    }
    return decodedNumber;
  } catch (e) {
    throw new Error(`${e}: Failed to decode id`);
  }
};
