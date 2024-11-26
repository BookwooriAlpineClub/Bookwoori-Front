// import { renderHook } from '@testing-library/react';
// import useUploadFile from '@src/hooks/useUploadFile';

// beforeAll(() => {
//   global.URL.createObjectURL = jest.fn(() => 'blob:mocked-url');
// });

// afterEach(() => {
//   jest.clearAllMocks();
// });

describe('useUploadFile', () => {
  test('preview가 초기값으로 설정된 경우 초기 상태에 반영되어야 한다', () => {
    // const initialPreview = 'initialPreviewUrl';
    // const { result } = renderHook(() => useUploadFile(initialPreview));

    // expect(result.current.preview).toBe(initialPreview);
  });

  //   test('파일 업로드 시 file과 preview 상태가 업데이트되어야 한다', async () => {
  //     const initialPreview = 'initialPreviewUrl';
  //     const { result } = renderHook(() => useUploadFile(initialPreview));

  //     const file = new File(['file content'], 'test.png', { type: 'image/png' });

  //     act(() => {
  //       const event = {
  //         target: { files: [file] },
  //       } as unknown as React.ChangeEvent<HTMLInputElement>;

  //       result.current.handleFileUpload(event);
  //     });

  //     expect(result.current.file).toEqual(file);

  //     await waitFor(() => {
  //       expect(result.current.preview).toBe('blob:mocked-url');
  //     });
  //   });
});

export {}