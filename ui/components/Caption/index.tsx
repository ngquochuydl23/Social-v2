import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { getCaptionLines } from "utils/CaptionUtils";
import styles from "./caption.module.scss";
import { useIntl } from 'react-intl';

interface CaptionProps {
  feedId?: number;
  caption?: string;
  userTags?: [];
  captionContentCN?: string;
  captionContainCN?: string;
  enableCollapseText?: boolean;
}

const Caption: React.FC<CaptionProps> = ({
  feedId,
  caption,
  userTags,
  captionContentCN,
  captionContainCN,
  enableCollapseText = true
}) => {
  const intl = useIntl();
  const [collapseText, setCollapseText] = useState<boolean>(false);
  const [initLineCount, setInitLineCount] = useState<number>(0);

  useEffect(() => {
    if (!caption) {
      return;
    } else {
      if (initLineCount === 0 && getCaptionLines(feedId!) > 3) {
        console.log(getCaptionLines(feedId!));
        setInitLineCount(getCaptionLines(feedId!));
        setCollapseText(true)
      }
    }
  }, []);

  return (
    <div
      className={classNames(styles.caption, captionContainCN)}>
      <p id={"caption" + feedId}
        className={classNames(
          styles.captionContent,
          (enableCollapseText && collapseText && initLineCount > 3) && styles.limit,
          captionContentCN
        )}>
        {caption}
      </p>
      {(enableCollapseText && initLineCount > 3) &&
        <div
          className={styles.expandCollapseButton}
          onClick={() => setCollapseText(!collapseText)}>
          {intl.formatMessage({ id: collapseText ? "See more" : "Hide" })}
        </div>
      }
    </div>
  );
};

export default Caption;
