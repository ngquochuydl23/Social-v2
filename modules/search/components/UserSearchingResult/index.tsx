import { AvatarWithStory } from "@components/Avatar";
import { FilledButton } from "@components/Button";
import styles from './userSearchResult.module.scss';


interface UserSearchingResultProps {
  fullName?: string;
  avatar?: string;
  hasUnviewedStories?: boolean;
  userName?: string;
  followerCount: string;
  followed: boolean;
}

const UserSearchingResult: React.FC<UserSearchingResultProps> = ({
  fullName, avatar, hasUnviewedStories, userName, followerCount, followed
}) => {
  return (
    <div className={styles.userSearchResult}>
      <AvatarWithStory
        avatarStoryCN={styles.avatar}
        hasUnViewStories={hasUnviewedStories}
        url={avatar}
        fullName={fullName}
      />
      <div className={styles.rightComponent}>
        <p className={styles.fullName}>{fullName}</p>
        <p className={styles.userName}>{'@' + userName}</p>
        <p className={styles.follower}><span>{followerCount}</span> {'Followers'}</p>
      </div>
      <FilledButton
        className={styles.followButton}
        text='Follow'
        textClassName={styles.textButton}
      />
    </div>
  )
}

export default UserSearchingResult;