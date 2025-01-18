import type { ModalTransition } from '@src/types/modal';
import styled from 'styled-components';
import Scrim from '@src/components/common/Scrim';
import TitleAndFieldContainer from '@src/components/common/TitleAndFieldContainer';
import CommunityButton from '@src/components/common/IconButton';
import { ReactComponent as BiCrown } from '@src/assets/icons/bi_crown.svg';
import useCopyToClipboard from '@src/hooks/useCopyToClipboard';
import useDialog from '@src/hooks/useDialog';
import ProfileModal from '@src/components/communitysidebar/ProfileModal';
import useCommunityDrawer from '@src/hooks/useCommunityDrawer';
import useCommunityDrawerData from '@src/hooks/query/useCommunityDrawerData';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import { decodeIdParam, encodeId } from '@src/utils/formatters';

const CommunityDrawer = () => {
  const { communityDrawer, closeCommunityDrawer } = useCommunityDrawer();
  const { serverId: id } = useParams<{ serverId: string }>();
  const serverId = decodeIdParam(id ?? '-1');
  const { serverInfo, memberList, copyText } = useCommunityDrawerData(serverId);
  const { handleCopy } = useCopyToClipboard(copyText);
  const { openDialog } = useDialog();

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

  return (
    <Scrim
      isOpen={communityDrawer.isOpen}
      transition={communityDrawer.transition}
      closeModal={closeCommunityDrawer}
    >
      <CommunityDrawerContainer
        isOpen={communityDrawer.isOpen}
        transition={communityDrawer.transition}
        onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
      >
        <CommunityTitleContainer>
          <img src={serverInfo?.serverImg ?? ''} alt='server profile' />
          <span>{serverInfo?.name}</span>
        </CommunityTitleContainer>
        <TitleAndFieldContainer title='공동체 기능'>
          <CommunityButton
            type='detailInfoSetting'
            onClick={handleClickInfoSetting}
          />
          <CommunityButton type='copyInvitation' onClick={handleCopy} />
        </TitleAndFieldContainer>
        <TitleAndFieldContainer
          title={`멤버 목록 (${serverInfo?.memberCount})`}
        >
          <MemberListContainer>
            {memberList?.members.map((member) => (
              <MemberItem
                key={member.memberId}
                onClick={() => openProfileModal(member.memberId)}
              >
                <img
                  src={member.profileImg ?? ''}
                  alt={`${member.nickname} profile`}
                />
                <div>
                  <Nickname>{member.nickname}</Nickname>
                  <Mountain>
                    {member.level}번째, {member.mountain}
                  </Mountain>
                </div>
                {member.role === 'OWNER' && (
                  <IconWrapper>
                    <BiCrown />
                  </IconWrapper>
                )}
              </MemberItem>
            ))}
          </MemberListContainer>
        </TitleAndFieldContainer>
      </CommunityDrawerContainer>
    </Scrim>
  );
};

export default CommunityDrawer;

const CommunityDrawerContainer = styled.div<{
  isOpen: boolean;
  transition: ModalTransition;
}>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 80%;
  background-color: ${({ theme }) => theme.colors.neutral50};
  border-left: 0.05rem solid ${({ theme }) => theme.colors.neutral400};
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
`;

const CommunityTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  width: 100%;

  img {
    width: 1.875rem;
    height: 1.875rem;
    border-radius: 0.625rem;
    background-color: ${({ theme }) => theme.colors.neutral400};
  }

  span {
    ${({ theme }) => theme.fonts.title}
    color: ${({ theme }) => theme.colors.neutral950};
  }
`;

const MemberListContainer = styled.div`
  display: flex;
  padding: 0 0.9375rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.neutral0};
`;

const MemberItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.9375rem 0;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.12rem;
    margin-left: 0.625rem;
  }

  &:not(:first-child) {
    border-top: 0.1rem solid ${({ theme }) => theme.colors.neutral50};
  }

  img {
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
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
`;
