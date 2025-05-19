import React, { useState } from "react";
import styles from "./commentMediaDialog.module.scss";
import BaseDialog, { DialogProps } from "@components/Dialogs/BaseDialog";
import { isMobile } from "react-device-detect";
import { CommentDto } from "services/CommentService/dtos";
import CommentList from "@components/Comment";
import CommentComposer from "@components/Comment/CommentComposer";
import { useTheme } from "next-themes";


interface CommentMediaDialogProps extends DialogProps {
  mediaUrl?: string;
  mediaType?: string;
}

const CommentMediaDialog: React.FC<CommentMediaDialogProps> = ({
  open,
  onClose,
  mediaUrl,
  mediaType
}) => {
  const { theme } = useTheme();
  return (
    <BaseDialog
      open={open}
      fullScreen={isMobile}
      onClose={onClose}
      backdropBg={theme === "light" ? "rgba(0, 0, 0, 0.8)" : undefined}
      showBaseHeader={false}
      maxWidth="lg" >
      <div className={styles.commentMediaDialog}>
        <img
          className={styles.mediaLayout}
          src={mediaUrl}
          alt="" />
        <div className={styles.tabRightSideFeedInfo}>
          {/* <FeedCreator
            id={feed.id}
            creator={feed.creator}
            owned={feed.owned}
            feedStyle={feed.feedStyle}
          />
          <Caption caption={feed.caption} />
          <FeedInteraction feed={feed} /> */}
          {/* {!showDetail && (
            <>
              <CommentList comments={comments!} loading={false} feed={feed} />
              <CommentComposer
                key={feed.id}
                feedId={feed.id}
                onNewComment={(data) => {
                  setComments([...comments!, data]);
                }}
              />
            </>
          )} */}
        </div>
      </div>
    </BaseDialog>
  );
};

export default CommentMediaDialog;
