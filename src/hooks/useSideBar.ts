import { useRecoilState } from 'recoil';
import { sideBarState } from '@src/states/atoms';

const useSideBar = () => {
  const [sideBar, setSideBar] = useRecoilState(sideBarState);

  const openSideBar = (): void => {
    document.body.style.overflow = 'hidden';
    setSideBar((prev) => ({ ...prev, isOpen: true }));
    setTimeout(() => {
      setSideBar((prev) => ({ ...prev, transition: 'open' }));
    }, 30);
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
