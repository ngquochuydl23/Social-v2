import { StoryInDayDto } from 'services/StoryService/dtos';
import styles from './storyInDayView.module.scss'
import Stories from 'react-insta-stories';
import { getMimeType } from 'utils/mediaType';
import { useState } from 'react';
import { AvatarWithStory } from '@components/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

interface StoryInDayView {
  storyInDay?: StoryInDayDto;
  focused: boolean;
  onEnd: () => any;
  onReview: (creatorId?: number) => any;
}

const StoryInDayView: React.FC<StoryInDayView> = ({
  storyInDay, focused, onEnd, onReview
}) => {

  const [ended, setEnded] = useState(false);
  const [lastSeenPos, setLastSeenPos] = useState(0);

  console.log();
  const getUnfocusThumbnail = () => {
    const stories = storyInDay?.stories
    if (!stories)
      return undefined;

    if (lastSeenPos === 0 || lastSeenPos >= stories?.length)
      return storyInDay.lastThumbnail;
    if (Boolean(stories[lastSeenPos].thumbnail))
      return stories[lastSeenPos].thumbnail

    return stories[lastSeenPos].mediaUrl || undefined;
  }

  return (
    <div className={styles.storyInDayView}>
      {!focused
        ?
        <div
          className={styles.lastThumbnail}
          onClick={() => {
            onReview(storyInDay?.creator?.id);
          }}>
          <img
            className={styles.blurImage}
            src={storyInDay?.lastThumbnail} />
          <img
            className={styles.thumbnail}
            src={getUnfocusThumbnail()} />
          <div className={styles.onThumbnail}>
            <div className={styles.avatarContain}>
              <AvatarWithStory
                avatarStoryCN={styles.overwriteAvatar}
                hasUnViewStories={true}
                fullName={storyInDay?.creator?.fullName}
                url={storyInDay?.creator?.avatar}
              />
            </div>
          </div>
        </div>
        :
        <Stories
          currentIndex={lastSeenPos}
          storyStyles={{
            overflow: 'hidden',
            width: "calc(90vh * 9 / 16)",
            aspectRatio: '6/19',
            objectFit: 'contain',
            margin: 0
          }}
          storyContainerStyles={{
            width: '100%',
            borderRadius: '20px'
          }}
          progressContainerStyles={{
            // marginTop: '10px'
          }}
          storyInnerContainerStyles={{
            width: '100%',
            borderRadius: '20px',
          }}
          onStoryEnd={() => {
            if (lastSeenPos + 1 < storyInDay?.stories?.length!!) {
              setLastSeenPos(lastSeenPos + 1);
            }
          }}
          onAllStoriesEnd={() => {
            onEnd();
            setEnded(true);
          }}
          onNext={() => {
            if (lastSeenPos + 1 < storyInDay?.stories?.length!!)
              setLastSeenPos(lastSeenPos + 1);
          }}
          onPrevious={() => {
            if (lastSeenPos - 1 >= 0) {
              setLastSeenPos(lastSeenPos - 1);
            }
          }}
          loader={
            <CircularProgress
              sx={{ color: '#fff' }} />
          }
          stories={storyInDay?.stories?.map((item) => {
            return {
              url: item.mediaUrl,
              type: getMimeType(item.mediaType!!),
              header: {
                heading: storyInDay.creator?.fullName,
                subheading: 'Posted 30m ago',
                profileImage: storyInDay.creator?.avatar,
              },
              styles: {
                width: "calc(90vh * 9 / 16)",
                maxWidth: '100%',
                maxHeight: '100%',
                backgroundColor: 'red'
              },
            }
          }) as any}
          defaultInterval={3000}
          width="calc(90vh * 9 / 16)"
          height="90vh"
        />
      }

    </div >
  )
}

export default StoryInDayView;