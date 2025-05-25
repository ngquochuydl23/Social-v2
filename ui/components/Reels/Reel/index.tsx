import { IcReelComments, IcReelViewers } from '@assets/icons';
import classNames from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import styles from './reel.module.scss'

const Reel = () => {
  const [hover, setHover] = useState(false);
  return (
    <div className={styles.reel}>
      <Image
        fill
        alt="myReelItem"
        src={`https://iili.io/HRoWH12.webp`} />
      <div
        className={classNames(
          styles.onThumbnailImage,
          hover && styles.onHover
        )}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        {hover
          ? <div className={styles.hoverCommentAndShare}>
            <div className={styles.iconAndTheNumberOf}>
              <IcReelViewers
                width={15}
                height={15} />
              <p>{`3.5K`}</p>
            </div>
            <div className={styles.iconAndTheNumberOf}>
              <IcReelComments
                width={15}
                height={15} />
              <p>{`3.5K`}</p>
            </div>
          </div>
          : <div className={styles.iconAndTheNumberOf}>
            <IcReelViewers
              width={15}
              height={15} />
            <p>{`3.5K`}</p>
          </div>
        }
      </div>
    </div >
  )
}

export default Reel;