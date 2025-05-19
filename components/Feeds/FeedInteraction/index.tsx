import classNames from "classnames";
import styles from "./feedInteraction.module.scss";
import {
  IcLikeCount,
  IcHeartCount,
  IcCommentButton,
  IcShareButton,
  IcDislikeButton,
} from "@assets/icons";
import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import CommentDialog from "@components/Comment/CommentDialog";
import { FeedDto } from "services/FeedService/dtos";
import LikesDialog from "@components/Likes/LikeDialog";
import { createLike, deleteLike, getFeedLikes } from "services/LikeService";
import axios from "axios";
import { LikeDto } from "services/LikeService/dtos";
import { set } from "lodash";

interface FeedInteractionProps {
  feed: FeedDto;
  isDetail?: boolean;
}

interface InteractionCountProps {
  count?: string;
  label?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  align?: "left" | "center" | "right";
  onClick?: () => any;
}

const InteractionCount: React.FC<InteractionCountProps> = ({
  count,
  label,
  leftComponent,
  rightComponent,
  align = "left",
  onClick,
}) => {
  const intl = useIntl();
  return (
    <div
      onClick={onClick}
      className={classNames(
        styles.interactionCount,
        align === "left" && styles.left,
        align === "center" && styles.center,
        align === "right" && styles.right
      )}
    >
      {leftComponent && (
        <div className={styles.leftComponent}>{leftComponent}</div>
      )}
      <span className={styles.label}>
        {count} {label}
      </span>
      {rightComponent && (
        <div className={styles.rightComponent}>{rightComponent}</div>
      )}
    </div>
  );
};

interface InteracButtonProps {
  label?: string;
  leftComponent?: React.ReactNode;
  status?: boolean;
  type?: "toggle" | "none";
  lcToggleOn?: React.ReactNode;
  lcToggleOff?: React.ReactNode;
  onClick?: () => any;
  onChangeToggle?: (toggle: boolean) => any;
}

const InteracButton: React.FC<InteracButtonProps> = ({
  label,
  leftComponent,
  status,
  type = "none",
  lcToggleOn,
  lcToggleOff,
  onChangeToggle,
  onClick,
}) => {
  const intl = useIntl();
  const [_toggle, setToggle] = useState(status);

  return (
    <div
      className={styles.interacButton}
      onClick={() => {
        if (type === "toggle") {
          if (onChangeToggle) onChangeToggle(!_toggle);
          setToggle(!_toggle);
        } else {
          if (onClick) onClick();
        }
      }}
    >
      {leftComponent && (
        <div className={styles.leftComponent}>{leftComponent}</div>
      )}
      {type === "toggle" && (
        <div className={styles.leftComponent}>
          {_toggle ? lcToggleOn : lcToggleOff}
        </div>
      )}

      <span
        className={classNames(
          styles.label,
          type === "toggle" && _toggle && styles.toggleOn
        )}
      >
        {label}
      </span>
    </div>
  );
};

const FeedInteraction: React.FC<FeedInteractionProps> = ({
  feed,
  isDetail = false,
}) => {
  const [openLikesDialog, setOpenLikesDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [like, setLike] = useState(feed.liked);

  function handleLike() {
    setLike(true);

    createLike(feed.id)
      .catch((err) => {
        setLike(false);
      });
  }

  function handleDislike() {
    setLike(false);
    deleteLike(feed.id)
      .catch((err) => {
        setLike(true);
      })
  }

  return (
    <div className={styles.feedInteraction}>
      <div className={styles.interactionCounts}>
        {feed.likeCount! > 0 && (
          <div>
            <InteractionCount
              count={feed.likeCount?.toString()}
              label="Likes"
              onClick={() => setOpenLikesDialog(true)}
              leftComponent={
                <div className={styles.likeLeftComponent}>
                  <div className={styles.likeButton}>
                    <IcLikeCount />
                  </div>
                  <div className={styles.heartButton}>
                    <IcHeartCount />
                  </div>
                </div>
              }
            />
            <LikesDialog
              open={openLikesDialog}
              onClose={() => {
                setOpenLikesDialog(false);
              }}
              feedId={feed.id}
            />
          </div>
        )}
        {feed.commentCount! > 0 && (
          <InteractionCount
            count={feed.commentCount!.toString()}
            label="Comments"
            align={feed.shareCount! > 0 ? "center" : "right"}
          />
        )}
        {feed.shareCount! > 0 && (
          <InteractionCount
            count={feed.shareCount!.toString()}
            label="Shares"
            align="right"
          />
        )}
      </div>
      <div className={styles.line} />
      <div className={styles.buttons}>
        <InteracButton
          type="toggle"
          label={"Like"}
          status={like}
          onChangeToggle={(toggle) => {
            if (toggle)
              handleLike();
            else
              handleDislike();
          }}
          lcToggleOff={<IcDislikeButton />}
        />
        <InteracButton
          label="Comments"
          onClick={() => {
            if (!isDetail) {
              setOpenCommentDialog(true);
            }
          }}
          leftComponent={<IcCommentButton />}
        />
        <InteracButton
          label="Shares"
          leftComponent={<IcShareButton />}
          onClick={() => {
            console.log(like);
          }}
        />
      </div>
      {!isDetail && (
        <CommentDialog
          feed={feed}
          open={openCommentDialog}
          onClose={() => setOpenCommentDialog(false)}
        />
      )}
    </div>
  );
};

export default FeedInteraction;
