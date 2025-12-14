function chunkFile(file: File, chunkSize: number) {
  const fileChunks = [];
  let start = 0;
  let end = chunkSize;

  while (start < file.size) {
    fileChunks.push(file.slice(start, end));
    start = end;
    end = start + chunkSize;
  }

  return fileChunks;
}

export default chunkFile;
