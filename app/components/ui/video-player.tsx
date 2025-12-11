import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, type MediaPlayerProps } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

type Props = Omit<MediaPlayerProps, 'children'>;

function VideoPlayer({ src, title }: Props) {
  return (
    <MediaPlayer
      title={title}
      src={src}
    >
      <MediaProvider />
      <DefaultVideoLayout
        thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
        icons={defaultLayoutIcons}
      />
    </MediaPlayer>
  );
}

export default VideoPlayer;
