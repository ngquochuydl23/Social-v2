import { useIntl } from "react-intl";
import styles from "./likeItem.module.scss";
import { AvatarWithoutStory } from "@components/Avatar";
import { FilledButton } from "@components/Button";
import { OutlineButton } from "@components/Button";
import { LikeDto } from "services/LikeService/dtos";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { createFollowing, deleteFollowing } from "services/FollowingService";

interface LikeItemProps {
  like: LikeDto;
}

const LikeItem: React.FC<LikeItemProps> = ({ like }) => {
  const intl = useIntl();
  const { creator } = like;
  const [state, setState] = useState<any>({
    followed: null,
    fetched: true
  });

  useEffect(() => {
    setState({ followed: creator?.followed, fetched: true })
  }, [like])

  useEffect(() => {
    if (state.fetched === false) {
      const newTimer = setTimeout(() => {
        switch (state.followed) {
          case true:
            createFollowing(creator?.id)
              .then((res) => console.log(res))
              .catch((err) => {
                setState({ followed: false, fetched: true })
                console.error(err)
              })
            break;
          case false:
            deleteFollowing(creator?.id)
              .then((res) => console.log(res))
              .catch((err) => {
                setState({ followed: true, fetched: true })
                console.error(err)
              })
            break;
        }
      }, 1000)
      return () => clearTimeout(newTimer);
    }
    return () => null
  }, [state])

  const FollowButton = () => {
    if (state.followed === null)
      return null;

    if (state.followed === true) {
      return <OutlineButton
        onClick={() => setState({ followed: false, fetched: false })}
        className={classNames(styles.buttonWrapper, styles.followed)}
        text='Following' />
    }
    return <FilledButton
      onClick={() => setState({ followed: true, fetched: false })}
      className={classNames(styles.buttonWrapper, styles.noFollow)}
      text='Follow' />
  }

  return (
    <div
      id={`key${like.id}`}
      className={styles.likeItem}>
      <div className={styles.container}>
        <div className={styles.item}>
          <Link
            href={"/profile/" + `${creator?.userName}`}
            className={styles.infoCreator}>
            <AvatarWithoutStory
              href={"/profile/" + `${creator?.userName}`}
              fullName={creator?.fullName}
              url={creator?.avatar}
            />
            <div className={styles.name}>
              <p className={styles.fullName}>{creator?.fullName}</p>
              <p className={styles.username}>@{creator?.userName}</p>
            </div>
          </Link>
          <FollowButton />
        </div>
      </div>
    </div>
  );
};

export default LikeItem;

