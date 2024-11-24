import { useRecoilState } from 'recoil';
import { sideBarState } from '@src/states/atoms';

const useSideBar = () => {
  const [sideBar, setSideBar] = useRecoilState(sideBarState);

  const openSideBar = (): void => {
    setSideBar({ isOpen: true, transition: 'open' });
  };

  const closeSideBar = (): void => {
    setSideBar((prev) => ({ ...prev, transition: 'close' }));
    setTimeout(() => {
      setSideBar({ isOpen: false, transition: 'close' });
    }, 300);
  };

  return { sideBar, openSideBar, closeSideBar };
};

export default useSideBar;
