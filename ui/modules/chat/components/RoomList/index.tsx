import { Stack } from '@mui/material';
import styles from './roomList.module.scss';
import { AvatarWithoutStory } from '@components/Avatar';
import { useSession } from 'context/SessionHook';
import _ from 'lodash';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { IcSeenMessage } from '@assets/icons';
import { socketManager } from 'services/socket';

interface RoomProps {
  room: any;
  unseenMsgCount: number;
  seen?: boolean;
  typing?: boolean;
}

const RoomList = () => {
  const socket = socketManager('rooms');

  const { session } = useSession();
  const router = useRouter();
  const [userRooms, setUserRooms] = useState<any[]>([]);
  const [socketConnect, setSocketConnect] = useState(socket.connected);

  function onConnect() {
    setSocketConnect(true);
  }

  function onDisconnect() {
    setSocketConnect(false);
  }

  const onUpdateUserRoomList = (actionType: string, uRoom: any) => {
    setUserRooms((uRooms) => {
      var idx
      switch (actionType) {
        case "newMsg":
          idx = uRooms.findIndex(x => x.room._id === uRoom.room._id);
          if (idx > -1) {
            uRooms.splice(idx, 1);
            return [uRoom, ...uRooms];
          }
          return [uRoom, ...uRooms];
        case "seen":
          idx = uRooms.findIndex(x => x.room._id === uRoom.room._id);
          if (idx > -1) {
            uRooms[idx].seen = session?.user.id !== uRoom.seenBys;
          }
          return [...uRooms];
        case "typing":
          idx = uRooms.findIndex(x => x.room._id === uRoom.room._id);
          if (idx > -1) {
            uRooms[idx].typing = session?.user.id !== uRoom.typing;
          }
          return [...uRooms];
        case "stopTyping":
          idx = uRooms.findIndex(x => x.room._id === uRoom.room._id);
          if (idx > -1) {
            uRooms[idx].typing = false;
          }
          return [...uRooms];
      }
      return uRooms
    });
  }

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    }
  }, []);

  useEffect(() => {
    socket.on('updateUserRoomList', onUpdateUserRoomList);
    return () => {

    }
  }, [userRooms, socket.connected]);

  useEffect(() => {
    socket.emit('subscribe', (res: any) => {
      setUserRooms(_.map(res.userRooms, (uRoom) => ({
        ...uRoom,
        seen: !_.isEmpty(uRoom.room.lastMsg.seenBys)
      })));
    });
    return () => {
      socket.off('subscribe', () => { });
    }
  }, [socketConnect]);

  const Room: React.FC<RoomProps> = ({ room, unseenMsgCount, seen, typing }) => {

    const otherUser = _.find(room.members, x =>
      x.userId !== session?.user.id);

    if (!otherUser) {
      return null;
    }
    const owned = room.lastMsg.creator.userId === session?.user.id;
    const selected = room._id === router.query.roomId;

    return (
      <div
        className={classNames(styles.room, selected && styles.selected)}
        onClick={() => {
          setUserRooms((uRooms) => {
            const idx = uRooms.findIndex(x => x.room._id === router.query.roomId);
            if (idx > -1) {
              uRooms[idx].unseenMsgCount = 0;
            }
            return [...uRooms];
          });
          router.replace('/chat/' + room._id);
        }}
      >
        <AvatarWithoutStory
          fullName={otherUser?.fullName}
          imageClassName={styles.avatar}
          url={otherUser?.avatar} />
        <div className={styles.body}>
          <p className={styles.fullName}>
            {otherUser?.fullName}
            <span>{`Sun`}</span>
          </p>
          {!Boolean(typing)
            ? <div className={styles.messageContent}>
              <p className={styles.text}>
                {owned && "You: "}
                {room.lastMsg.content}
              </p>
              {(unseenMsgCount > 0 && !selected) &&
                <span className={styles.unseenMsgCount}>
                  {unseenMsgCount}
                </span>
              }
              {(Boolean(seen) && (owned)) &&
                <IcSeenMessage />
              }
            </div>
            : <p className={styles.isTyping}>is typing...</p>
          }
        </div>
        <div className={styles.hoverFrame}>
          <button
            className={styles.menuBtn}
            onClick={() => { }}>
            menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.roomList}>
      <Stack
        direction="column">
        {_.map(userRooms, (uRoom, index) => {
          return (
            <Room
              typing={uRoom.typing}
              seen={uRoom.seen}
              unseenMsgCount={uRoom.unseenMsgCount}
              room={uRoom.room} />
          )
        })}
      </Stack>
    </div>
  )
}

export default RoomList;