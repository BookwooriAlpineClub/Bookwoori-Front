import styled from 'styled-components';
import UserAvatar from '@src/components/common/UserAvatar';

type BadgeListItemType = {
  imgUrl: string;
  caption: string;
  time: string;
  message: string;
  isRead: boolean;
  nickname?: string;
};
interface Props extends BadgeListItemType {
  type: 'notice' | 'chatting';
  onClick: () => void;
}

const StatusBadgeListItem = ({
  type,
  imgUrl,
  caption,
  time,
  message,
  isRead,
  nickname,
  onClick,
}: Props) => {
  return (
    <Layout onClick={onClick}>
      <UserAvatar size='2.5rem' profileImg={imgUrl} nickname={nickname} />
      <Container>
        <Wrapper>
          <Caption className={type} $isRead={isRead}>
            {caption}
          </Caption>
          <Caption className={type} $isRead={isRead}>
            {time}
          </Caption>
        </Wrapper>
        <Message className={type} $isRead={isRead}>
          {message}
        </Message>
      </Container>
      {!isRead && <Circle />}
    </Layout>
  );
};

export default StatusBadgeListItem;

const Layout = styled.li`
  display: flex;
  gap: ${({ theme }) => theme.gap[2]};

  padding: ${({ theme }) => `${theme.padding[16]} ${theme.padding[12]}`};

  border-radius: ${({ theme }) => theme.rounded[16]};
  background-color: ${({ theme }) => theme.colors.neutral0};

  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[4]};

  padding: ${({ theme }) => `0 ${theme.padding[8]}`};
  width: calc(100% - 3.125rem);
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Caption = styled.span<{ $isRead: boolean }>`
  ${({ theme }) => theme.fonts.caption};

  &.notice {
    color: ${({ $isRead, theme }) =>
      $isRead ? theme.colors.neutral400 : theme.colors.blue500};
  }
  &.chatting {
    color: ${({ $isRead, theme }) =>
      $isRead ? theme.colors.neutral950 : theme.colors.blue500};
  }
`;
const Message = styled.span<{ $isRead: boolean }>`
  ${({ theme }) => theme.fonts.body};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.notice {
    color: ${({ theme }) => theme.colors.neutral950};
  }
  &.chatting {
    color: ${({ $isRead, theme }) =>
      $isRead ? theme.colors.neutral400 : theme.colors.neutral950};
  }
`;
const Circle = styled.div`
  width: 0.375rem;
  height: 0.375rem;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue500};
`;
