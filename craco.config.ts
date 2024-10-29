import type { CracoConfig } from '@craco/types';
import path from 'path';

const cracoConfig: CracoConfig = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
};

export default cracoConfig;
