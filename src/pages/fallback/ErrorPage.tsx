import SubButton from '@src/components/common/SubButton';
import styled from 'styled-components';

interface ErrorPageType {
  h2?: string;
  h3?: string;
  buttonLabel?: string;
  onClick?: () => void;
}

const ErrorPage = ({ h2, h3, buttonLabel, onClick }: ErrorPageType) => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <Layout>
      <Container>
        <Title>{h2 ?? '현재 페이지를 표시할 수 없습니다.'}</Title>
        <h3>{h3 ?? '잠시 후 다시 시도해주세요.'}</h3>
      </Container>
      <SubButton
        width='6.25rem'
        label={buttonLabel ?? '새로고침'}
        onClick={onClick ?? reloadPage}
      />
    </Layout>
  );
};

export default ErrorPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;

  height: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.gap[12]};
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.colors.blue700};
`;
