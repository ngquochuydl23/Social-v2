import { AvatarWithStory } from "@components/Avatar";
import Cover from "../Cover";
import styles from "./profileInfo.module.scss";
import { useIntl } from "react-intl";
import { FilledButton, OutlineButton } from "@components/Button";
import { PATH } from "@constants/path";
import { ProfileDto } from "services/ProfileService/dtos";
import { useEffect, useState } from "react";
import StorySkeleton from "modules/home/components/StoryView/StorySkeleton";
import ScrollContainer from "react-indiana-drag-scroll";
import { Stack } from "@mui/material";
import _ from "lodash";
import StoryCollection from "../StoryCollection";
import FollowingsDialog from "../FollowingsDialog";
import FollowerDialog from "../FollowerDialog";
import { IcAddCover } from "@assets/icons";
import { createFollowing, deleteFollowing } from "services/FollowingService";

const stories = new Array<any>(6).fill({});

const ProfileInfo: React.FC<ProfileDto> = (profile?: ProfileDto | null) => {
  const intl = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollower, setOpenFollower] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState<number>(0);

  if (profile === null) {
    return null;
  }

  useEffect(() => {
    if (profile !== null) {
      setFollowed(profile?.followed || false);
      setFollowerCount(profile?.followerCount || 0);
    }
  }, [profile]);

  const unfollow = () => {
    setFollowed(false);
    setFollowerCount(followerCount - 1);
    deleteFollowing(profile?.id)
      .then(() => console.log("unfollowed"))
      .catch((err) => {
        setFollowed(true);
        setFollowerCount(followerCount + 1);
      })
      .finally();
  };

  const follow = () => {
    setFollowed(true);
    setFollowerCount(followerCount + 1);
    createFollowing(profile?.id)
      .then(() => console.log("followed"))
      .catch((err) => {
        setFollowerCount(followerCount - 1);
        setFollowed(false);
      })
      .finally();
  };

  return (
    <div className={styles.profileInfo}>
      <Cover cover={profile?.cover} onClick={() => { }} />
      <div className={styles.avatarAndFullName}>
        <div className={styles.avatarContain}>
          <AvatarWithStory
            avatarStoryCN={styles.overwriteAvatar}
            hasUnViewStories={true}
            fullName={profile?.fullName!!}
            url={profile?.avatar}
          />
        </div>
        <div className={styles.rightInfo}>
          <p className={styles.fullname}>{profile?.fullName}</p>
          <p className={styles.userName}>@{profile?.userName}</p>
          <div className={styles.followContain}>
            <p
              onClick={() => {
                if (followerCount !== 0) {
                  setOpenFollower(true);
                }
              }}
            >
              <span>{followerCount || 0}</span>
              {intl.formatMessage({ id: "Followers" })}
            </p>
            <p
              onClick={() => {
                if (profile?.followingCount !== 0) {
                  setOpenFollowing(true);
                }
              }}
            >
              <span>{profile?.followingCount || 0}</span>
              {intl.formatMessage({ id: "Followings" })}
            </p>
          </div>
        </div>
      </div>
      {Boolean(profile?.bio) && <p className={styles.bio}>{profile?.bio}</p>}
      <div className={styles.storyCollection}>
        {loading ? (
          <StorySkeleton />
        ) : (
          <ScrollContainer nativeMobileScroll hideScrollbars horizontal>
            <Stack
              direction="row"
              sx={{
                overflow: "visible",
              }}
            >
              {_.map(stories, (item: any) => (
                <div>
                  <StoryCollection />
                </div>
              ))}
            </Stack>
          </ScrollContainer>
        )}
      </div>
      {profile?.owned ? (
        <div className={styles.buttons}>
          <FilledButton
            leftIc={<IcAddCover />}
            className={styles.filledButton}
            text="Add Stories"
          />
          <OutlineButton
            href={PATH.ManageAccount}
            className={styles.outlineButton}
            text="Edit Profile"
          />
        </div>
      ) : (
        <div className={styles.buttons}>
          {Boolean(followed) ? (
            <OutlineButton
              className={styles.outlineButton}
              text="Unfollow"
              onClick={unfollow}
            />
          ) : (
            <FilledButton
              onClick={follow}
              className={styles.filledButton}
              text="Follow"
            />
          )}
          <OutlineButton
            href={PATH.ManageAccount}
            className={styles.outlineButton}
            text="Chat"
          />
        </div>
      )}
      <FollowingsDialog
        open={openFollowing}
        onClose={() => setOpenFollowing(false)}
      />
      <FollowerDialog
        open={openFollower}
        onClose={() => setOpenFollower(false)}
      />
    </div>
  );
};

export default ProfileInfo;
