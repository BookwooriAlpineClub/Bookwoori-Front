import styled from 'styled-components';
import ChattingListItem from '@src/components/chatting/ChattingListItem';
import Header from '@src/components/common/Header';

const ChattingListPage = () => {
  return (
    <>
      <Header text='문자' headerType='hamburger' />
      <SLayout>
        <ChattingListItem />
        <ChattingListItem />
      </SLayout>
    </>
  );
};

export default ChattingListPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  padding: 0.9375rem;
`;
