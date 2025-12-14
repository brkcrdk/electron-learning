import type { ChunkStateProps } from '@app/hooks/use-file-upload/types';
import type { MediaFileTypes } from '@db/schema';

import ErrorReason from './error-reason';
import Button from '../button';
import Icon from '../icon';
import type { IconListProps } from '../icon/icon-list';
import Progress from '../progress';

interface Props {
  state: ChunkStateProps;
  onReset?: (fileId: number) => void;
}

const uploadIconTypes: Record<MediaFileTypes, IconListProps> = {
  images: 'file-image',
  video: 'file-video',
  stories: 'file-easel',
  pdfs: 'file-pdf',
};

function UploadingState({ state, onReset }: Props) {
  if (state.status === 'error') {
    return <ErrorReason errorReason={state.reason} />;
  }

  if (state.status === 'completed') {
    return (
      <div className="flex w-full items-center gap-2">
        <div className="bg-accent rounded-full p-3">
          <Icon
            name={uploadIconTypes[state.response.mediaType]}
            className="size-7"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="line-clamp-1 max-w-40">{state.file.name} dosyası yüklendi</span>
            {onReset && (
              <Button
                variant="ghost"
                type="button"
                size="icon-sm"
                onClick={() => {
                  if (onReset) {
                    onReset(state.response.id);
                  }
                }}
              >
                <Icon
                  name="close"
                  className="size-4"
                />
              </Button>
            )}
          </div>
          <Progress
            key={state.progressId}
            value={state.progress}
          />
          <span className="text-sm">Yükleme tamamlandı</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <span>Yükleniyor...</span>
    </div>
  );
}

export default UploadingState;
