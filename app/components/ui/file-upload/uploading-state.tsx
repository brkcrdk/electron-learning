import type { ChunkStateProps } from '@app/hooks/use-file-upload/types';

interface Props {
  state: ChunkStateProps;
}

function UploadingState({ state }: Props) {
  return (
    <div>
      <span>Yükleniyor...</span>
    </div>
  );
}

export default UploadingState;
