import styled from 'styled-components';

type BadgeListItemType = {
  imgUrl: string;
  caption: string;
  time: string;
  message: string;
  isRead: boolean;
};
interface Props extends BadgeListItemType {
  type: 'notice' | 'chatting';
  onClick: () => void;
}

const BadgeListItem = ({
  type,
  imgUrl,
  caption,
  time,
  message,
  isRead,
  onClick,
}: Props) => {
  return (
    <SLayout onClick={onClick}>
      <SImg src={imgUrl} />
      <SContainer>
        <SWrapper>
          <SCaption className={type} $isRead={isRead}>
            {caption}
          </SCaption>
          <SCaption className={type} $isRead={isRead}>
            {time}
          </SCaption>
        </SWrapper>
        <SMessage className={type} $isRead={isRead}>
          {message}
        </SMessage>
      </SContainer>
      {!isRead && <SCircle />}
    </SLayout>
  );
};

export default BadgeListItem;

const SLayout = styled.li`
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
const SCaption = styled.span<{ $isRead: boolean }>`
  ${({ theme }) => theme.fonts.caption};

  &.notice {
    color: ${({ $isRead, theme }) =>
      $isRead ? theme.colors.black200 : theme.colors.blue100};
  }
  &.chatting {
    color: ${({ $isRead, theme }) =>
      $isRead ? theme.colors.black100 : theme.colors.blue100};
  }
`;
const SMessage = styled.span<{ $isRead: boolean }>`
  ${({ theme }) => theme.fonts.body};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.notice {
    color: ${({ theme }) => theme.colors.black100};
  }
  &.chatting {
    color: ${({ $isRead, theme }) =>
      $isRead ? theme.colors.black200 : theme.colors.black100};
  }
`;
const SCircle = styled.div`
  width: 0.375rem;
  height: 0.375rem;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue100};
`;
