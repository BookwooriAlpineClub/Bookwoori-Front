import type Record from '@src/types/record';
import type Review from '@src/types/review';
import { useState } from 'react';
import useModal from '@src/hooks/useModal';
import { usePostReview, usePatchReview } from '@src/hooks/query/review';
import { bottomsheetState } from '@src/states/atoms';
import styled from 'styled-components';
import Fieldset from '@src/components/common/Fieldset';
import Section from '@src/components/common/Section';
import Button from '@src/components/common/button/Button';
import TextField from '@src/components/common/input/TextField';
import RatingField from '@src/components/library/RatingField';

type Props = Pick<Record, 'recordId'> &
  Partial<Pick<Review, 'reviewId' | 'star' | 'content'>>;

const ReviewBottomsheet = ({
  recordId,
  reviewId,
  star: defaultStar,
  content: defaultContent,
}: Props) => {
  const [star, setStar] = useState<Review['star']>(defaultStar ?? 0);
  const [content, setContent] = useState<Review['content']>(
    defaultContent ?? '',
  );

  const { closeModal: closeBottomsheet } = useModal(bottomsheetState);
  const { mutate: createReview } = usePostReview();
  const { mutate: updateReview } = usePatchReview(reviewId ?? -1);
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (reviewId) {
      updateReview({ body: { recordId, star, content } });
    } else {
      createReview({ body: { recordId, star, content } });
    }

    closeBottomsheet();
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Fieldset title='감상평'>
        <RatingField required num={star} setNum={setStar} />
        <Section>
          <TextField
            as='textarea'
            name='content'
            placeholder='이 책은 어떠셨나요? 감상평을 적어주세요.'
            maxLength={-1}
            required
            value={content}
            setValue={setContent}
          />
        </Section>
      </Fieldset>
      <Button type='submit'>저장하기</Button>
    </Form>
  );
};

export default ReviewBottomsheet;

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[16]};

  padding: ${({ theme }) => `${theme.padding[24]} ${theme.padding[16]}`};
`;
