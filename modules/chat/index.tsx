import { useRouter } from 'next/router'
import ChatLayout from "./components/ChatLayout";
import DetailRoom from "./components/DetailRoom";

const Chat = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <ChatLayout>
      {(query && Boolean(query.roomId))
        ? <DetailRoom roomId={query.roomId} />
        :
        <div>
          Not Chat
        </div>
      }
    </ChatLayout>
  )
}

export default Chat; 
