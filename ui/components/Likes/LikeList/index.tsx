import ListLoadingMore from "@components/ListLoadingMore";
import { Stack } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useIntl } from "react-intl";
import LikeItem from "../LikeItem";
import styles from "./likeList.module.scss";
import { LikeDto } from "services/LikeService/dtos";
import { getFeedLikes } from "services/LikeService";
import LikeSkelaton from "../LikeSkelaton";


const LikeList = ({ feedId }: { feedId?: number }) => {
  const intl = useIntl();
  const [likesData, setLikesData] = useState<LikeDto[] | null | undefined>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    getFeedLikes(feedId)
      .then((res) => setLikesData(res.result))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [feedId]);

  return (
    <InfiniteScroll
      style={{ overflow: "visible" }}
      dataLength={likesData?.length || 0}
      next={() => { }}
      hasMore={false}
      loader={<ListLoadingMore />}
      pullDownToRefresh={false}>
      {loading
        ? <div>
          <LikeSkelaton />
          <LikeSkelaton />
          <LikeSkelaton />
        </div>
        : <Stack spacing={0}>
          {_.map(likesData, (item: LikeDto) => {
            return <LikeItem
              key={item.id}
              like={item} />;
          })}
        </Stack>
      }
    </InfiniteScroll>
  );
};

export default LikeList;
