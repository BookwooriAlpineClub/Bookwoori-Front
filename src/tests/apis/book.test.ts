/**
 * @jest-environment node
 * @jest-environment-options {}
 */

import type { BookListItem, BookDetail } from '@src/types/apis/book.d';
import { getBookList, getBookDetail } from '@src/apis/book';

describe('Book API', () => {
  test('getBookList', async () => {
    const keyword: string = '한강';
    const data: BookListItem[] = await getBookList(keyword);

    expect(data).toContain<BookListItem>({
      title: '디 에센셜 한강 (무선 보급판) - 2024 노벨문학상 수상작가',
      author: '한강 (지은이)',
      publisher: '문학동네',
      pubYear: '2023',
      isbn13: '9788954693462',
      cover:
        'https://image.aladin.co.kr/product/31784/0/coversum/8954693466_2.jpg',
    });
  });
  test('getBookDetail', async () => {
    const isbn13: number = 9788954693462;
    const data: BookDetail = await getBookDetail(isbn13);

    expect(data).toMatchObject<BookDetail>({
      title: '디 에센셜 한강 (무선 보급판) - 2024 노벨문학상 수상작가',
      author: '한강 (지은이)',
      publisher: '문학동네',
      pubYear: '2023',
      itemPage: 364,
      description:
        '작가의 핵심 작품들을 큐레이팅하여 한 권으로 엮은 스페셜 에디션 ‘디 에센셜The essential’. 문학동네에서 출시하는 디 에센셜 한국작가 편은 ‘센세이션’이라는 키워드 아래, 독자들에게 강렬한 독서 경험을 선사하며 한국문학에 센세이션을 일으킨 작가를 선정한다. 첫번째 작가는 한강이다.',
      cover:
        'https://image.aladin.co.kr/product/31784/0/coversum/8954693466_2.jpg',
    });
  });
});
