import CommunityButton from '@src/components/common/button/IconButton';
import Fieldset from '@src/components/common/Fieldset';
import {
  useDeleteServer,
  useDeleteServerMember,
  useGetServerMembers,
  usePatchServerMemberOwner,
} from '@src/hooks/query/server';
import useLoaderData from '@src/hooks/useRoaderData';
import useModal from '@src/hooks/useModal';
import { dialogState } from '@src/states/atoms';
import DeleteConfirmDialog from '@src/components/common/modal/DeleteConfirmDialog';
import { UseMutateFunction } from '@tanstack/react-query';
import usePopover from '@src/hooks/usePopover';
import Popover from '@src/components/common/Popover';
import styled from 'styled-components';
import ExpandableList from '@src/components/common/ExpandableList';
import UserAvatar from '@src/components/common/UserAvatar';

const CommunitySettingSection = ({ isOwner }: { isOwner?: boolean }) => {
  const { id: serverId } = useLoaderData<{ id: number }>();
  const { mutate: leaveCommunity } = useDeleteServerMember(serverId);
  const { mutate: transferAuthority } = usePatchServerMemberOwner(serverId);
  const { mutate: deleteCommunity } = useDeleteServer(serverId);

  const { data: memberList } = useGetServerMembers(serverId, true);

  const { isOpen, togglePopover, popoverRef, closePopover } = usePopover();
  const { openModal, closeModal } = useModal(dialogState);

  const ClickTransferAuthority = (memberId: number, memberNickname: string) => {
    closePopover();
    openModal(
      <DeleteConfirmDialog
        text={`위임한 권한은 복구할 수 없습니다.\n "${memberNickname}" 에게 위임하시겠습니까?`}
        deleteLabel='위임하기'
        closeDialog={closeModal}
        onClickDelete={() => transferAuthority(memberId)}
      />,
    );
  };

  const ClickConfirmButton = (
    fn: UseMutateFunction<void, Error, void, unknown>,
    leave?: boolean,
  ) => {
    openModal(
      <DeleteConfirmDialog
        text={
          leave
            ? `한 번 나가면 다시 들어올 수 없습니다.\n정말 나가시겠습니까?`
            : undefined
        }
        deleteLabel={leave ? '나가기' : undefined}
        closeDialog={closeModal}
        onClickDelete={() => fn()}
      />,
    );
  };

  return (
    <Fieldset title='공동체 설정' as='section'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {isOwner && (
          <>
            <RelativeContainer>
              <CommunityButton
                type='transferAuthority'
                testId='transfer-authority-button'
                onClick={togglePopover}
              />
              {isOpen && (
                <div ref={popoverRef}>
                  <Popover placement='top' className='member-picker'>
                    {memberList && (
                      <ExpandableList
                        items={memberList.filter(
                          (member) => member.role === 'MEMBER',
                        )}
                        renderItem={(member) => (
                          <MemberContent
                            key={member.memberId}
                            onClick={() =>
                              ClickTransferAuthority(
                                member.memberId,
                                member.nickname,
                              )
                            }
                          >
                            <UserAvatar
                              profileImg={member.profileImg}
                              nickname={member.nickname}
                              size='2rem'
                            />
                            <p>{member.nickname}</p>
                          </MemberContent>
                        )}
                      />
                    )}
                  </Popover>
                </div>
              )}
            </RelativeContainer>
            <CommunityButton
              type='deleteCommunity'
              testId='delete-community-button'
              onClick={() => ClickConfirmButton(deleteCommunity)}
            />
          </>
        )}
        <CommunityButton
          type='leaveCommunity'
          testId='leave-community-button'
          onClick={() => ClickConfirmButton(leaveCommunity, true)}
        />
      </div>
    </Fieldset>
  );
};

export default CommunitySettingSection;

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
`;

const MemberContent = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.gap['8']};
  width: 100%;

  p {
    ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.neutral950};
  }
`;
