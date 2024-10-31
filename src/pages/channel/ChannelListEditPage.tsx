import styled from 'styled-components';
import Header from '@src/components/common/Header';
import Button from '@src/components/common/Button';
import Accordion from '@src/components/channel/Accordion';
import ChannelList from '@src/components/channel/ChannelList';
import React, { useRef, useState } from 'react';

type ClimbingStatus = 'RUNNING' | 'READY' | 'FINISHED';

interface Climb {
  climbingId: number;
  name: string;
  type: 'text' | 'voice' | 'run';
  status?: ClimbingStatus;
}

interface ClimbingData {
  myclimbings: Climb[];
  runningClimbs: Omit<Climb, 'status'>[];
  finishedClimbs: Omit<Climb, 'status'>[];
}

const mockList: ClimbingData = {
  myclimbings: [
    {
      climbingId: 1,
      name: '클라이밍 채널 이름',
      status: 'RUNNING',
      type: 'run',
    },
    {
      climbingId: 2,
      name: '클라이밍 채널 이름',
      status: 'READY',
      type: 'run',
    },
    {
      climbingId: 3,
      name: '클라이밍 채널 이름',
      status: 'FINISHED',
      type: 'run',
    },
  ],
  // "readyclimbs": 조회 API 따로 존재
  runningClimbs: [
    {
      climbingId: 4,
      name: '클라이밍 채널 이름',
      type: 'voice',
    },
    {
      climbingId: 5,
      name: '클라이밍 채널 이름',
      type: 'run',
    },
  ],
  finishedClimbs: [
    {
      climbingId: 7,
      name: '클라이밍 채널 이름',
      type: 'text',
    },
    {
      climbingId: 8,
      name: '클라이밍 채널 이름',
      type: 'voice',
    },
  ],
};

const keys = Object.keys(mockList) as Array<keyof ClimbingData>;

const ChannelListEditPage = () => {
  const [list, setList] = useState(keys);
  const ref = useRef(list);

  const onDrop = (e: React.DragEvent, idx: number) => {
    e.preventDefault();

    if (idx === -1) return;
    const sourceIdx = Number(e.dataTransfer.getData('idx'));
    const updateList = [...list];
    const [movedList] = updateList.splice(sourceIdx, 1);

    updateList.splice(idx, 0, movedList);
    setList(updateList);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Header text='목록 편집하기' headerType='back' />
      <SLayout>
        <SContainer>
          {list.map((key, idx) => (
            <Accordion
              id={idx}
              text={key}
              key={key}
              isDraggable
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <ChannelList color='grey' list={mockList[key]} />
            </Accordion>
          ))}
        </SContainer>
        <Button disabled={JSON.stringify(ref.current) === JSON.stringify(list)}>
          편집하기
        </Button>
      </SLayout>
    </>
  );
};

export default ChannelListEditPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.9375rem;

  min-height: calc(100% - 4.375rem);
  padding: 0.9063rem 1.25rem;
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  width: 100%;
`;
