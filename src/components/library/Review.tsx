import styled from 'styled-components';
import { TextEllipsis } from '@src/styles/mixins';
import StarReview from '@src/components/library/StarReview';

interface Props {
  star: number;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

const Review = ({ star, content, createdAt, modifiedAt }: Props) => {
  return (
    <Container>
      <Wrapper>
        <StarReview starReview={star} />
        <Time>{`${createdAt} 작성 (${modifiedAt} 수정)`}</Time>
      </Wrapper>
      <Content $line={3}>{content}</Content>
    </Container>
  );
};

export default Review;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[10]};
`;
const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;
const Time = styled.span`
  ${({ theme }) => theme.fonts.caption}
  line-height: unset;
`;
const Content = styled.p<{ $line: number }>`
  ${({ theme }) => theme.fonts.body}
  ${TextEllipsis}
`;
