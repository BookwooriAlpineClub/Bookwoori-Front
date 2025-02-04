import styled from 'styled-components';
import { useState } from 'react';
import { dialogState, editChatIdState } from '@src/states/atoms';
import useCopyToClipboard from '@src/hooks/useCopyToClipboard';
import { EmojiType } from '@src/constants/constants';
import { deleteHandler } from '@src/apis/chat';
import IconButton from '@src/components/common/button/IconButton';
import useModal from '@src/hooks/useModal';
import DeleteConfirmDialog from '@src/components/common/modal/DeleteConfirmDialog';
import { useSetRecoilState } from 'recoil';

type EmojiBottomsheetType = {
  emoji?: string[];
  content: string;
  id: string;
  closeBottomsheet?: () => void;
};

const EmojiBottomsheet = ({
  emoji = [],
  content,
  id,
  closeBottomsheet = () => {},
}: EmojiBottomsheetType) => {
  const emojiList = Object.values(EmojiType).map(({ value }) => value);
  const { handleCopy } = useCopyToClipboard();
  const [clickedEmoji, setClickedEmoji] = useState<string[]>(emoji);
  const { openModal, closeModal } = useModal(dialogState);
  const setEditChatId = useSetRecoilState(editChatIdState);

  const handleClickEmoji = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const clicked = e.currentTarget.textContent;
    if (!clicked) return;
    if (clickedEmoji?.includes(clicked)) {
      setClickedEmoji((prev) => [...prev].filter((it) => it !== clicked));
      return;
    }

    setClickedEmoji((prev) => [...prev, clicked]);
  };

  const handleDeleteMessage = async () => {
    try {
      await deleteHandler({ id }, '/pub/direct/delete');
      console.log('Message deleted successfully');
      closeModal();
      closeBottomsheet();
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const handleDelete = () => {
    openModal(
      <DeleteConfirmDialog
        text={`정말 이 메시지를 삭제할까요?\n"${content}"`}
        closeDialog={closeModal}
        onClickDelete={() => handleDeleteMessage()}
      />,
    );
  };

  const handleEdit = () => {
    setEditChatId(id);
    closeBottomsheet();
  };

  return (
    <Layout>
      <Container>
        {emojiList.map((it) => (
          <Emoji
            key={it}
            $isClicked={clickedEmoji.includes(it)}
            onClick={handleClickEmoji}
          >
            {it}
          </Emoji>
        ))}
      </Container>
      <IconButton type='copyMessage' onClick={() => handleCopy(content)} />
      <IconButton type='editMessage' onClick={handleEdit} />
      <IconButton type='deleteMessage' onClick={handleDelete} />
    </Layout>
  );
};

export default EmojiBottomsheet;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[10]};

  margin: 1.44rem 1.25rem 1.25rem 1.25rem;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Emoji = styled.button<{ $isClicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.125rem;
  height: 3.125rem;

  border-radius: 50%;
  background-color: ${({ theme, $isClicked }) =>
    $isClicked ? theme.colors.blue100 : theme.colors.neutral0};

  font-size: 1.5rem;
`;
