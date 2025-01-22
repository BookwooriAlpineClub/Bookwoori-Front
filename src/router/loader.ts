import { Params } from 'react-router-dom';
import { decodeIdParam } from '@src/utils/formatters';
// import { ROUTE_PATH } from '@src/constants/routePath';

export const checkAuthLoader = async () => {
  // const accessToken = localStorage.getItem('accessToken');
  // if (!accessToken) {
  //   return { redirect: ROUTE_PATH.signIn };
  // }
  return null;
};

export const isParamLoader = async (
  { params }: { params: Params<string> },
  idParamName: string,
): Promise<{
  id: number;
}> => {
  const rawId = params[idParamName];
  if (!rawId) {
    throw new Error(`Missing ${idParamName}`);
  }
  const id = decodeIdParam(rawId);
  return { id };
};
