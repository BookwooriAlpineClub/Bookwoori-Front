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
  const secondMs = 1000;
  const minuteMs = secondMs * 60;
  const hourMs = minuteMs * 60;
  const dayMs = hourMs * 24;
  const monthMs = dayMs * 31;
  const yearMs = monthMs * 12;

  let diffMs = x.getTime() - y.getTime();
  if (diffMs < 0) diffMs *= -1;

  if (diffMs >= yearMs) return `${diffMs / yearMs}년`;
  if (diffMs >= monthMs) return `${diffMs / monthMs}개월`;
  if (diffMs >= dayMs) return `${diffMs / dayMs}일`;
  if (diffMs >= hourMs) return `${diffMs / hourMs}시간`;
  if (diffMs >= minuteMs) return `${diffMs / minuteMs}분`;
  if (diffMs >= secondMs) return `${diffMs / secondMs}초`;
  return '방금';
};
