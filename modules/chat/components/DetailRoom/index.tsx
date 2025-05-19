import styles from './detailRoom.module.scss';
import { useEffect, useState } from 'react';
import DetailRoomHeader from '../DetailRoomHeader';
import { ChatMemberDto, RoomDto } from 'services/ChatService/dtos';
import Composer from '../Composer';
import { useSession } from 'context/SessionHook';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { groupByMessage } from 'utils/groupByMessageUtil';
import { GroupOfMessages, Typing } from '../Message';
import RightDrawer from '../RightDrawer';
import { socketManager } from 'services/socket';

const DetailRoom = ({ roomId }: { roomId: any }) => {

  const socket = socketManager('chatRoom');

  const { session } = useSession();
  const [room, setRoom] = useState<RoomDto>();
  const [messages, setMessages] = useState<any[]>([]);
  const [typingUser, setTypingUser] = useState<ChatMemberDto>();
  const [openDrawer, setOpenDrawer] = useState(false);

  function onConnect() {
  }

  function onDisconnect() {
  }

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    }
  }, [])

  useEffect(() => {
    socket.emit('join', roomId, (res: any) => {
      setRoom(res.room);
      setMessages(res.messages);
    });

    socket.on('newMessage', function (roomId: string, message: any) {
      if (typingUser?.userId === message.creator.userId) {
        setTypingUser(undefined);
      }

      setMessages((pre) => [...pre, {
        ...message,
        owned: message.creator.userId === session?.user.id
      }]);

      socket.emit('seen', roomId, session?.user.id);
    });

    socket.on('seen', function (roomId: string, userId: number) {
      if (userId !== session?.user.id) {
        setMessages((pre) => _.map(pre, (item) => {
          return {
            ...item,
            seenBys: [...item.seenBys, userId]
          }
        }));
      }
    });

    socket.on('typing', function (roomId: string, userId: number) {
      if (userId !== session?.user.id) {
        setTypingUser(room?.members.find(x => x.userId === userId))
      }
    });

    socket.on('stopTyping', function (roomId: string, userId: number) {
      if (userId !== session?.user.id) {
        setTypingUser(undefined);
      }
    });

    socket.io.on("error", (error: any) => {
      console.log(error)
      socket.connect();
    });

    return () => {
      socket.off('join', () => { });
      socket.emit('leave', roomId);
      socket.off('stopTyping', () => { });
      socket.off('typing', () => { });
    };
  }, [roomId]);

  const handleSendMessage = (message: any) => {
    socket.emit('newMessage', roomId, message)
  }

  const handleTypingMessage = () => {
    socket.emit('typing', roomId)
  }

  const handleStopTypingMessage = () => {
    socket.emit('stopTyping', roomId)
  }

  return (
    <div className={styles.container}>
      <div className={styles.detailRoom}>
        <DetailRoomHeader
          onShowChatDetail={() => setOpenDrawer(true)}
          isPrivate={room?.isPrivate || false}
          members={room?.members} />
        <div
          id="scrollableDiv"
          className={styles.messageList}>
          <InfiniteScroll
            inverse
            scrollableTarget="scrollableDiv"
            dataLength={messages.length}
            next={() => console.log("Load More")}
            hasMore={false}
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
              overflow: 'hidden'
            }}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }>
            {typingUser && <Typing creator={typingUser} />}
            {_.map(groupByMessage(messages).reverse(), (item) => {
              return (
                <GroupOfMessages
                  {...item} />
              )
            })}
          </InfiniteScroll>
        </div>
        <Composer
          onTyping={handleTypingMessage}
          onStopTyping={handleStopTypingMessage}
          onSendMessage={handleSendMessage}
        />
      </div>
      <RightDrawer room={room} />
    </div>
  )
}

export default DetailRoom;