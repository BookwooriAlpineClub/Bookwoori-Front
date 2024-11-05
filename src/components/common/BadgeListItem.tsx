import { theme } from '@src/styles/theme';
import styled from 'styled-components';

interface ItemProps {
  imgUrl: string;
  nickname: string;
  time: string;
  text: string;
  isRead: boolean;
}

interface BadgeListItemProps {
  listItem: ItemProps;
  type: 'notice' | 'chatting';
}

const BadgeListItem = ({ type, listItem }: BadgeListItemProps) => {
  const { imgUrl, nickname, time, text, isRead } = listItem;

  const decideCaptionColor = (): string => {
    if (!isRead) return theme.colors.blue100;

    if (type === 'notice') return theme.colors.black200;
    return theme.colors.black100;
  };

  return (
    <SLayout>
      <SImg src={imgUrl} />
      <SContainer>
        <SWrapper>
          <SCaption $color={decideCaptionColor}>{nickname}</SCaption>
          <SCaption $color={decideCaptionColor}>{time}</SCaption>
        </SWrapper>
        <SMessage $color={isRead && type === 'chatting'}>{text}</SMessage>
      </SContainer>
      {!isRead && <SCircle />}
    </SLayout>
  );
};

export default BadgeListItem;

const SLayout = styled.div`
  display: flex;
  gap: 0.125rem;

  padding: 0.9375rem 0.625rem;

  border-radius: 1.25rem;
  background-color: ${theme.colors.white};

  cursor: pointer;
`;
const SImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;

  background-color: ${theme.colors.blue300};
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
const SCaption = styled.span<{ $color: () => string }>`
  ${theme.fonts.caption};
  color: ${({ $color }) => $color};
`;
const SMessage = styled.span<{ $color: boolean }>`
  ${theme.fonts.body};
  color: ${({ $color }) =>
    $color ? theme.colors.black200 : theme.colors.black100};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const SCircle = styled.div`
  width: 0.375rem;
  height: 0.375rem;

  border-radius: 50%;
  background-color: ${theme.colors.blue100};
`;
