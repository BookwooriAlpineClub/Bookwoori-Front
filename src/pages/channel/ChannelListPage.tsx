import styled, { css } from 'styled-components';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentServerIdState } from '@src/states/atoms';
import useDraggable from '@src/hooks/useDraggable';
import useChannel from '@src/hooks/query/useChannel';
import useCategory from '@src/hooks/query/useCategory';
// import useLoaderData from '@src/hooks/useRoaderData';
import useSideBarData from '@src/hooks/query/useSideBarData';
import { encodeId } from '@src/utils/formatters';
import SubButton from '@src/components/channel/SubButton';
import Header from '@src/components/common/Header';
import Accordion from '@src/components/common/Accordion';
import Carousel from '@src/components/channel/Carousel';
import ChannelList from '@src/components/channel/ChannelList';
import { ReactComponent as CategoryAdd } from '@src/assets/icons/category_add.svg';
import { ReactComponent as ChannelAdd } from '@src/assets/icons/channel_add.svg';

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
      <Layout>
        <ButtonContainer>
          {buttonData.map((buttonItem) => (
            <SubButton key={buttonItem.label} onClick={buttonItem.onClick}>
              {buttonItem.icon} {buttonItem.label}
            </SubButton>
          ))}
        </ButtonContainer>
        <Container>
          <Accordion key='나의 등반' title={<Label>나의 등반</Label>}>
            <Carousel type='next' list={climbingList?.myClimbings ?? []} />
          </Accordion>
          <Accordion key='모집 중인 등반' title={<Label>모집 중인 등반</Label>}>
            <Carousel type='more' list={climbingList?.readyClimbings ?? []} />
          </Accordion>
          {channels?.map((data, idx) => (
            <Accordion
              id={idx}
              key={data.name}
              title={
                data.name === 'DEFAULT' ? (
                  <Label>기본</Label>
                ) : (
                  <Label>{data.name}</Label>
                )
              }
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
          <Accordion key='진행 중인 등반' title={<Label>진행 중인 등반</Label>}>
            {climbingList && climbingList?.runningClimbings.length > 0 && (
              <ChannelList climbs={climbingList?.runningClimbings} />
            )}
          </Accordion>
          <Accordion key='종료된 등반' title={<Label>종료된 등반</Label>}>
            {climbingList && climbingList?.endClimbingings.length > 0 && (
              <ChannelList climbs={climbingList?.endClimbingings} />
            )}
          </Accordion>
        </Container>
      </Layout>
    </>
  );
};

export default ChannelListPage;

const SHeader = styled(Header)`
  z-index: 1;
`;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  padding: 0.9063rem 1.25rem 2.5625rem;
`;
const ButtonContainer = styled.div`
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
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
`;
const Label = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};
`;
