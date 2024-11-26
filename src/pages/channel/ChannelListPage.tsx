import styled, { css } from 'styled-components';
import { useEffect, useRef } from 'react';
import useDraggable from '@src/hooks/useDraggable';
import SubButton from '@src/components/channel/SubButton';
import Header from '@src/components/common/Header';
import Accordion from '@src/components/channel/Accordion';
import Carousel from '@src/components/channel/Carousel';
import ChannelList from '@src/components/channel/ChannelList';
import { ReactComponent as CategoryAdd } from '@src/assets/icons/category_add.svg';
import { ReactComponent as ChannelAdd } from '@src/assets/icons/channel_add.svg';

interface ButtonData {
  icon: React.ReactNode;
  label: string;
}

interface ChannelData {
  name: string;
  children: React.ReactNode;
  type?: 'default';
}

interface ClimbingChannel {
  climbingId: number;
  name: string;
  type: 'text' | 'voice' | 'run';
}

const mockList: ClimbingChannel[] = [
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
  {
    climbingId: 9,
    name: '클라이밍 채널 이름',
    type: 'run',
  },
];

const channelNameData: ChannelData[] = [
  { name: '나의 등반', children: <Carousel type='next'/>, type: 'default' },
  {
    name: '모집 중인 등반',
    children: <Carousel type='more' />,
    type: 'default',
  },
  {
    name: '분류1',
    children: <ChannelList list={mockList} />,
  },
  {
    name: '분류2',
    children: <ChannelList list={mockList} />,
  },
  {
    name: '분류3',
    children: <ChannelList list={mockList} />,
  },
  {
    name: '진행 중인 등반',
    children: <ChannelList list={mockList} />,
    type: 'default',
  },
  {
    name: '종료된 등반',
    children: <ChannelList list={mockList} />,
    type: 'default',
  },
];

const ChannelListPage = () => {
  const buttonData: ButtonData[] = [
    { icon: <SCategoryAdd />, label: '분류 추가' },
    { icon: <SChannelAdd />, label: '모임 추가' },
  ];

  const { list, handleDraggable } = useDraggable(channelNameData);
  const ref = useRef(channelNameData);

  useEffect(() => {
    if (JSON.stringify(ref.current) !== JSON.stringify(list)) {
      // 백에 데이터 전송
    }
  }, [list]);

  const handleDraggableCondition = (idx: number) => {
    const isDraggable = channelNameData[idx]?.type !== 'default';

    return isDraggable ? handleDraggable(idx) : {};
  };

  return (
    <>
      <SHeader headerType='server' text='채널' />
      <SLayout>
        <SButtonContainer>
          {buttonData.map((buttonItem) => (
            <SubButton key={buttonItem.label}>
              {buttonItem.icon} {buttonItem.label}
            </SubButton>
          ))}
        </SButtonContainer>
        <SContainer>
          {list.map((data, idx) => (
            <Accordion
              id={idx}
              key={data.name}
              text={data.name}
              {...handleDraggableCondition(idx)}
            >
              {data.children}
            </Accordion>
          ))}
        </SContainer>
      </SLayout>
    </>
  );
};

export default ChannelListPage;

const SHeader = styled(Header)`
  z-index: 1;
`;
const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  padding: 0.9063rem 1.25rem 2.5625rem;
`;
const SButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.625rem;
`;
const IconSize = css`
  width: 1rem;
  height: 1rem;
`;
const SChannelAdd = styled(ChannelAdd)`
  ${IconSize}
`;
const SCategoryAdd = styled(CategoryAdd)`
  ${IconSize}
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
`;
