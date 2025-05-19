import { IcHeartRegular } from "@assets/icons";
import { AvatarWithoutStory } from "@components/Avatar";
import { useState } from "react";
import { CommentDto } from "services/CommentService/dtos";
import CommentMediaDialog from "../CommentMediaDialog";
import styles from './commentItem.module.scss'
import moment from "moment";
import { formatRelativeTime } from "utils/formatMoment";
import { composerReply } from "../CommentComposer";
import CommentList from "../CommentList";
import classNames from "classnames";

const CommentItem = ({ comment, child = false }: { comment: CommentDto, child?: boolean }) => {
  const { creator } = comment;
  const [openImageDialog, setOpenImageDialog] = useState(false);
  moment.updateLocale('en', { relativeTime: formatRelativeTime });
  const CommentMedia = ({ url, mediaType }: { url: string; mediaType?: string; }) => {
    return (
      <div className={styles.mediaWrapper}>
        <img
          className={styles.media}
          src={url}
          onClick={() => setOpenImageDialog(true)}
        />
        <CommentMediaDialog
          mediaUrl={url}
          mediaType={mediaType}
          open={openImageDialog}
          onClose={() => setOpenImageDialog(false)} />
      </div>
    )
  }

  return (
    <div className={classNames(styles.commentItem, child && styles.child)}>
      <div className={styles.container}>
        <AvatarWithoutStory
          fullName={creator?.fullName}
          imageClassName={styles.avatar}
          url={creator?.avatar}
          onClick={() => { }}
        />
        <div className={styles.commentWrapper}>
          <div className={styles.creator}>
            {creator?.fullName}
          </div>
          {comment.content &&
            <p className={styles.content}>
              {comment.content}
            </p>
          }
          {comment.mediaUrl &&
            <CommentMedia
              mediaType={comment?.mediaType}
              url={comment?.mediaUrl!} />
          }
          <div className={styles.time}>
            <p className={styles.text}>{moment(comment.createAt).fromNow()}</p>
            <p
              className={styles.text}
              onClick={() => composerReply.next({ ...comment })}>
              {'Reply'}
            </p>
          </div>
          <CommentList
            child
            comments={comment.childs}
            error={{}}
            loading={false}
          />
        </div>
        <span className={styles.heartIcon}>
          <IcHeartRegular />
        </span>
      </div>
    </div>
  );
};

export default CommentItem;