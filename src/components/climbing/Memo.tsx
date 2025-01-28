import styled from 'styled-components';
import useModal from '@src/hooks/useModal';
import useLoaderData from '@src/hooks/useRoaderData';
import MemoDialog from '@src/components/climbing/MemoDialog';
import { ReactComponent as Plus } from '@src/assets/icons/hi_outline_plus.svg';

type MemoProps = {
  memo: string;
  isUser: boolean;
};

const Memo = async ({ memo, isUser }: MemoProps) => {
  const { id } = useLoaderData<{ id: number }>();
  const { openModal: openDialog, closeModal: closeDialog } =
    await useModal('dialog');

  const handleClickMemo = () => {
    openDialog(
      <MemoDialog climbingId={id} memo={memo} closeDialog={closeDialog} />,
    );
  };

  return (
    <Layout type='button' onClick={handleClickMemo} disabled={!isUser}>
      {(() => {
        if (isUser) {
          return (
            <>
              <Triangle />
              <TextBox>{memo || <Plus width={15} height={15} />}</TextBox>
            </>
          );
        }

        if (memo) {
          return (
            <>
              <Triangle />
              <TextBox>{memo}</TextBox>
            </>
          );
        }

        return <Blank />;
      })()}
    </Layout>
  );
};

export default Memo;

const Layout = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:disabled {
    cursor: default;
  }
`;
const Triangle = styled.div`
  width: 0rem;
  height: 0rem;
  border-bottom: 0.625rem solid ${({ theme }) => theme.colors.blue100};
  border-left: 0.375rem solid transparent;
  border-right: 0.375rem solid transparent;
`;
const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 2.5rem;
  max-width: 4.375rem;
  height: 2.125rem;

  padding: 0.25rem 0.4375rem;
  border-radius: ${({ theme }) => theme.rounded[6]};
  background-color: ${({ theme }) => theme.colors.blue100};

  ${({ theme }) => theme.fonts.caption};
  text-align: center;
  color: ${({ theme }) => theme.colors.blue500};
`;
const Blank = styled.div`
  height: 2.725rem;
`;
