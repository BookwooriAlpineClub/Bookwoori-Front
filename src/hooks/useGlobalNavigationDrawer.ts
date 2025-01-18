import { useSetRecoilState } from 'recoil';
import { globalNavigationDrawerState } from '@src/states/atoms';

const useGlobalNavigationDrawer = () => {
  const setGlobalNavigationDrawer = useSetRecoilState(globalNavigationDrawerState);

  const openGlobalNavigationDrawer = (): void => {
    // 스크롤 금지
    document.body.style.overflow = 'hidden';
    // 마운트
    setGlobalNavigationDrawer((prev) => {
      return { ...prev, isOpen: true };
    });
    setTimeout(() => {
      // 트랜지션
      setGlobalNavigationDrawer((prev) => {
        return { ...prev, transition: 'open' };
      });
    }, 30);
  };

  const closeGlobalNavigationDrawer = (): void => {
    // 트랜지션
    setGlobalNavigationDrawer((prev) => {
      return { ...prev, transition: 'close' };
    });
    setTimeout(() => {
      // 언마운트
      setGlobalNavigationDrawer((prev) => {
        return { ...prev, isOpen: false };
      });
      // 스크롤 허용
      document.body.style.overflow = '';
    }, 300);
  };

  return { openGlobalNavigationDrawer, closeGlobalNavigationDrawer };
};

export default useGlobalNavigationDrawer;
