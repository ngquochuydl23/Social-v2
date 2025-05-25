
import styles from './previewStoryMedia.module.scss';
import { IcPlayPreviewStory, IcStoryEmoji, IcStoryMusic, IcStoryTag, IcStoryText, InMute, InUnmute } from "@assets/icons";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";
import ReactPlayer from 'react-player';
import IconWithFrame from "@components/IconWithFrame";
import { isFileImage, isFileVideo } from "utils/mediaType";
import { generateVideoThumbnails } from '@rajesh896/video-thumbnails-generator';

interface PreviewStoryMediaProps {
  file: any;
  onReceiveThumbnail: (file: any) => any;
}

const PreviewStoryMedia: React.FC<PreviewStoryMediaProps> = ({ file, onReceiveThumbnail }) => {

  const [mute, setMute] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [videoThumbnail, setVideoThumbnail] = useState<string>();
  const reactPlayer = useRef(null);


  const setupVideoContainer = () => {
    let captureCanvas = document.getElementById('captureCanvas');
    let videoContainer = captureCanvas?.children[1];

    if (videoContainer) {
      videoContainer.removeAttribute("style");
      videoContainer.className = styles.videoContainer;
    }
  }

  const muteController = async () => {
    setPlaying(false);
    setMute(!mute);
  }

  useEffect(() => {
    if (Boolean(file)) {
      if (isFileVideo(file)) {
        setupVideoContainer()
        generateVideoThumbnails(file, 1, '')
          .then((thumbs) => {
            setVideoThumbnail(thumbs[0]);
            var blobBin = atob(thumbs[0].split(',')[1]);
            var array = [];
            for (var i = 0; i < blobBin.length; i++) {
              array.push(blobBin.charCodeAt(i));
            }
            onReceiveThumbnail(new Blob([new Uint8Array(array)], { type: 'image/png' }))
          })
          .catch((err) => console.log("[Thumbnail]: ", err))
      }
    }
  }, [file])

  return (
    <div
      className={styles.previewMedia}>
      <div
        id='captureCanvas'
        className={styles.forCanvas}>
        <img
          id='blurBg'
          src={isFileVideo(file) ? videoThumbnail : URL.createObjectURL(file)}
          className={styles.blurMedia}
        />
        {isFileVideo(file)
          ?
          <ReactPlayer
            ref={reactPlayer}
            url={URL.createObjectURL(file)}
            width="100%"
            muted={mute}
            key="file"
            loop
            playing={playing}
            controls={false}
          />
          :
          <img
            className={styles.mediaImage}
            src={URL.createObjectURL(file)} />
        }
      </div>
      <div className={styles.controller}>
        <div className={styles.menu}>
          <IconWithFrame
            className={styles.icFrame}
            onClick={muteController}>
            {mute ? <InMute /> : <InUnmute />}
          </IconWithFrame>
          <IconWithFrame className={styles.icFrame}>
            <IcStoryMusic />
          </IconWithFrame>
          <IconWithFrame className={styles.icFrame}>
            <IcStoryEmoji />
          </IconWithFrame>
          <IconWithFrame className={styles.icFrame}>
            <IcStoryTag />
          </IconWithFrame>
          <IconWithFrame className={styles.icFrame}>
            <IcStoryText />
          </IconWithFrame>
        </div>
        {(!playing && isFileVideo(file)) &&
          <div
            className={styles.play}
            onClick={() => setPlaying(true)}>
            <IcPlayPreviewStory />
          </div>
        }
      </div>
    </div>
  )
}

export default PreviewStoryMedia;