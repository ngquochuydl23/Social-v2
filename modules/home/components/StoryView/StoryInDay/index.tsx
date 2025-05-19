import { AvatarWithStory } from "@components/Avatar";
import Image from "next/image";
import { Story, StoryInDayDto } from "services/StoryService/dtos";
import styles from './storyInDay.module.scss'
import { useRouter } from "next/router";

const StoryInDay = ({ storyInDay }: { storyInDay: StoryInDayDto }) => {
  const router = useRouter();
  return (
    <div
      className={styles.storyItem}
      onClick={() => router.push(`?watchStoryDialog=true&creatorId=${storyInDay.creator?.id}`, undefined, { shallow: true })}>
      <img
        width={77}
        height={140}
        alt="story-thumbnai"
        src={storyInDay.lastThumbnail!!} />
      <div className={styles.onImage}>
        <div className={styles.wrapper}>
          <AvatarWithStory
            url={storyInDay.creator?.avatar}
            avatarStoryCN={styles.avatar}
            hasUnViewStories
            fullName={storyInDay.creator?.fullName} />
          <p className={styles.userName}>
            {storyInDay.creator?.fullName}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StoryInDay;