import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllFeed } from "services/FeedService";
import { FeedDto } from "services/FeedService/dtos";
import MyReels from "../components/MyReels";

const ReelsTab = () => {
  const { query } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  // const [feeds, setFeeds] = useState<Array<FeedDto> | []>();

  useEffect(() => {
    //setLoading(true);
    // getAllFeed()
    //   .then(res => setFeeds(res.result))
    //   .catch(err => { })
    //   .finally(() => setLoading(false))
  }, []);

  return (<MyReels />)
}

export default ReelsTab;