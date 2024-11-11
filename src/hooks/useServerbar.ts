import { useSetRecoilState } from 'recoil';
import { serverbarState } from '@src/states/atoms';

const useServerbar = () => {
  const setServerbar = useSetRecoilState(serverbarState);

  const openServerbar = (): void => {
    // 스크롤 금지
    document.body.style.overflow = 'hidden';
    // 마운트
    setServerbar((prev) => {
      return { ...prev, isOpen: true };
    });
    setTimeout(() => {
      // 트랜지션
      setServerbar((prev) => {
        return { ...prev, transition: 'open' };
      });
    }, 30);
  };

  const closeServerbar = (): void => {
    // 트랜지션
    setServerbar((prev) => {
      return { ...prev, transition: 'close' };
    });
    setTimeout(() => {
      // 언마운트
      setServerbar((prev) => {
        return { ...prev, isOpen: false };
      });
      // 스크롤 허용
      document.body.style.overflow = '';
    }, 300);
  };

  return { openServerbar, closeServerbar };
};

export default useServerbar;
