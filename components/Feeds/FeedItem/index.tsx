import Caption from "@components/Caption";
import FeedCreator from "../FeedCreator";
import FeedMedias from "../FeedMedias";
import styles from "./feedItem.module.scss";
import FeedInteraction from "../FeedInteraction";
import { FeedDto } from "services/FeedService/dtos";
import CommentList from "@components/Comment";
import CommentComposer from "@components/Comment/CommentComposer";
import { useEffect, useState } from "react";
import { CommentDto } from "services/CommentService/dtos";
import classNames from "classnames";
import { Drawer } from "@mui/material";
import { IcMore } from "@assets/icons";
import FeedOptions from "../FeedOptions";
import { isMobile } from "react-device-detect";
import BaseDropDownMenu from "@components/DropDown/BaseDropDownMenu";
import { Subject } from "rxjs";
import { deleteFeed } from "services/FeedService";
import CreateUpdateFeedDialog from "@components/CreateFeed/CreateUpdateFeedDialog";


interface FeedItemProps {
  feed?: FeedDto;
  showDetail?: boolean;
}

export const subject = new Subject<number>();

const FeedItem: React.FC<FeedItemProps> = ({
  feed, showDetail = false
}) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentDto[] | null>([]);
  useEffect(() => {
    setComments(feed?.mostRelativeComments!);
  }, []);
  const deleteFeedAction = () => {
    setOpenOptions(false)
    if (feed?.id) {
      subject.next(feed?.id)
      deleteFeed(feed?.id)
        .then((res) => { console.log(res) })
        .catch((err) => console.error(err))
    }
  }
  const updateFeedAction = () => {
    setOpenOptions(false);
    setOpenEditor(true);
  }
  const _FeedOptions = () => {
    return <FeedOptions
      feed={feed}
      onDeleteFeedClick={deleteFeedAction}
      onUpdateFeedClick={updateFeedAction} />;
  };
  return (
    <div
      key={feed?.id}
      className={classNames(styles.feedItem, showDetail && styles.showDetail)}>
      <div className={styles.head}>
        <FeedCreator {...feed!!} />
        <div
          className={styles.moreButton}
          onClick={() => setOpenOptions(!openOptions)}>
          <IcMore />
        </div>
        {isMobile ? (
          <Drawer
            anchor="bottom"
            open={openOptions}
            sx={{
              zIndex: 12001,
              [`.MuiDrawer-paperAnchorBottom`]: {
                paddingTop: "10px",
                borderRadius: "10px 10px 0px 0px",
                backgroundColor: "var(--BgPrimaryColor)",
              },
            }}
            onClose={() => setOpenOptions(false)}>
            <_FeedOptions />
          </Drawer>
        ) : (
          <BaseDropDownMenu
            menuClassName={styles.feedOptionsDropDown}
            open={openOptions}>
            <_FeedOptions />
          </BaseDropDownMenu>
        )}
      </div>
      <Caption
        feedId={feed?.id}
        caption={feed?.caption} />
      <FeedMedias
        medias={feed?.medias}
        feedStyle={feed?.feedStyle} />
      <FeedInteraction
        isDetail={showDetail}
        feed={feed!!}
      />
      {!showDetail &&
        <div>
          <CommentList
            feedId={feed?.id}
            comments={comments!}
            loading={false} />
          <CommentComposer
            idView={feed?.id}
            feedId={feed?.id}
            onNewComment={(data) => {
              setComments([...comments!, data]);
            }} />
        </div>
      }
      {(feed?.owned && openEditor) &&
        <CreateUpdateFeedDialog
          open={openEditor}
          isEdit
          editFeedData={{ ...feed }}
          onClose={() => setOpenEditor(false)}
        />
      }
    </div>
  );
};

export default FeedItem;
