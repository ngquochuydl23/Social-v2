import { ChatMemberDto } from 'services/ChatService/dtos';
import styles from './detailRoomHeader.module.scss';
import _ from 'lodash';
import { useSession } from 'context/SessionHook';
import { AvatarWithoutStory } from '@components/Avatar';
import { IcChatRightSidebar } from '@assets/icons';

interface DetailRoomHeaderProps {
  isPrivate: boolean;
  members?: Array<ChatMemberDto>
  onShowChatDetail: () => any;
}

const DetailRoomHeader: React.FC<DetailRoomHeaderProps> = ({
  isPrivate, members, onShowChatDetail
}) => {
  const { session } = useSession();
  const getTitle = () => {
    if (isPrivate) {
      const otherUser = getOtherUser();
      return otherUser?.fullName || "Unknown user"
    }
  }

  const getOtherUser = () => {
    return _.find(members, x =>
      x.userId !== session?.user.id)
  }

  const getSubtitle = () => {
    return "Online now"
  }

  return (
    <div
      className={styles.header}
      onClick={onShowChatDetail}>
      <AvatarWithoutStory
        fullName={getOtherUser()?.fullName}
        url={getOtherUser()?.avatar}
      />
      <div className={styles.roomInfo}>
        <p className={styles.title}>{getTitle()}</p>
        <p className={styles.subtitle}>{getSubtitle()}</p>
      </div>
      <button className={styles.headerBtn}>
        <IcChatRightSidebar />
      </button>
      <button
        className={styles.headerBtn}
        onClick={onShowChatDetail}>
        <IcChatRightSidebar />
      </button>
      <button className={styles.headerBtn}>
        <IcChatRightSidebar />
      </button>
    </div>
  )
}

export default DetailRoomHeader;