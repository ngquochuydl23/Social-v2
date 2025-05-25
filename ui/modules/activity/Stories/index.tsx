import { Grid, Skeleton } from "@mui/material";
import ActivityHeader from "../components/ActivityHeader";
import ActivityLayout from "../components/ActivityLayout";
import styles from "./stories.module.scss";
import { IcPlayPreviewStory } from "@assets/icons";
import { useEffect, useState } from "react";
import { getAllStoryInArchive } from "services/StoryService";
import _ from "lodash";
import { Story } from "services/StoryService/dtos";
import moment from "moment";

const Stories = () => {
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState<Story[]>();

  useEffect(() => {
    setLoading(true);

    getAllStoryInArchive()
      .then((res) => setStories(res.result))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getUrlForImgTag = (story: Story) => {
    return Boolean(story.thumbnail) ? story.thumbnail!! : story.mediaUrl!!
  }

  const StorySkeleton = () => {
    return (
      <div className={styles.skeleton}>
        <Skeleton
          sx={{ bgcolor: 'var(--SkeletonColor)' }}
          variant="rectangular"
          width="100%"
          animation="pulse"
          height="100%" />
      </div>
    )
  }

  return (
    <ActivityLayout>
      <ActivityHeader
        title="Stories"
        subtitle="View your Stories Archive" />
      {!loading ? (
        <Grid
          style={{ marginTop: 10 }}
          spacing={2}
          container>
          {_.map(stories, (story) => (
            <Grid item xs={2}>
              <div className={styles.story}>
                <img
                  className={styles.imgBg}
                  src={getUrlForImgTag(story)}
                  alt=""
                />
                <div className={styles.onBg}>
                  <img
                    src={getUrlForImgTag(story)}
                    alt=""
                  />
                </div>
                <div className={styles.transBg}>
                  <div className={styles.date}>
                    <strong>{moment(story.createAt).day()}</strong>
                    <p>{moment(story.createAt).format("MMM")}</p>
                  </div>
                  <div className={styles.views}>
                    <div className={styles.icon_play}>
                      <IcPlayPreviewStory />
                    </div>
                    <span>{story.viewerCount}</span>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
          style={{ marginTop: 10 }}
          spacing={2}
          container>
          <Grid item xs={2}>
            <StorySkeleton />
          </Grid>
          <Grid item xs={2}>
            <StorySkeleton />
          </Grid>
          <Grid item xs={2}>
            <StorySkeleton />
          </Grid>
        </Grid>
      )}
    </ActivityLayout>
  );
};

export default Stories;
