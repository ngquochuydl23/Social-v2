import BaseDialog, { DialogProps } from "@components/Dialogs/BaseDialog";
import FeedItem from "@components/Feeds/FeedItem";
import { useSession } from "context/SessionHook";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useIntl } from "react-intl";
import { getComments } from "services/CommentService";
import { CommentDto } from "services/CommentService/dtos";
import { FeedDto } from "services/FeedService/dtos";
import CommentList from "..";
import CommentComposer from "../CommentComposer";
import styles from './commentDialog.module.scss';

interface CommentDialogProps extends DialogProps {
  feed: FeedDto
}

const CommentDialog: React.FC<CommentDialogProps> = ({
  open,
  onClose,
  feed
}) => {
  const intl = useIntl();
  const [comments, setComments] = useState<CommentDto[] | null>([]);

  useEffect(() => {
    getComments(feed.id!)
      .then((res) => {
        setComments(res.result!)
      })
      .catch((err) => console.log(err))
  }, [open]);

  return (
    <BaseDialog
      open={open}
      fullScreen={isMobile}
      dialogHeaderProps={{
        text: `${feed.creator?.fullName}'s Post`
      }}
      onClose={onClose}>
      <div className={styles.commentDialog}>
        <FeedItem
          feed={feed}
          showDetail={true}
        />
        <CommentList
          loading={false}
          comments={comments!}
        />
        <div className={styles.composer}>
          <CommentComposer
            feedId={feed.id}
            idView={feed.id + "detail"}
            onNewComment={(data) => {
              setComments([...comments!, data]);
            }} />
        </div>
      </div>
    </BaseDialog>
  )
}

export default CommentDialog;