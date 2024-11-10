import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Scrim from '@src/components/common/Scrim';
import TitleAndFieldContainer from '@src/components/common/TitleAndFieldContainer';
import CommunityButton from '@src/components/common/CommunityButton';
import { ReactComponent as BiCrown } from '@src/assets/icons/bi_crown.svg';
import { delay } from '@src/utils/helpers';
import useCopyToClipboard from '@src/hooks/useCopyToClipboard';
import useDialog from '@src/hooks/useDialog';
import Dialog from '@src/components/common/Dialog';
import ProfileModal from '@src/components/communitysidebar/ProfileModal';

interface Member {
  memberId: number;
  nickname: string;
  profileImg: string;
  level: number;
  mountain: string;
  role: 'OWNER' | 'MEMBER';
}

interface CommunitySideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockMemberList: Member[] = [
  {
    memberId: 1,
    nickname: '숲길35',
    profileImg:
      'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    level: 1,
    mountain: '동산',
    role: 'MEMBER',
  },
  {
    memberId: 2,
    nickname: 'hey',
    profileImg:
      'https://bookwoori-image-bucket.s3.ap-northeast-2.amazonaws.com/member/profile-image/a7998195-70e7-4382-a934-941cb47a9713_DSC02956.jpg',
    level: 1,
    mountain: '동산',
    role: 'OWNER',
  },
  {
    memberId: 3,
    nickname: '레드 피크민',
    profileImg:
      'https://bookwoori-image-bucket.s3.ap-northeast-2.amazonaws.com/member/profile-image/a7998195-70e7-4382-a934-941cb47a9713_DSC02956.jpg',
    level: 3,
    mountain: '지리산',
    role: 'MEMBER',
  },
  {
    memberId: 4,
    nickname: '레드 피크민',
    profileImg:
      'https://bookwoori-image-bucket.s3.ap-northeast-2.amazonaws.com/member/profile-image/a7998195-70e7-4382-a934-941cb47a9713_DSC02956.jpg',
    level: 3,
    mountain: '지리산',
    role: 'MEMBER',
  },
  {
    memberId: 5,
    nickname: '레드 피크민',
    profileImg:
      'https://bookwoori-image-bucket.s3.ap-northeast-2.amazonaws.com/member/profile-image/a7998195-70e7-4382-a934-941cb47a9713_DSC02956.jpg',
    level: 3,
    mountain: '지리산',
    role: 'MEMBER',
  },
  {
    memberId: 6,
    nickname: '레드 피크민',
    profileImg:
      'https://bookwoori-image-bucket.s3.ap-northeast-2.amazonaws.com/member/profile-image/a7998195-70e7-4382-a934-941cb47a9713_DSC02956.jpg',
    level: 3,
    mountain: '지리산',
    role: 'MEMBER',
  },
  {
    memberId: 7,
    nickname: '레드 피크민',
    profileImg:
      'https://bookwoori-image-bucket.s3.ap-northeast-2.amazonaws.com/member/profile-image/a7998195-70e7-4382-a934-941cb47a9713_DSC02956.jpg',
    level: 3,
    mountain: '지리산',
    role: 'MEMBER',
  },
  {
    memberId: 8,
    nickname: '레드 피크민',
    profileImg:
      'https://bookwoori-image-bucket.s3.ap-northeast-2.amazonaws.com/member/profile-image/a7998195-70e7-4382-a934-941cb47a9713_DSC02956.jpg',
    level: 3,
    mountain: '지리산',
    role: 'MEMBER',
  },
];

const CommunitySideBar = ({ isOpen, onClose }: CommunitySideBarProps) => {
  const [transition, setTransition] = useState<ModalTransition>('open');
  const [memberList, setMemberList] = useState<Member[]>([]);
  const copyText = 'bookWOORI1234'; // fetchCopyInvitationURI() 사용 예정

  const { isCopied, handleCopy } = useCopyToClipboard(copyText);
  const { openDialog } = useDialog();

  const openProfileModal = () => {
    const ProfileModalComponent = (
      <ProfileModal nickname='숲길35' mountain='동산' meter={1000} pages={10} />
    );
    openDialog(ProfileModalComponent);
  };

  const handleClose = () => {
    setTransition('close');
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const fetchMembers = async () => {
    try {
      await delay(1000);
      const sortedMembers = mockMemberList.sort((a) =>
        a.role === 'OWNER' ? -1 : 1,
      );
      setMemberList(sortedMembers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMembers();
    }
  }, [isOpen]);

  return (
    <>
      <Dialog />
      <div>아오</div>
      <Scrim isOpen={isOpen} transition={transition} closeModal={handleClose}>
        <SideBarContainer
          isOpen={isOpen}
          transition={transition}
          onClick={(e) => e.stopPropagation()}
        >
          <CommunityTitleContainer>
            <img src='' alt='server profile' />
            <span>숲길35</span>
          </CommunityTitleContainer>
          <TitleAndFieldContainer title='공동체 기능'>
            <CommunityButton type='detailInfoSetting' onClick={() => {}} />
            <CommunityButton type='copyInvitation' onClick={handleCopy} />
          </TitleAndFieldContainer>
          {isCopied && <p>초대 코드가 복사되었습니다.</p>}
          <TitleAndFieldContainer title='멤버 목록'>
            <MemberListContainer>
              {memberList.map((member) => (
                <MemberItem key={member.memberId} onClick={openProfileModal}>
                  <img
                    src={member.profileImg}
                    alt={`${member.nickname} profile`}
                  />
                  <div>
                    <Nickname>{member.nickname}</Nickname>
                    <Mountain>{member.mountain}</Mountain>
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
        </SideBarContainer>
      </Scrim>
    </>
  );
};

export default CommunitySideBar;

const SideBarContainer = styled.div<{
  isOpen: boolean;
  transition: ModalTransition;
}>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 80%;
  background-color: ${({ theme }) => theme.colors.black300};
  border-left: 0.05rem solid ${({ theme }) => theme.colors.black200};
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
    background-color: ${({ theme }) => theme.colors.black200};
  }

  span {
    ${({ theme }) => theme.fonts.title}
    color: ${({ theme }) => theme.colors.black100};
  }
`;

const MemberListContainer = styled.div`
  display: flex;
  padding: 0 0.9375rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.white};
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
    border-top: 0.1rem solid ${({ theme }) => theme.colors.black300};
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
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;

const Mountain = styled.p`
  font-family: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.blue100};
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  right: 0;
`;
