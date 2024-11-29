import styled from 'styled-components';
import useDialog from '@src/hooks/useDialog';
import MemoDialog from '@src/components/climbing/MemoDialog';
import { ReactComponent as Plus } from '@src/assets/icons/hi_outline_plus.svg';
import useLoaderData from '@src/hooks/useRoaderData';

type MemoProps = {
  memo: string;
  isUser: boolean;
};

const Memo = ({ memo, isUser }: MemoProps) => {
  const { id } = useLoaderData<{ id: number }>();
  const { openDialog, closeDialog } = useDialog();

  const handleClickMemo = () => {
    openDialog(<MemoDialog id={id} memo={memo} closeDialog={closeDialog} />);
  };

  return (
    <Layout type='button' onClick={handleClickMemo} disabled={!isUser}>
      {isUser ? (
        <>
          <Triangle />
          <TextBox>{memo || <SPlus />}</TextBox>
        </>
      ) : (
        <Blank />
      )}
    </Layout>
  );
};

export default Memo;

const Layout = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Triangle = styled.div`
  width: 0rem;
  height: 0rem;
  border-bottom: 0.625rem solid ${({ theme }) => theme.colors.blue300};
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
  border-radius: 0.375rem;
  background-color: ${({ theme }) => theme.colors.blue300};

  ${({ theme }) => theme.fonts.caption};
  text-align: center;
`;
const SPlus = styled(Plus)`
  width: 0.9375rem;
  height: 0.9375rem;

  fill: ${({ theme }) => theme.colors.blue200};
`;
const Blank = styled.div`
  height: 2.725rem;
`;
