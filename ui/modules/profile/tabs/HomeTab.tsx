import CreateFeed from "@components/CreateFeed";
import FeedList from "@components/Feeds";
import { useSession } from "context/SessionHook";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllFeed } from "services/FeedService";
import { FeedDto } from "services/FeedService/dtos";

const HomeTab = () => {
  const { query } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [feeds, setFeeds] = useState<Array<FeedDto> | []>();
  const { session } = useSession();

  useEffect(() => {
    if (query && query.userName) {
      const username: any = query.userName !== 'me'
        ? query.userName
        : session?.user.userName || ""

      setLoading(true);
      getAllFeed(username)
        .then(res => setFeeds(res.result))
        .catch(err => { })
        .finally(() => setLoading(false))
    }
  }, []);

  return (
    <div>
      <CreateFeed
        atPage='profile' />
      <FeedList
        feeds={feeds}
        loading={loading!} />
    </div>
  )
}

export default HomeTab;