import Image from 'next/image';
import { MediaDto } from 'services/MediaService/dtos';
import styles from './feedAvatar.module.scss';

const FeedAvatar = ({ medias }: { medias?: MediaDto[] }) => {
  if (!medias)
    return null;
  const avatar = medias[0];
  return (
    <div className={styles.feedAvatar}>
      <div className={styles.avatar}>
        <Image fill alt={avatar.url!} src={avatar.url!} />
      </div>
    </div>
  )
}

export default FeedAvatar;