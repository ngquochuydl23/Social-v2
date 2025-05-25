import { IcEditImage, IcRemoveImage, IcViewImage } from '@assets/icons';
import IconWithFrame from '@components/IconWithFrame';
import { FeedStyle } from '@constants/globals';
import { Stack } from '@mui/material';
import classNames from 'classnames';
import _ from 'lodash';
import { useState } from 'react';
import { MediaDto } from 'services/MediaService/dtos';
import styles from './feedClassic.module.scss';

interface ClassicMediaProps {
  media?: MediaDto;
  className?: string;
  addOrUpdate?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  onRemoveMedia?: (media: MediaDto) => any;
}

const ClassicMedia: React.FC<ClassicMediaProps> = ({
  media,
  className,
  objectFit,
  addOrUpdate = false,
  onRemoveMedia
}) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={classNames(styles.feedMediaClassic, className)}>
      <img
        src={!media?.local ? media?.url : media?.localUrl}
        style={{ objectFit: objectFit }} />
      {addOrUpdate &&
        <div
          className={classNames(styles.onMedia, hover && styles.isHover)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}>
          {(hover) &&
            <div className={styles.controlImage}>
              <IconWithFrame
                onClick={() => {

                }}
                transparent>
                <IcViewImage />
              </IconWithFrame>
              <IconWithFrame
                onClick={() => {
                  if (onRemoveMedia)
                    onRemoveMedia(media!)
                }}
                transparent>
                <IcRemoveImage />
              </IconWithFrame>
              <IconWithFrame
                onClick={() => {

                }}
                transparent>
                <IcEditImage />
              </IconWithFrame>
            </div>
          }
        </div>
      }

    </div>
  )
}

interface FeedClassicProps {
  medias?: MediaDto[],
  feedStyle: string | null,
  addOrUpdate?: boolean;
  onRemoveMedia?: (media: MediaDto) => any;
}

const FeedClassic: React.FC<FeedClassicProps> = ({
  medias,
  feedStyle,
  addOrUpdate = false,
  onRemoveMedia
}) => {
  if (!medias)
    return null;

  switch (feedStyle) {
    case FeedStyle.ClassicOnePortrait:
      return (
        <div
          className={classNames(styles.feedClassic, styles.onePortrait)}>
          <ClassicMedia
            onRemoveMedia={onRemoveMedia}
            addOrUpdate={addOrUpdate}
            objectFit='cover'
            media={medias[0]} />
        </div>
      )
    case FeedStyle.ClassicOneSquare:
      return (
        <div className={classNames(styles.feedClassic, styles.oneSquare)}>
          <ClassicMedia
            onRemoveMedia={onRemoveMedia}
            addOrUpdate={addOrUpdate}
            objectFit='cover'
            media={medias[0]} />
        </div>
      )
    case FeedStyle.ClassicOneLandscape:
      return (
        <div className={classNames(styles.feedClassic, styles.oneLandscape)}>
          <ClassicMedia
            onRemoveMedia={onRemoveMedia}
            addOrUpdate={addOrUpdate}
            objectFit='cover'
            media={medias[0]} />
        </div>
      )
    case FeedStyle.ClassTwoPortrait:
      return (
        <div className={classNames(styles.feedClassic, styles.twoPortrait)}>
          <Stack
            style={{ width: '100%' }}
            direction="row"
            spacing={'2px'}>
            <ClassicMedia
              onRemoveMedia={onRemoveMedia}
              addOrUpdate={addOrUpdate}
              className={styles.item}
              objectFit='cover'
              media={medias[0]} />
            <ClassicMedia
              onRemoveMedia={onRemoveMedia}
              addOrUpdate={addOrUpdate}
              className={styles.item}
              objectFit='cover'
              media={medias[1]} />
          </Stack>
        </div>
      )
    default:
      return null;
  }
}

export default FeedClassic;