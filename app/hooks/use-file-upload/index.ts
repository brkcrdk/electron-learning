interface Props {
  file: File;
}

function useFileUpload({ file }: Props) {
  // return {
  //   uploadFile: async (file: File) => {
  //     const result = await window.electronAPI.uploadContentMaterial(file);
  //     return result;
  //   },
  // };
}

export default useFileUpload;
