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
