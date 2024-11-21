import { Params } from 'react-router-dom';
import { decodeIdParam } from '@src/utils/formatters';

const isParamLoader = async (
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

export default isParamLoader;
