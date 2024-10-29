import SubButton from '@src/components/channel/SubButton';
import Header from '@src/components/common/Header';
import styled from 'styled-components';
import { ReactComponent as Edit } from '@src/assets/icons/edit.svg';
import { ReactComponent as CategoryAdd } from '@src/assets/icons/category_add.svg';
import { ReactComponent as ChannelAdd } from '@src/assets/icons/channel_add.svg';
import Accordion from '@src/components/channel/Accordion';
import Carousel from '@src/components/channel/Carousel';
import ChannelList from '@src/components/channel/ChannelList';

const ChannelListPage = () => {
  const buttonData = [
    { icon: <SCategoryAdd />, label: '분류 추가' },
    { icon: <SChannelAdd />, label: '모임 추가' },
    { icon: <SEdit />, label: '목록 편집' },
  ];

  const channelNameData = [
    { name: '나의 등반', state: 'open', children: <Carousel /> },
    { name: '모집 중인 등반', state: 'close', children: <ChannelList /> },
    { name: '진행 중인 등반', state: 'open', children: <ChannelList /> },
    { name: '종료된 등반', state: 'close' },
  ];

  return (
    <>
      <Header headerType='server' text='채널' />
      <SLayout>
        <SButtonContainer>
          {buttonData.map((buttonItem) => (
            <SubButton key={buttonItem.label}>
              {buttonItem.icon} {buttonItem.label}
            </SubButton>
          ))}
        </SButtonContainer>
        <SContainer>
          {channelNameData.map((data) => (
            <Accordion key={data.name} text={data.name} state={data.state}>
              {data.children}
            </Accordion>
          ))}
        </SContainer>
      </SLayout>
    </>
  );
};

export default ChannelListPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  padding: 0.9063rem 1.25rem 2.5625rem;
`;
const SButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
const IconSize = styled.style`
  width: 5px;
  height: 1rem;
`;
const SEdit = styled(Edit)`
  ${IconSize}
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
