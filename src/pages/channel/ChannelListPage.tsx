import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentServerIdState } from '@src/states/atoms';
import useDraggable from '@src/hooks/useDraggable';
import {
  useGetServerChannel,
  useGetServerClimbing,
} from '@src/hooks/query/channel';
import { usePatchCategoryLocation } from '@src/hooks/query/category';
import { encodeId } from '@src/utils/formatters';
import SubButton from '@src/components/common/button/SubButton';
import Header from '@src/components/common/Header';
import Accordion from '@src/components/common/Accordion';
import Carousel from '@src/components/channel/Carousel';
import ChannelList from '@src/components/channel/ChannelList';
import { ReactComponent as CategoryAdd } from '@src/assets/icons/bi_book_add.svg';
import { ReactComponent as ChannelAdd } from '@src/assets/icons/md_outline_playlist_add.svg';

const ChannelListPage = () => {
  const navigate = useNavigate();
  const serverId = useRecoilValue(currentServerIdState);

  const serverInfo = { name: '서버' };
  const { channels = [] } = useGetServerChannel();
  const { climbingList } = useGetServerClimbing();
  const { editLocation } = usePatchCategoryLocation();

  const { list, handleDraggable, beforeIdx, categoryId } =
    useDraggable(channels);
  const ref = useRef(channels);

  useEffect(() => {
    if (categoryId === -1 || beforeIdx === -1) return;

    if (JSON.stringify(ref.current) !== JSON.stringify(list)) {
      editLocation.mutate(
        {
          categoryId,
          body: { beforeCategoryId: beforeIdx },
        },
        {
          onSuccess: () => {
            if (list) ref.current = list;
          },
        },
      );
    }
  }, [list, beforeIdx, categoryId]);

  return (
    <>
      <Header headerType='server' text={serverInfo?.name ?? '서버'} />
      <Main>
        <ButtonContainer>
          <SubButton
            icon={<CategoryAdd width={16} height={16} />}
            label='분류 추가'
            onClick={() =>
              navigate(`/server/${encodeId(serverId)}/create/category`)
            }
          />
          <SubButton
            icon={<ChannelAdd width={18} height={18} />}
            label='모임 추가'
            onClick={() =>
              navigate(`/server/${encodeId(serverId)}/create/channel`)
            }
          />
        </ButtonContainer>
        <Container>
          <Accordion key='나의 등반' title={<Label>나의 등반</Label>}>
            <Carousel type='next' list={climbingList?.myClimbings ?? []} />
          </Accordion>
          <Accordion key='모집 중인 등반' title={<Label>모집 중인 등반</Label>}>
            <Carousel type='more' list={climbingList?.readyClimbings ?? []} />
          </Accordion>
          {list?.map((data) => (
            <Accordion
              dataIdx={data.categoryId}
              key={data.categoryId}
              title={
                data.name === 'DEFAULT' ? (
                  <Label>기본</Label>
                ) : (
                  <Label>{data.name}</Label>
                )
              }
              {...handleDraggable(data.categoryId)}
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
      </Main>
    </>
  );
};

export default ChannelListPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[12]};

  padding: 0 ${({ theme }) => theme.padding[16]};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.gap[10]};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[12]};
  padding-bottom: ${({ theme }) => theme.padding[16]};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.neutral950};
`;
