import { type CracoConfig } from '@craco/types';
import { createDefaultPreset } from 'ts-jest';
import path from 'path';

const defaultPreset = createDefaultPreset();

const cracoConfig: CracoConfig = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    configure: {
      testEnvironment: 'jsdom', // web app
      setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
      moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
      },
      ...defaultPreset,
    },
  },
};

export default cracoConfig;
