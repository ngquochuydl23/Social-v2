import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./reelVideo.module.scss";
import classNames from "classnames";
import thumbnail from "../../../public/thumbnail.png";
import { isMobile, isTablet } from "react-device-detect";
import ReelController from "../ReelController";
import { getImageSize } from 'react-image-size';

export interface ReelVideoProps {
  thumbnail?: string;
  url?: string;
  mediaType?: string;
}

const ReelVideo: React.FC<ReelVideoProps> = ({
  thumbnail, url, mediaType
}) => {
  const [verticalMedia, setVerticalMedia] = useState<boolean>();
  const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(true);

  useEffect(() => {
    setLoadingThumbnail(true);
    getImageSize(thumbnail!)
      .then(({ width, height }) => {
        setVerticalMedia(width < height);
        setLoadingThumbnail(false);
      })
      .catch((errorMessage) => {

      });
  }, [url])


  return (
    <div className={classNames(styles.reelVideo)}>
      <div className={classNames(
        styles.blurReel,
        isMobile && styles.isMobile,
      )}>
        <img className={styles.blurImage}
          src={thumbnail} />
        {!loadingThumbnail &&
          <img
            className={classNames(
              styles.thumbnail,
              verticalMedia ? styles.vertical : styles.horizontal
            )}
            src={thumbnail}
          />
        }
        <ReelController />
      </div>
    </div>
  );
};

export default ReelVideo;
