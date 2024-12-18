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
import { useNavigate } from 'react-router-dom';
import { encodeId } from '@src/utils/formatters';
import useChannel from '@src/hooks/query/useChannel';
import useCategory from '@src/hooks/query/useCategory';
// import useLoaderData from '@src/hooks/useRoaderData';
import useSideBarData from '@src/hooks/query/useSideBarData';
import { useRecoilValue } from 'recoil';
import { currentServerIdState } from '@src/states/atoms';

interface ButtonData {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const ChannelListPage = () => {
  const serverId = useRecoilValue(currentServerIdState);
  // const { id: serverId } = useLoaderData<{ id: number }>();'
  const navigate = useNavigate();
  const buttonData: ButtonData[] = [
    {
      icon: <SCategoryAdd />,
      label: '분류 추가',
      onClick: () => navigate(`/server/${encodeId(serverId)}/create/category`),
    },
    {
      icon: <SChannelAdd />,
      label: '모임 추가',
      onClick: () => navigate(`/server/${encodeId(serverId)}/create/channel`),
    },
  ];
  const { channels, climbingList } = useChannel(serverId);
  const { categoryList: channelNameData = [] } = useCategory(serverId);
  const { list, handleDraggable } = useDraggable(channelNameData);
  const { serverInfo } = useSideBarData(serverId);
  const ref = useRef(channelNameData);

  useEffect(() => {
    if (JSON.stringify(ref.current) !== JSON.stringify(list)) {
      // 백에 데이터 전송
    }
  }, [list]);

  return (
    <>
      <SHeader headerType='server' text={serverInfo?.name ?? '서버'} />
      <SLayout>
        <SButtonContainer>
          {buttonData.map((buttonItem) => (
            <SubButton key={buttonItem.label} onClick={buttonItem.onClick}>
              {buttonItem.icon} {buttonItem.label}
            </SubButton>
          ))}
        </SButtonContainer>
        <SContainer>
          <Accordion key='나의 등반' text='나의 등반'>
            <Carousel type='next' list={climbingList?.myClimbings ?? []} />
          </Accordion>
          <Accordion key='모집 중인 등반' text='모집 중인 등반'>
            <Carousel type='more' list={climbingList?.readyClimbings ?? []} />
          </Accordion>
          {channels?.map((data, idx) => (
            <Accordion
              id={idx}
              key={data.name}
              text={data.name === 'DEFAULT' ? '기본' : data.name}
              {...handleDraggable(idx)}
            >
              {data.channels.length > 0 && (
                <ChannelList
                  channels={data.channels}
                  categoryId={Number(data.categoryId)}
                />
              )}
            </Accordion>
          ))}
          <Accordion key='진행 중인 등반' text='진행 중인 등반'>
            {climbingList && climbingList?.runningClimbings.length > 0 && (
              <ChannelList climbs={climbingList?.runningClimbings} />
            )}
          </Accordion>
          <Accordion key='종료된 등반' text='종료된 등반'>
            {climbingList && climbingList?.endClimbingings.length > 0 && (
              <ChannelList climbs={climbingList?.endClimbingings} />
            )}
          </Accordion>
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
