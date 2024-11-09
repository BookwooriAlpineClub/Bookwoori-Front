import styled from 'styled-components';

const ButtonBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Blank />
      <Layout>{children}</Layout>
    </>
  );
};

export default ButtonBackground;

const Blank = styled.div`
  height: 5.9375rem;
`;
const Layout = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 0.9375rem 1.875rem 1.875rem;

  background-color: ${({ theme }) => theme.colors.white};
`;
