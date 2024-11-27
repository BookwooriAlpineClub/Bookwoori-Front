import { useRecoilState } from 'recoil';
import { sideBarState } from '@src/states/atoms';

const useSideBar = () => {
  document.body.style.overflow = 'hidden';
  const [sideBar, setSideBar] = useRecoilState(sideBarState);
  const openSideBar = (): void => {
    setSideBar({ isOpen: true, transition: 'open' });
  };

  const closeSideBar = (): void => {
    setSideBar((prev) => ({ ...prev, transition: 'close' }));
    setTimeout(() => {
      setSideBar({ isOpen: false, transition: 'close' });
    }, 300);
    document.body.style.overflow = '';
  };

  return { sideBar, openSideBar, closeSideBar };
};

export default useSideBar;
