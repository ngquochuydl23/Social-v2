import { IcDeletePost, IcEditFeedMedias } from "@assets/icons";
import { FilledButton } from "@components/Button";
import { FeedStyle } from "@constants/globals";
import { MediaDto } from "services/MediaService/dtos";
import FeedAvatar from "./FeedAvatar";
import FeedClassic from "./FeedClassic";
import styles from './feedMedias.module.scss';
import FeedCover from "./FeedCover";

interface FeedMediasProps {
  feedStyle?: string;
  medias?: MediaDto[];
  addOrUpdate?: boolean;
  onAddMediasClick?: () => any;
  onEditMediaClick?: () => any;
  onRemoveMedia?: (media: MediaDto) => any;
}

const FeedMedias: React.FC<FeedMediasProps> = ({
  feedStyle,
  medias,
  addOrUpdate = false,
  onAddMediasClick,
  onEditMediaClick,
  onRemoveMedia,
}) => {

  const MediasLayout = () => {
    switch (feedStyle) {
      case FeedStyle.Avatar:
        return <FeedAvatar medias={medias} />
      case FeedStyle.Cover:
        return <FeedCover medias={medias} />
      case FeedStyle.ClassicOnePortrait:
      case FeedStyle.ClassicOneSquare:
      case FeedStyle.ClassicOneLandscape:
      case FeedStyle.ClassTwoPortrait:
      case FeedStyle.ClassTwoLandscape:
        return (
          <FeedClassic
            onRemoveMedia={onRemoveMedia}
            addOrUpdate={addOrUpdate}
            feedStyle={feedStyle}
            medias={medias} />
        )
    }
  }

  return (
    <div
      className={styles.feedMedias}>
      {MediasLayout()}
      {(addOrUpdate && medias?.length! > 0) &&
        <div className={styles.onFeedMedias}>
          <FilledButton
            className={styles.addMediasButton}
            text="Add medias"
            onClick={onAddMediasClick}
            leftIc={<IcEditFeedMedias />}
          />
          <FilledButton
            onClick={onEditMediaClick}
            className={styles.editButton}
            text="Edit"
            leftIc={<IcEditFeedMedias />}
          />
        </div>}
    </div>
  );
};

export default FeedMedias;