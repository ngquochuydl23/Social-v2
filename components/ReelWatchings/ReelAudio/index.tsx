import { isMobile } from 'react-device-detect';
import styles from './reelAudio.module.scss'
import Lottie from "lottie-react";
import classNames from "classnames";
import {
  LottieSongPlayingLight,
  LottieSongPlayingDark
} from '@assets/lotties';
import { AvatarWithoutStory } from '@components/Avatar';
import { useTheme } from 'next-themes'
import { UIMode } from '@constants/globals';

interface ReelAudioProps {

}
const ReelAudio: React.FC<ReelAudioProps> = ({ }) => {
  const { theme } = useTheme()
  return (
    <div className={classNames(
      styles.reelAudio,
      isMobile && styles.mobileAudio
    )}>
      <div className={styles.lottieAnimation}>
        <Lottie
          animationData={(theme === UIMode.Dark || isMobile)
            ? LottieSongPlayingDark
            : LottieSongPlayingLight
          }
          loop={true} />
      </div>
      <p className={styles.song}>
        {`HyunA • I'm Not Cool`}
      </p>
      <div className={styles.artist}>
        <AvatarWithoutStory
          imageClassName={styles.avatar}
          url={`https://iili.io/H5Y2xWv.jpg`} />
      </div>
    </div>
  );
};

export default ReelAudio;