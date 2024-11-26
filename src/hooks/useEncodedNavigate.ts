import { useNavigate, NavigateOptions } from 'react-router-dom';
import { encodeId } from '@src/utils/formatters';

// Base64 인코딩된 ID로 네비게이션
const useEncodedNavigation = () => {
  const navigate = useNavigate();

  const navigateWithEncodedId = (
    path: string,
    id: number,
    options?: NavigateOptions,
  ) => {
    const encodedId = encodeId(id);
    navigate(`${path}/${encodedId}`, options);
  };

  return navigateWithEncodedId;
};

export default useEncodedNavigation;
