import { AvatarWithoutStory } from '@components/Avatar';
import styles from './followRequest.module.scss';

interface FollowRequestProps {
  fullName?: string;
  username?: string;
  avatar?: string;
}

const FollowRequest: React.FC<FollowRequestProps> = ({
  fullName, username, avatar
}) => {
  return (
    <div className={styles.followRequest}>
      <AvatarWithoutStory
        imageClassName={styles.avatar}
        url={avatar} />
      <div className={styles.body}>
        <p className={styles.title}>
          <span>{fullName || username}</span> has requested to follow you
        </p>
        <div className={styles.buttons}>
          <div className={styles.acceptButton}>
            {`Accept`}
          </div>
          <div className={styles.declineButton}>
            {`Decline`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FollowRequest;