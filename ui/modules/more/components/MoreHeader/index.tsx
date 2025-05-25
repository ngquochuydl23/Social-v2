import React from "react";
import styles from "./header.module.scss";
import { IcSearch, IcQR } from "@assets/icons";
import IconWithFrame from "@components/IconWithFrame";

interface MoreHeaderProps { }

const MoreHeader: React.FC<MoreHeaderProps> = ({ }) => {
  return (
    <div className={styles.moreHeader}>
      <div className={styles.iconsContainer}>
        <IconWithFrame className={styles.icFrame}>
          <IcSearch width={21} height={24} />
        </IconWithFrame>
        <IconWithFrame className={styles.icFrame}>
          <IcQR width={21} height={24} />
        </IconWithFrame>
      </div>
    </div>
  );
};

export default MoreHeader;
