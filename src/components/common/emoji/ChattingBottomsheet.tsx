import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { dialogState, editChatIdState } from '@src/states/atoms';
import useCopyToClipboard from '@src/hooks/useCopyToClipboard';
import useModal from '@src/hooks/useModal';
import { deleteHandler, reactHandler } from '@src/apis/chat';
import { EmojiType } from '@src/constants/constants';
import IconButton from '@src/components/common/button/IconButton';
import DeleteConfirmDialog from '@src/components/common/modal/DeleteConfirmDialog';

type EmojiBottomsheetType = {
  isMine?: boolean;
  content: string;
  id: string;
  closeBottomsheet?: () => void;
};

const ChattingBottomsheet = ({
  isMine,
  content,
  id,
  closeBottomsheet = () => {},
}: EmojiBottomsheetType) => {
  const { handleCopy } = useCopyToClipboard();
  const { openModal, closeModal } = useModal(dialogState);
  const setEditChatId = useSetRecoilState(editChatIdState);

  const emojiList = Object.keys(EmojiType) as Array<keyof typeof EmojiType>;

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

  type EmojiKey = keyof typeof EmojiType;

  const handleEmojiClick = (key: EmojiKey) => {
    const emojiMapping: Record<EmojiKey, string> = {
      GOOD: 'thumbs_up',
      HEART: 'heart_hands',
      SMILE: 'smiling_face',
      CRY: 'crying_face',
      THINK: 'thinking_face',
    };
    handleReaction({
      emoji: emojiMapping[key].toUpperCase(),
      action: 'add',
    });
  };

  const handleReaction = async ({
    emoji,
    action,
  }: {
    emoji: string;
    action: string;
  }) => {
    try {
      await reactHandler(
        {
          id,
          emoji,
          action,
        },
        '/pub/direct/react',
      );
      console.log('Reaction added successfully');
      closeBottomsheet();
    } catch (error) {
      console.error('Failed to add reaction:', error);
    }
  };

  return (
    <Layout>
      <Container>
        {emojiList.map((key) => (
          <Emoji
            key={key}
            $isClicked={false}
            onClick={() => handleEmojiClick(key)}
          >
            {EmojiType[key].value}
          </Emoji>
        ))}
      </Container>
      <IconButton type='copyMessage' onClick={() => handleCopy(content)} />
      {isMine && <IconButton type='editMessage' onClick={handleEdit} />}
      {isMine && <IconButton type='deleteMessage' onClick={handleDelete} />}
    </Layout>
  );
};

export default ChattingBottomsheet;

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
