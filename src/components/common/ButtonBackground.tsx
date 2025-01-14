import styled from 'styled-components';

type ButtonBackgroundProps = {
  children: React.ReactNode;
  color?: string;
};

const ButtonBackground = ({ children, color }: ButtonBackgroundProps) => {
  return (
    <>
      <Blank />
      <Layout color={color}>{children}</Layout>
    </>
  );
};

export default ButtonBackground;

const Blank = styled.div`
  height: 5.9375rem;
`;
const Layout = styled.div<{ color: string | undefined }>`
  display: flex;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 0.9375rem 1.875rem 1.875rem;
  background-color: ${({ theme, color }) => color || theme.colors.neutral0};
`;
