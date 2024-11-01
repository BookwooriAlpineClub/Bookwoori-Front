import biCrown from '@src/assets/icons/bi_crown.svg';
import fiTrash from '@src/assets/icons/fi_trash_2.svg';
import fiLogOut from '@src/assets/icons/fi_log_out.svg';
import bIUserPlus from '@src/assets/icons/bi_user_plus.svg';
import fiSettings from '@src/assets/icons/fi_settings.svg';

type SettingType = 'transferAuthority' | 'deleteCommunity' | 'leaveCommunity';

type FunctionType = 'CopyInvitation' | 'DetailInfoSetting';

export type CommunityButtonType = SettingType | FunctionType;
const buttonConfig = {
  transferAuthority: {
    name: '공동체 권한 넘기기',
    icon: biCrown,
  },
  deleteCommunity: {
    name: '공동체 삭제하기',
    icon: fiTrash,
  },
  leaveCommunity: {
    name: '공동체 나가기',
    icon: fiLogOut,
  },
  copyInvitation: {
    name: '초대 링크 복사하기',
    icon: bIUserPlus,
  },
  detailInfoSetting: {
    name: '상세 정보 설정',
    icon: fiSettings,
  },
};
