import _ from "lodash";
import ReelItem from "./ReelItem";
import InfiniteScroll from "react-infinite-scroll-component";
import ListLoadingMore from "@components/ListLoadingMore";

interface ReelsProps {
  reels?: any[];
}

const ReelWatchings: React.FC<ReelsProps> = ({ reels }) => {
  return (
    <InfiniteScroll
      style={{ overflow: 'visible' }}
      dataLength={reels!.length}
      next={() => { }}
      hasMore={true}
      loader={<ListLoadingMore />}
      endMessage={
        < p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p >
      }
      pullDownToRefresh={false}>
      {_.map(reels, (item: any) => (
        <ReelItem key={item} {...item} />
      ))}
    </InfiniteScroll >
  );
};

export default ReelWatchings;
