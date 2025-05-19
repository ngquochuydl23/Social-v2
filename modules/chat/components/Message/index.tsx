import classNames from 'classnames';
import styles from './message.module.scss';
import { Stack } from '@mui/material';
import { AvatarWithoutStory } from '@components/Avatar';
import _ from 'lodash';
import moment from 'moment';
import Lottie from "lottie-react";
import { LottieTypingChatLight } from '@assets/lotties';
import { IcSeenMessage } from '@assets/icons';

interface MessageProps {
  type?: string;
  content?: any;
  owned?: boolean;
  creator?: {
    avatar: string;
    fullName: string;
    userId: string;
    userName: string;
  },
  roomId: string;
  seenBys: [];
  createdAt: string;
  inThreshold: boolean;
}

interface GroupOfMessagesProps {
  formatGroup?: boolean;
  datetime?: string;
  messages: MessageProps[]
}

interface TypingProps {
  creator?: any
}

export const GroupOfMessages: React.FC<GroupOfMessagesProps> = ({
  formatGroup, datetime, messages
}) => {
  return (
    <div className={styles.groupOfMessages}>
      <p className={styles.time}>{moment(datetime).format('ddd')} {moment(messages[0].createdAt).format('h:mm')}</p>
      {_.map(messages, (item, index) => {
        if (index > 0) {
          var diff = new Date(messages[index].createdAt).getTime() - new Date(messages[index - 1].createdAt).getTime();
          var mins = Math.floor(diff / (1000 * 60));
          diff -= mins * (1000 * 60);

          if (mins > 30) {
            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p className={styles.time}>{moment(messages[index].createdAt).format("h:mm")}</p>
                <Message
                  {...item}
                  inThreshold={false} />
              </div>
            )
          }
          if (messages[index].creator?.userId !== messages[index - 1].creator?.userId) {
            return (
              <Message
                {...item}
                inThreshold={false} />
            )
          }
          return (
            <Message
              {...item}
              inThreshold={true} />
          )
        }
        return (
          <Message
            {...item}
            inThreshold={false} />
        )
      })}
    </div>
  )
}

export const Message: React.FC<MessageProps> = ({
  type, content, owned, creator, roomId, seenBys, inThreshold, createdAt
}) => {
  return (
    <div className={classNames(
      styles.message,
      owned && styles.owned,
      inThreshold && styles.inThreshold)}>
      <Stack
        spacing="10px"
        direction="row">
        {!owned && !inThreshold &&
          <AvatarWithoutStory
            imageClassName={styles.avatar}
            fullName={creator?.fullName}
            url={creator?.avatar}
          />
        }
        <Stack spacing={Boolean(inThreshold) ? 0 : "2px"}>
          {!(owned) &&
            <p className={styles.creatorName}>{creator?.fullName}</p>
          }
          <div className={styles.content}>
            <p>{content}</p>
            <span>{moment(createdAt).format('h:mm')}</span>
            {(owned && !_.isEmpty(seenBys)) && <IcSeenMessage />}
          </div>
        </Stack>
      </Stack>
    </div>
  )
}

export const Typing: React.FC<TypingProps> = ({
  creator
}) => {
  return (
    <div className={classNames(styles.message, styles.typing)}>
      <Stack
        spacing="10px"
        direction="row">
        <AvatarWithoutStory
          imageClassName={styles.avatar}
          fullName={creator?.fullName}
          url={creator?.Avatar}
        />
        <Stack spacing="2px">
          <p className={styles.creatorName}>{creator?.fullName}</p>
          <div className={styles.content}>
            <Lottie
              animationData={LottieTypingChatLight}
              loop={true} />
          </div>
        </Stack>
      </Stack>
    </div>
  )
}
