import { AvatarWithStory } from "@components/Avatar";
import { FeedStyle } from "@constants/globals";
import moment from "moment";
import Link from "next/link";
import { useIntl } from "react-intl";
import { FeedDto } from "services/FeedService/dtos";
import { formatRelativeTime } from "utils/formatMoment";
import styles from "./feedCreator.module.scss";
import { Popover } from "@mui/material";
import { useState } from "react";
import zIndex from "@mui/material/styles/zIndex";

const FeedCreator = (feed: FeedDto) => {
  const intl = useIntl();
  const { creator } = feed;
  const href = "/profile/" + creator?.userName;
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  moment.updateLocale('en', { relativeTime: formatRelativeTime });

  const feedDescription = () => {
    switch (feed.feedStyle) {
      case FeedStyle.Avatar:
        return "has changed her avatar."
      case FeedStyle.Cover:
        return "has changed her cover."
      default:
        return "has added a new post."
    }
  }

  return (
    <div className={styles.feedCreator}>
      <AvatarWithStory
        // onFocus={() => setOpenPopover(true)}
        href={href}
        fullName={creator?.fullName}
        hasUnViewStories={true}
        url={creator?.avatar} />
      <div className={styles.center}>
        <p className={styles.fullNameAndTitle} >
          <Link href={href}>
            <span>{creator?.fullName || "Unknown user"} </span>
          </Link>
          {intl.formatMessage({ id: feedDescription() })}
        </p>
        <div className={styles.privacyAndTime}>
          <p className={styles.time}>{moment(feed.createAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedCreator;
