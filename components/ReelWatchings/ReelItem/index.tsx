import { IcChat } from "@assets/icons";
import Caption from "@components/Caption";
import IconWithFrame from "@components/IconWithFrame";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import ReelVideo, { ReelVideoProps } from "@components/ReelWatchings/ReelVideo";
import styles from "./reelItem.module.scss";
import ReelAudio from "../ReelAudio";
import ReelCreator from "../ReelCreator";

interface ReelWatchingProps {
  creator: any;
  caption: string;
  video: ReelVideoProps;
}

interface ReelButtonProps {
  children: React.ReactElement;
  count: number;
}

const ReelButton: React.FC<ReelButtonProps> = ({ children, count }) => {
  return (
    <div className={styles.itemButton}>
      <IconWithFrame>
        {children}
      </IconWithFrame>
      <span className={styles.textSubCount}>120k</span>
    </div>
  );
};

const ReelWatching: React.FC<ReelWatchingProps> = ({ creator, caption, video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  if (isMobile) {
    return (
      <div className={styles.mobileReelItem}>
        <div className={styles.reelContent}>
          <ReelVideo {...video} />
          <div className={styles.onReelContent}>
            <ReelCreator {...creator} createOn="" />
            <Caption
              captionContentCN={styles.mobileCaption}
              caption={caption} />
            <ReelAudio />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.reelItem}>
      <ReelCreator {...creator} createOn="" />
      <Caption caption={caption} />
      <div className={styles.reelItemWrap}>
        <div className={styles.mediaContent}>
          <ReelVideo {...video} />
        </div>
        <div className={styles.reelInteraction}>
          <ReelButton count={127}>
            <IcChat />
          </ReelButton>
          <ReelButton count={127}>
            <IcChat />
          </ReelButton>
          <ReelButton count={127}>
            <IcChat />
          </ReelButton>
        </div>
      </div>
      <ReelAudio />
    </div>
  );
};

export default ReelWatching;
