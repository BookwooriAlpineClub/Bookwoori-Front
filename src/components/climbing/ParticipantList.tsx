import useClimbing from '@src/hooks/query/useClimbing';
import styled from 'styled-components';
import Profile from '@src/assets/images/userSettings/profile_default.svg';

const ParticipantList = ({ climbingId }: { climbingId: number }) => {
  const { participants } = useClimbing(climbingId);

  return (
    <Layout>
      {participants?.map((it) => (
        <Container key={it.memberId}>
          <Img
            src={it.profileImg === null ? Profile : it.profileImg}
            alt='img'
          />
          <Name>{it.nickname}</Name>
          <Level>
            Lv.{it.level} {it.mountain} 마스터
          </Level>
        </Container>
      ))}
    </Layout>
  );
};

export default ParticipantList;

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  width: 12.5rem;
  padding: 0.25rem;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4375rem;

  padding: 0.1875rem;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;

  border-radius: 50%;
`;
const Name = styled.span``;
const Level = styled.span`
  ${({ theme }) => theme.fonts.caption}
  color: ${({ theme }) => theme.colors.neutral400}
`;
