import { useRecoilState } from 'recoil';
import { communityDrawerState } from '@src/states/atoms';

const useCommunityDrawer = () => {
  const [communityDrawer, setCommunityDrawer] = useRecoilState(communityDrawerState);

  const openCommunityDrawer = (): void => {
    document.body.style.overflow = 'hidden';
    setCommunityDrawer((prev) => ({ ...prev, isOpen: true }));
    setTimeout(() => {
      setCommunityDrawer((prev) => ({ ...prev, transition: 'open' }));
    }, 1);
  };

  const closeCommunityDrawer = (): void => {
    setCommunityDrawer((prev) => ({ ...prev, transition: 'close' }));
    setTimeout(() => {
      setCommunityDrawer({ isOpen: false, transition: 'close' });
    }, 300);
    document.body.style.overflow = '';
  };

  return { communityDrawer, openCommunityDrawer, closeCommunityDrawer };
};

export default useCommunityDrawer;
