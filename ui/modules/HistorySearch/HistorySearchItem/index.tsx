import { IcHashTag } from '@assets/icons';
import { AvatarWithStory } from '@components/Avatar';
import IconWithFrame from '@components/IconWithFrame';
import styles from './historySearch.module.scss'
import { useRouter } from 'next/router';

interface HistorySearchItemProps {
  type: string;
}

const HistorySearchItem: React.FC<HistorySearchItemProps> = ({
  type,
}) => {
  const router = useRouter();
  switch (type) {
    case "hashtag":
      return (
        <div className={styles.historySearchItem}>
          <div className={styles.hashtag}>
            <IconWithFrame className={styles.icFrame}>
              <IcHashTag
                width={22}
                height={22} />
            </IconWithFrame>
            <div className={styles.right}>
              <p className={styles.hashtagTitle}>{"machine_learning"}</p>
              <p className={styles.resultCount}>{'1.000 result'}</p>
            </div>
          </div>
        </div>
      )
    case "user":
      return (
        <div className={styles.historySearchItem} onClick={() => { router.push('/search?keyword=huy&tab=top') }}>
          <div className={styles.user}>
            <AvatarWithStory
              avatarStoryCN={styles.avatar}
              hasUnViewStories
              url={'https://www.social-v2.com/images/social-v2-1675667085052.jpeg'}
              fullName='Khánh Xuân'
            />
            <div className={styles.right}>
              <p className={styles.fullName}>{"Khánh Xuân"}</p>
              <p className={styles.userName}>{'@kxuann1210'}</p>
            </div>
          </div>
        </div>
      )
    case "keyword":
      return (
        <div className={styles.historySearchItem}>
        </div>
      )
    default:
      return null;
  }
}

export default HistorySearchItem;