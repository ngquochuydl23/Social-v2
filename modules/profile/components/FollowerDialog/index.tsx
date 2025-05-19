import BaseDialog, {
  BaseDialogHeader,
  DialogProps,
} from "@components/Dialogs/BaseDialog";
import styles from "./followerDialog.module.scss";
import { Box, Skeleton, Stack } from "@mui/material";
import {
  createFollowing,
  getFollowers,
  getFollowings,
} from "services/FollowingService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "context/SessionHook";
import { FollowerDto, FollowingDto } from "services/FollowingService/dtos";
import _ from "lodash";
import SocialV2Link from "@components/Social-v2-Link";
import { AvatarWithoutStory } from "@components/Avatar";
import { FilledButton, OutlineButton } from "@components/Button";
import classNames from "classnames";
import { isMobile } from "react-device-detect";

const FollowerItem = (follower: FollowerDto) => {
  const [followed, setFollowed] = useState<boolean>();
  const { session } = useSession();
  useEffect(() => {
    setFollowed(follower.followed);
  }, [follower]);

  const follow = () => {
    setFollowed(true);
    console.log(follower.creatorId);
    
    createFollowing(follower.creatorId)
      .then((res) => {
        
      })
      .catch((err) => {
        setFollowed(false);
      })
      .finally();
  };

  const unfollow = () => {
    setFollowed(false);
  };

  return (
    <div key={follower.id} className={styles.likeItem}>
      <div className={styles.container}>
        <div className={styles.item}>
          <SocialV2Link
            replace
            href={"/profile/" + `${follower?.userName}`}
            className={styles.infoCreator}
          >
            <AvatarWithoutStory
              href={"/profile/" + `${follower?.userName}`}
              fullName={follower?.fullName}
              url={follower?.avatar}
            />
            <div className={styles.name}>
              <p className={styles.fullName}>{follower?.fullName}</p>
              <p className={styles.username}>@{follower?.userName}</p>
            </div>
          </SocialV2Link>
          {follower.creatorId !== session?.user.id ? (
            followed ? (
              <OutlineButton
                onClick={unfollow}
                className={classNames(styles.buttonWrapper, styles.followed)}
                text="Following"
              />
            ) : (
              <FilledButton
                onClick={follow}
                className={classNames(styles.buttonWrapper, styles.noFollow)}
                text="Follow"
              />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

const FollowerDialog: React.FC<DialogProps> = ({ open, onClose }) => {
  const { query } = useRouter();
  const { session } = useSession();

  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState<FollowerDto[]>();

  useEffect(() => {
    if (query && query.userName && open) {
      const username: any =
        query.userName !== "me" ? query.userName : session?.user.userName;

      setLoading(true);
      getFollowers(username)
        .then((res) => {
          setFollowers(res.result);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open]);

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullScreen={isMobile}
      showBaseHeader={false}
      isPadding={false}
    >
      <div style={{ borderRadius: "20px" }}>
        <BaseDialogHeader
          textRightButton="Cancel"
          rightButtonClick={onClose}
          text="Follower"
          onButtonClose={onClose}
        />
        {!loading ? (
          <Stack spacing="10px" sx={{ paddingBottom: "10px" }}>
            {_.map(followers, (item: FollowingDto) => (
              <FollowerItem {...item} />
            ))}
          </Stack>
        ) : (
          <Stack sx={{ marginX: "10px" }} direction="column">
            <Box
              sx={{
                padding: "10px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Skeleton
                sx={{ bgcolor: "var(--SkeletonColor)" }}
                variant="circular"
                width="50px"
                height="50px"
              />
              <Box sx={{ marginLeft: "15px" }}>
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "18px",
                    width: "150px",
                    bgcolor: "var(--SkeletonColor)",
                  }}
                />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "15px",
                    width: "100px",
                    bgcolor: "var(--SkeletonColor)",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                padding: "10px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Skeleton
                sx={{ bgcolor: "var(--SkeletonColor)" }}
                variant="circular"
                width="50px"
                height="50px"
              />
              <Box sx={{ marginLeft: "15px" }}>
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "18px",
                    width: "150px",
                    bgcolor: "var(--SkeletonColor)",
                  }}
                />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "15px",
                    width: "100px",
                    bgcolor: "var(--SkeletonColor)",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                padding: "10px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Skeleton
                sx={{ bgcolor: "var(--SkeletonColor)" }}
                variant="circular"
                width="50px"
                height="50px"
              />
              <Box sx={{ marginLeft: "15px" }}>
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "18px",
                    width: "150px",
                    bgcolor: "var(--SkeletonColor)",
                  }}
                />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "15px",
                    width: "100px",
                    bgcolor: "var(--SkeletonColor)",
                  }}
                />
              </Box>
            </Box>
          </Stack>
        )}
      </div>
    </BaseDialog>
  );
};

export default FollowerDialog;
