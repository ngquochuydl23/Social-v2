import { AvatarWithStory } from "@components/Avatar";
import Cover from "../Cover";
import styles from "./profileInfo.module.scss";
import { useIntl } from "react-intl";
import { FilledButton, OutlineButton } from "@components/Button";
import { PATH } from "@constants/path";
import { ProfileDto } from "services/ProfileService/dtos";

const ProfileInfo: React.FC<ProfileDto> = (profile?: ProfileDto | null) => {
  const intl = useIntl();

  if (profile === null) {
    return null;
  }

  return (
    <div className={styles.profileInfo}>
      <Cover cover={profile?.cover} onClick={() => {}} />
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
            <p>
              <span>{profile?.followerCount || 0}</span>
              {intl.formatMessage({ id: "Followers" })}
            </p>
            <p>
              <span>{profile?.followingCount || 0}</span>
              {intl.formatMessage({ id: "Followings" })}
            </p>
          </div>
        </div>
      </div>
      {Boolean(profile?.bio) && <p className={styles.bio}>{profile?.bio}</p>}
      {profile?.owned ? (
        <div className={styles.buttons}>
          <FilledButton
            className={styles.addStories}
            textClassName={styles.text}
            text="Add Stories"
          />
          <OutlineButton
            href={PATH.EditAccount}
            className={styles.editProfileButton}
            textClassName={styles.text}
            text="Edit Profile"
          />
        </div>
      ) : (
        <div className={styles.buttons}>
          {Boolean(profile?.followed) ? (
            <OutlineButton
              href={PATH.EditAccount}
              className={styles.editProfileButton}
              textClassName={styles.text}
              text="Follow"
            />
          ) : (
            <FilledButton
              className={styles.addStories}
              textClassName={styles.text}
              text="Unfollow"
            />
          )}
          <OutlineButton
            href={PATH.EditAccount}
            className={styles.editProfileButton}
            textClassName={styles.text}
            text="Chat"
          />
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
