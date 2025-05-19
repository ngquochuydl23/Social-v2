import { RoomDto } from 'services/ChatService/dtos';
import styles from './rightDrawer.module.scss';
import { AvatarWithoutStory } from '@components/Avatar';
import { useSession } from 'context/SessionHook';
import _ from 'lodash';
import { IcMediaChatComposer } from '@assets/icons';

interface RightDrawerProps {
  room?: RoomDto
}

interface MenuChatInfoProps {
  count?: number;
  name?: string;
  icon?: any;
}

const RightDrawer: React.FC<RightDrawerProps> = ({ room }) => {
  const { session } = useSession();
  const getTitle = () => {
    if (room?.isPrivate) {
      const otherUser = getOtherUser();
      return otherUser?.fullName || "Unknown user"
    }
  }

  const getOtherUser = () => {
    return _.find(room?.members, x =>
      x.userId !== session?.user.id)
  }

  const getSubtitle = () => {
    return room?.isPrivate ? `@${getOtherUser()?.userName}` : "1 member"
  }

  const MenuChatInfo: React.FC<MenuChatInfoProps> = ({
    count, name, icon
  }) => {
    return (
      <div className={styles.menuInfoChat}>
        {icon} <p className={styles.title}>{count} {name}</p>
      </div>
    )
  }

  return (
    <div className={styles.rightDrawer}>
      <div className={styles.account}>
        <AvatarWithoutStory
          imageClassName={styles.avatar}
          url={getOtherUser()?.avatar}
          fullName={getTitle()} />

        <p className={styles.fullName}>{getTitle()}</p>
        <p className={styles.userName}>{getSubtitle()}</p>
      </div>

      <MenuChatInfo
        count={1100}
        icon={<IcMediaChatComposer />}
        name={'Photos'}
      />
      <MenuChatInfo
        count={200}
        icon={<IcMediaChatComposer />}
        name={'Links'}
      />
      <MenuChatInfo
        count={10}
        icon={<IcMediaChatComposer />}
        name={'Voice Messages'}
      />
    </div>
  )
}

export default RightDrawer;