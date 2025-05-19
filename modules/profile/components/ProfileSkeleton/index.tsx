import styles from "./profileSkeleton.module.scss";

const ProfileSkeleton = () => {
  return (
    <div className={styles.profileSkeleton}>
      <div className={styles.coverContain} />
      <div className={styles.avatarAndFullName}>
        <div className={styles.avatarContain}>
          <div className={styles.skeleton} />
        </div>
        <div className={styles.rightInfo}>
          <div className={styles.fullname} />
          <div className={styles.userName} />
          <div className={styles.followContain}></div>
        </div>
      </div>
      <div className={styles.tabs}>
        <div className={styles.tab} />
        <div className={styles.tab} />
        <div className={styles.tab} />
        <div className={styles.tab} />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
