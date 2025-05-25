import React from "react";
import styles from "./storyCollection.module.scss";

interface StoryCollectionProps {
  stories?: any;
}

const StoryCollection: React.FC<StoryCollectionProps> = ({}) => {
  return (
    <div className={styles.storyItem}>
      <img
        width={107}
        height={180}
        alt="story-thumbnai"
        src="https://www.social-v2.com/images/social-v2-1686040819948.jpeg"
      />
      <div className={styles.onImage}>
        <div className={styles.wrapper}>
          <p className={styles.name}>Chicago</p>
        </div>
      </div>
    </div>
  );
};

export default StoryCollection;
