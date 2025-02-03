import styled from 'styled-components';
import failedPictogram from '@src/assets/images/climbing/fail_pictogram.svg';
import finishedPictogram from '@src/assets/images/climbing/finish_pictogram.svg';

const CompleteCard = ({ isFinished = true }: { isFinished?: boolean }) => {
  return (
    <CardWrapper>
      <TextContent>
        <h1>{isFinished ? '완등 성공!' : '완등 실패...'}</h1>
        <div className='p-container'>
          {isFinished ? (
            <>
              <p>모든 멤버가 완등했어요!</p>
              <p>경험치를 2배 드릴게요 :)</p>
            </>
          ) : (
            <>
              <p>모든 멤버가 완등하지 못했어요.</p>
              <p>다음엔 더 잘할 수 있을거예요!</p>
            </>
          )}
        </div>
      </TextContent>
      <Pictogram>
        {isFinished ? (
          <img src={finishedPictogram} alt='완등 성공' />
        ) : (
          <img src={failedPictogram} alt='완등 실패' />
        )}
      </Pictogram>
    </CardWrapper>
  );
};

export default CompleteCard;

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.rounded['8']};
  padding: ${({ theme }) => theme.padding['16']};
  background-color: ${({ theme }) => theme.colors.neutral0};
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.gap['12']};

  .p-container {
    display: flex;
    flex-direction: column;
  }
`;

const Pictogram = styled.div``;
