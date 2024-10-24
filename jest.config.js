module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/tests/__mocks__/svg.js', // SVG 파일에 대한 모킹 처리
  },
};
