import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Fieldset from '@src/components/book/Fieldset';
import { ReactComponent as IcnStar } from '@src/assets/icons/md_star.svg';

interface Props {
  star: number;
  reviewContent: string;
  readOnly: boolean;
  setNum?: React.Dispatch<React.SetStateAction<number>>;
  setStr?: React.Dispatch<React.SetStateAction<string>>;
}

const InputReview = ({
  star,
  reviewContent,
  readOnly,
  setNum,
  setStr,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [textareaHeight, setTextareaHeight] = useState<number>(0);

  useEffect(() => {
    if (textareaRef.current) {
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  }, [textareaRef.current?.value]);

  return (
    <Fieldset title='감상평'>
      <StarFieldset>
        {Array.from({ length: 5 }, (_, index) => (
          <label key={index}>
            {index < star ? <IcnStarBlue /> : <IcnStarGray />}
            <input
              name='star'
              type='radio'
              value={index + 1}
              required
              readOnly={readOnly}
              onChange={(e) => setNum?.(Number(e.target.value))}
            />
          </label>
        ))}
      </StarFieldset>
      <fieldset>
        <Textarea
          ref={textareaRef}
          $height={textareaHeight}
          name='reviewContent'
          placeholder='이 책은 어떠셨나요? 감상평을 적어주세요.'
          readOnly={readOnly}
          defaultValue={reviewContent}
          onChange={(e) => setStr?.(e.target.value)}
        />
      </fieldset>
    </Fieldset>
  );
};

export default InputReview;

const StarFieldset = styled.fieldset`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 0.3125rem;
`;
const IcnStarBlue = styled(IcnStar)`
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.blue100};
`;
const IcnStarGray = styled(IcnStar)`
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.black200};
`;
const Textarea = styled.textarea<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  padding: 0.75rem 1rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.body}
  color: ${({ theme }) => theme.colors.black100};

  resize: none;

  &::placeholder {
    text-align: center;
    align-content: center;

    color: ${({ theme }) => theme.colors.black200};
  }

  &:read-only {
    background-color: transparent;
  }
`;
