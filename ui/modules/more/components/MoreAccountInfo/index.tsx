import React from "react";
import Link from "next/link";
import { useSession } from "context/SessionHook";
import { AvatarWithoutStory } from "@components/Avatar";
import MiniCount from "./MiniCount";
import styles from "./accountInfo.module.scss";
import { PATH } from "@constants/path";

interface MoreAccountInfoProps {
  following: any;
  follower: any;
}

const MoreAccountInteraction: React.FC<MoreAccountInfoProps> = ({
  following,
  follower,
}) => {
  return (
    <div className={styles.accountInteraction}>
      <MiniCount text="Feeds" count={follower} />
      <MiniCount text="Reels" count={follower} />
      <MiniCount text="Followers" count={follower} />
      <MiniCount text="Followings" count={following} />
    </div>
  );
};

const MoreAccountInfo = () => {
  const { session } = useSession();
  return (
    <div>
      <div className={styles.accountProfile}>
        <Link className={styles.overrideLinkStyle} href={PATH.MyProfile}>
          <div className={styles.container}>
            <AvatarWithoutStory
              url={session!.user.avatar}
              imageClassName={styles.overwriteAvatar}
            />
            <div className={styles.wrapperContext}>
              <p className={styles.fullName}>{session!.user.fullname}</p>
              <p className={styles.userName}>@{session!.user.userName}</p>
            </div>
          </div>
        </Link>
        <MoreAccountInteraction
          following={session!.user.followingCount}
          follower={session!.user.followerCount}
        />
      </div>
    </div>
  );
};
export default MoreAccountInfo;
