import { useSession } from 'context/SessionHook';
import styles from './createStoryItem.module.scss'
import { useIntl } from 'react-intl';
import { AvatarWithoutStory } from '@components/Avatar';
import { useRouter } from 'next/router';

const CreateStoryItem = () => {
  const intl = useIntl();
  const router = useRouter();
  const { session } = useSession();
  return (
    <div
      className={styles.createStoryItem}
      onClick={() => {
        router.push(`?creatingStory=true`, undefined, { shallow: true })
      }}>
      <AvatarWithoutStory
        imageClassName={styles.avatar}
        url={session?.user?.avatar}
        fullName={session?.user?.fullname}
        variant='square' />
      <div className={styles.createBody}>
        <div className={styles.createButton}>
          <div className={styles.onButton}>
            <span>+</span>
          </div>
        </div>
        <div className={styles.createStoryTitle}>
          {intl.formatMessage({ id: "Create Story" })}
        </div>
      </div>
    </div>
  )
}

export default CreateStoryItem;