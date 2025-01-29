import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Fieldset from '@src/components/book/Fieldset';
import { ReactComponent as IcnStar } from '@src/assets/icons/md_star.svg';

interface Props {
  name: { num: string; str: string };
  readOnly?: boolean;
  num: number;
  setNum?: React.Dispatch<React.SetStateAction<number>>;
  str: string;
  setStr?: React.Dispatch<React.SetStateAction<string>>;
}

const InputReview = ({
  name,
  readOnly = false,
  num,
  setNum,
  str,
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
            {index < num ? <IcnStarBlue /> : <IcnStarGray />}
            <input
              name={name.num}
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
          name={name.str}
          placeholder='이 책은 어떠셨나요? 감상평을 적어주세요.'
          readOnly={readOnly}
          defaultValue={str}
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
  color: ${({ theme }) => theme.colors.blue500};
`;
const IcnStarGray = styled(IcnStar)`
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.neutral400};
`;
const Textarea = styled.textarea<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  padding: ${({ theme }) => `${theme.padding[12]} ${theme.padding[16]}`};

  border-radius: ${({ theme }) => theme.rounded[16]};
  background-color: ${({ theme }) => theme.colors.neutral0};

  ${({ theme }) => theme.fonts.body}
  color: ${({ theme }) => theme.colors.neutral950};

  resize: none;

  &::placeholder {
    text-align: center;
    align-content: center;

    color: ${({ theme }) => theme.colors.neutral400};
  }

  &:read-only {
    background-color: transparent;
  }
`;
