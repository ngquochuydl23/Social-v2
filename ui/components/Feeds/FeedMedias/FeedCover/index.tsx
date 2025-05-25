import Image from 'next/image';
import { MediaDto } from 'services/MediaService/dtos';
import styles from './feedCover.module.scss';

const FeedCover = ({ medias }: { medias?: MediaDto[] }) => {
  if (!medias)
    return null;
  const avatar = medias[0];
  return (
    <div className={styles.feedCover}>
      <div className={styles.cover}>
        <Image fill alt={avatar.url!} src={avatar.url!} />
      </div>
    </div>
  )
}

export default FeedCover;