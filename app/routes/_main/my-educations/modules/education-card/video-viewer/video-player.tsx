import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, type MediaPlayerProps } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

export type VideoPlayerProps = Omit<MediaPlayerProps, 'children'>;

function VideoPlayer({ src, title }: VideoPlayerProps) {
  return (
    <MediaPlayer
      title={title}
      src={src}
    >
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}

export default VideoPlayer;
