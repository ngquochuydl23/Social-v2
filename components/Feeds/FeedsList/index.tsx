import CreateUpdateFeedDialog, { createUpdateFeedSubject } from "@components/CreateFeed/CreateUpdateFeedDialog";
import ListLoadingMore from "@components/ListLoadingMore";
import { Stack } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FeedDto } from "services/FeedService/dtos";
import FeedItem, { subject } from "../FeedItem";

interface FeedListProps {
  feeds?: FeedDto[];
  loading: boolean;
  error?: any;
}

const FeedList: React.FC<FeedListProps> = ({ feeds, loading, error }) => {
  const [_feeds, setFeeds] = useState<FeedDto[] | null | undefined>();

  useEffect(() => {
    setFeeds(feeds!);
  }, [feeds]);

  const removeFeedView = (id: number) => {
    const index = _.findIndex(_feeds, (feed) => feed.id === id);
    if (index > -1) {
      _feeds?.splice(index, 1);
      setFeeds([..._feeds!]);
    }
  };

  const addUpdateFeedView = (feed: FeedDto) => {
    const idx = _.findIndex(_feeds, (item: FeedDto) => item.id === feed.id);
    if (idx >= 0) {
      setFeeds(
        _feeds?.map(item => {
          if (item?.id === feed.id)
            return { ...feed };
          return item;
        }),
      );
    } else setFeeds([feed].concat(_feeds!));
  }

  subject.subscribe({ next: removeFeedView });
  createUpdateFeedSubject.subscribe({ next: addUpdateFeedView });

  return (
    <InfiniteScroll
      style={{ overflow: 'visible' }}
      dataLength={_feeds?.length || 0}
      next={() => { }}
      hasMore={true}
      loader={<ListLoadingMore />}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      pullDownToRefresh={false}>
      <Stack spacing={2}>
        {_.map(_feeds, (item: FeedDto, key) => {
          return <FeedItem
            key={item.id}
            feed={item} />;
        })}
      </Stack>
    </InfiniteScroll >
  );
};

export default FeedList;
