import styled from 'styled-components';
import useModal from '@src/hooks/useModal';
import type Modal from '@src/types/modal';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  communityDrawerState,
  currentServerIdState,
  dialogState,
} from '@src/states/atoms';
import { ROUTE_PATH } from '@src/constants/routePath';
import useCopyToClipboard from '@src/hooks/useCopyToClipboard';
import { encodeId } from '@src/utils/formatters';

import Fieldset from '@src/components/common/Fieldset';
import Scrim from '@src/components/common/modal/Scrim';
import CommunityButton from '@src/components/common/button/IconButton';
import ProfileModal from '@src/components/community/ProfileModal';

import { ReactComponent as BiCrown } from '@src/assets/icons/bi_crown.svg';
import {
  useGetServerMembers,
  useGetServerOne,
  usePostServerInviteCode,
} from '@src/hooks/query/server';
import ExpandableList from '@src/components/common/ExpandableList';
import UserAvatar from '@src/components/common/UserAvatar';

const CommunityDrawer = () => {
  const { isOpen, transition } = useRecoilValue(communityDrawerState);
  const { closeModal: closeCommunityDrawer } = useModal(communityDrawerState);
  const { openModal: openDialog } = useModal(dialogState);
  const serverId = useRecoilValue(currentServerIdState);
  const { data: memberList } = useGetServerMembers(serverId, isOpen);
  const { data: serverInfo } = useGetServerOne(serverId);
  const { mutate: generateInviteCode } = usePostServerInviteCode(serverId);
  const { handleCopy } = useCopyToClipboard();

  const navigate = useNavigate();

  const openProfileModal = (memberId: number) => {
    const ProfileModalComponent = <ProfileModal memberId={memberId} />;
    openDialog(ProfileModalComponent);
  };

  const handleClickInfoSetting = () => {
    const serverSetting = ROUTE_PATH.serverSetting.replace(
      ':serverId',
      encodeId(serverId),
    );
    navigate(`${serverSetting}`);
    closeCommunityDrawer();
  };

  const handleClickCopyButton = async () => {
    generateInviteCode(undefined, {
      onSuccess: (inviteCodeText) => {
        handleCopy(inviteCodeText);
      },
      onError: (err) => {
        console.error('초대 코드 생성 실패:', err);
      },
    });
  };

  return (
    <Scrim
      isOpen={isOpen}
      transition={transition}
      closeModal={closeCommunityDrawer}
    >
      <CommunityDrawerContainer
        isOpen={isOpen}
        transition={transition}
        onClick={(e) => e.stopPropagation()}
      >
        <CommunityTitleContainer>
          <img src={serverInfo?.serverImg ?? ''} alt='server profile' />
          <span>{serverInfo?.name}</span>
        </CommunityTitleContainer>
        <Fieldset as='section' title='공동체 기능'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.5rem',
            }}
          >
            <CommunityButton
              type='detailInfoSetting'
              onClick={handleClickInfoSetting}
            />
            <CommunityButton
              type='copyInvitation'
              onClick={handleClickCopyButton}
            />
          </div>
        </Fieldset>

        <Fieldset as='section' title={`멤버 목록 (${serverInfo?.memberCount})`}>
          {memberList && (
            <ExpandableList
              items={memberList}
              renderItem={(member) => (
                <MemberItem
                  key={member.memberId}
                  onClick={() => openProfileModal(member.memberId)}
                >
                  <UserAvatar
                    profileImg={member.profileImg}
                    nickname={member.nickname}
                  />
                  <div>
                    <Nickname>{member.nickname}</Nickname>
                    <Mountain>
                      {member.level}번째, {member.mountain}
                    </Mountain>
                  </div>
                  {member.role === 'OWNER' && (
                    <IconWrapper>
                      <BiCrown width={24} height={24} />
                    </IconWrapper>
                  )}
                </MemberItem>
              )}
            />
          )}
        </Fieldset>
      </CommunityDrawerContainer>
    </Scrim>
  );
};

export default CommunityDrawer;

const CommunityDrawerContainer = styled.div<{
  isOpen: boolean;
  transition: Modal['transition'];
}>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 80%;
  background-color: ${({ theme }) => theme.colors.neutral50};
  box-shadow: -0.1rem 0 0.3rem rgba(0, 0, 0, 0.2);
  transform: ${({ transition }) =>
    transition === 'open' ? 'translateX(0)' : 'translateX(100%)'};
  transition: 0.3s ease-in;

  display: flex;
  padding: 1.25rem 0.9375rem;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  overflow-y: scroll;

  section {
    width: 100%;
  }
`;

const CommunityTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.gap['10']};
  width: 100%;

  img {
    width: 1.875rem;
    height: 1.875rem;
    border-radius: ${({ theme }) => theme.rounded['8']};
    object-fit: cover;
  }

  span {
    ${({ theme }) => theme.fonts.title}
    color: ${({ theme }) => theme.colors.neutral950};
  }
`;

const MemberItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.gap['8']};
  ]padding: 0.9375rem 0;
  width: 100%;
`;

const Nickname = styled.p`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};
`;

const Mountain = styled.p`
  font-family: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.blue500};
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  right: 0;
  color: ${({ theme }) => theme.colors.lime300};
`;
