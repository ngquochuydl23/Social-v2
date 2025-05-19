import { AvatarWithStory } from "@components/Avatar";
import classNames from "classnames";
import Link from "next/link";
import { isDesktop } from "react-device-detect";
import styles from "./reelCreator.module.scss";

export interface ReelCreatorProps {
  id?: number;
  userName: string;
  fullname?: string;
  avatar?: string;
  createOn?: string;
}

const ReelCreator: React.FC<ReelCreatorProps> = ({
  id,
  userName,
  fullname,
  avatar,
  createOn,
}) => {
  const href = "/profile/__vunhi__";

  return (
    <div
      className={classNames(
        styles.reelCreator,
        isDesktop && styles.isDesktop
      )}>
      <Link className={styles.avatar} href={href}>
        <AvatarWithStory
          hasUnViewStories={false}
          url={avatar}
        />
      </Link>
      <div className={styles.center}>
        <Link href={href}>
          <p className={styles.fullNameOrUserName}>{fullname || userName}</p>
        </Link>
        <div className={styles.privacyAndTime}>
          <p className={styles.time}>{`2 Hours`}</p>
        </div>
      </div>
      <div className={styles.moreButton}></div>
    </div>
  );
};

export default ReelCreator;
