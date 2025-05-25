import { IcReelComments, IcReelViewers } from "@assets/icons";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import styles from "./myReelItem.module.scss";

const MyReelItem = () => {
  const [hover, setHover] = useState(false);
  return (
    <div className={styles.myReelItem}>
      <Image
        fill
        alt="myReelItem"
        src={`https://www.social-v2.com/images/social-v2-1685629556804.jpeg`}
      />
      <div
        className={classNames(styles.onThumbnailImage, hover && styles.onHover)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? (
          <div className={styles.hoverCommentAndShare}>
            <div className={styles.iconAndTheNumberOf}>
              <IcReelViewers width={15} height={15} />
              <p>{`3.5K`}</p>
            </div>
            <div className={styles.iconAndTheNumberOf}>
              <IcReelComments width={15} height={15} />
              <p>{`3.5K`}</p>
            </div>
          </div>
        ) : (
          <div className={styles.iconAndTheNumberOf}>
            <p>{`No one eats our friends! #dreamworkstrolls #bergen`}</p>
            <div>
              <IcReelViewers width={15} height={15} />
              <span>{`3.5K`}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReelItem;
