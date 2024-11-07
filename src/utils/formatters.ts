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
 * x와 y의 시간 차를 특정 형식으로 반환합니다.
 * @param x new Date()로 생성한 객체
 * @param y new Date()로 생성한 객체
 * @returns "n년" | "n개월" | "n일" | "n시간" | "n분" | "n초" | "방금"
 */
export const formatTimeGap = (x: Date, y: Date): string => {
  let diff: number = 0;
  let time: string = '방금';

  diff = x.getFullYear() - y.getFullYear();
  if (diff !== 0) time = '년';
  diff = x.getMonth() - y.getMonth();
  if (diff !== 0) time = '개월';
  diff = x.getDate() - y.getDate();
  if (diff !== 0) time = '일';
  diff = x.getHours() - y.getHours();
  if (diff !== 0) time = '시간';
  diff = x.getMinutes() - y.getMinutes();
  if (diff !== 0) time = '분';
  diff = x.getSeconds() - y.getSeconds();
  if (diff !== 0) time = '초';

  return diff ? `${Math.abs(diff)}${time}` : time;
};
