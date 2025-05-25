import { useIntl } from "react-intl";
import { useEffect, useState } from 'react';
import HomeLayout from '@layouts/HomeLayout';
import { getStoriesInDay } from 'services/StoryService';
import StoryView from './components/StoryView';
import { Story, StoryInDayDto } from 'services/StoryService/dtos';
import RightSideBar from './components/RightSideBar';
import CreateFeed from '@components/CreateFeed';
import FeedLists from '@components/Feeds';
import { useSession } from 'context/SessionHook';
import { FeedDto } from "services/FeedService/dtos";
import { getAllFeed } from "services/FeedService";
import CreateStoryDialog from "./components/CreateStoryDialog";
import { useRouter } from "next/router";
import { usePathname } from 'next/navigation';
import WatchStoriesDialog from "@components/WatchStoriesDialog";

export const HomePage = () => {
  const { session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState<Array<StoryInDayDto> | []>();
  const [feeds, setFeeds] = useState<Array<FeedDto> | []>();
  const intl = useIntl();

  useEffect(() => {
    setLoading(true);
    getStoriesInDay()
      .then(res => {
        setStories(res.result)
      })
      .catch(err => {

      })
      .finally(() => {
        setLoading(false);
      })

    getAllFeed()
      .then(res => {
        setFeeds(res.result)
      })
      .catch(err => {

      })
      .finally(() => {
      })
  }, [])

  return (
    <>
      <HomeLayout
        rightSideBar={<RightSideBar />}>

        <StoryView stories={stories as any} isLoading={loading} />
        <CreateFeed />
        <FeedLists feeds={feeds} loading={false} />

      </HomeLayout>
      <CreateStoryDialog
        open={
          Boolean(router.query.creatingStory)
          && router.query.creatingStory === "true"
        }
        onClose={() => {
          router.push(`/`, undefined, { shallow: true })
        }}
      />
      <WatchStoriesDialog
        storiesInDay={stories}
        onClose={() => {
          router.push(`/`, undefined, { shallow: true })
        }}
        open={
          Boolean(router.query.watchStoryDialog)
          && Boolean(router.query.creatorId)
          && router.query.watchStoryDialog === "true"
        }
      />
    </>
  )
}

export default HomePage;