import styled from 'styled-components';

interface Chatting {
  imgUrl: string;
  nickname: string;
  time: string;
  text: string;
  read: boolean;
}

const ChattingListItem = ({ imgUrl, nickname, time, text, read }: Chatting) => {
  return (
    <SLayout>
      <SImg src={imgUrl} />
      <SContainer>
        <SWrapper>
          <SCaption $read={read}>{nickname}</SCaption>
          <SCaption $read={read}>{time}</SCaption>
        </SWrapper>
        <SPreview $read={read}>{text}</SPreview>
      </SContainer>
      {!read && <SCircle />}
    </SLayout>
  );
};

export default ChattingListItem;

const SLayout = styled.div`
  display: flex;
  gap: 0.125rem;

  padding: 0.9375rem 0.625rem;

  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.white};

  cursor: pointer;
`;
const SImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;

  background-color: ${({ theme }) => theme.colors.blue300};
  border-radius: 50%;
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  padding: 0 0.5rem;
  width: calc(100% - 3.125rem);
`;
const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SCaption = styled.label<{ $read: boolean }>`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme, $read }) =>
    $read ? theme.colors.black100 : theme.colors.blue100};
`;
const SPreview = styled.label<{ $read: boolean }>`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme, $read }) =>
    $read ? theme.colors.black200 : theme.colors.black100};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const SCircle = styled.div`
  width: 0.375rem;
  height: 0.375rem;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue100};
`;
