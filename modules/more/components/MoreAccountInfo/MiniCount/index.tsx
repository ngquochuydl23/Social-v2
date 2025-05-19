import React from "react";
import styles from "./miniCount.module.scss";

interface MiniCountProps {
  count: number;
  text: string;
}

const MiniCount: React.FC<MiniCountProps> = ({ count, text }) => {
  return (
    <div className={styles.miniCount}>
      <div>
        <p className={styles.count}>{count}</p>
      </div>
      <div>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default MiniCount;
