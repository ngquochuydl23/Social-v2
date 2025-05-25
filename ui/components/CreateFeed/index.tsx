import { isMobile } from 'react-device-detect';
import styles from './createFeedCard.module.scss'
import { useIntl } from 'react-intl';
import { useSession } from 'context/SessionHook';
import { AvatarWithoutStory } from '@components/Avatar';
import { useState } from 'react';
import CreateUpdateFeedDialog from './CreateUpdateFeedDialog';


interface CreateFeedProps {
  atPage?: "home" | "profile" | "group";
}

const CreateFeed: React.FC<CreateFeedProps> = ({
  atPage = "home"
}) => {
  const intl = useIntl();
  const { session } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <div
      className={styles.createFeed}
      onClick={(e) => {
        if (!open) {
          setOpen(true)
        }
      }}>
      <AvatarWithoutStory
        fullName={session?.user.fullname}
        imageClassName={styles.avatar}
        url={session?.user.avatar} />
      <div className={styles.status}>
        <p>{intl.formatMessage({ id: 'What’s on your mind?' })}</p>
      </div>
      <CreateUpdateFeedDialog
        open={open}
        isEdit={false}
        onClose={() => setOpen(false)} />
    </div>
  )
}

export default CreateFeed;