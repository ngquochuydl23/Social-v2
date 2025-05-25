import classNames from "classnames";
import { AvatarWithoutStory } from "@components/Avatar";
import { useSession } from "context/SessionHook";
import style from "./likesTab.module.scss";
import React, { useEffect, useState } from "react";
import Timeline from "../../components/Timeline";
import {
  FeedLikeTimelineDto,
  LikeActivityDto,
} from "services/LikeService/dtos";
import { Stack } from "@mui/material";
import { deleteLike, getLikes } from "services/LikeService";
import _ from "lodash";
import { IcDeleteInteraction } from "@assets/icons";
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from "next-themes";

export const LikeItem = ({
  feedLike,
  onRemoved,
}: {
  feedLike: LikeActivityDto;
  onRemoved: (id: number) => any;
}) => {
  const { theme } = useTheme();
  const { session } = useSession();
  const [selected, setSelected] = useState(false);

  const handleOnChange = () => {
    setSelected(!selected);
  };

  function handleDeleteLike() {
    deleteLike(feedLike.feed?.id)
      .then(() => {
        onRemoved(feedLike.feed?.id!!);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={style.likeItem}>
      <Checkbox
        id="check"
        onChange={handleOnChange}
        sx={{
          borderRadius: '10px',
          color: theme === 'light' ? '#d3d3d3' : "#696969",
          '&.Mui-checked': {
            color: 'var(--PrimaryColor)',
          },
        }} />
      <AvatarWithoutStory
        imageClassName={style.avatar}
        url={feedLike.feed?.creator?.avatar}
        fullName={session?.user.fullname}
      />
      <div className={style.content}>
        <p className={style.title}>
          {session?.user.fullname}
          <span>{`liked`}</span>
          {feedLike.feed?.creator?.fullName}{"'s post"}
        </p>
        <div className={style.description}>
          <span>{feedLike.feed?.description}</span>
        </div>
      </div>
      {selected &&
        <div
          className={classNames(style.iconDelete)}
          onClick={handleDeleteLike}>
          <IcDeleteInteraction />
        </div>
      }
    </div>
  );
};

const LikeList = () => {
  const [loading, setLoading] = useState(false);
  const [timelines, setTimelines] = useState<FeedLikeTimelineDto[]>();

  useEffect(() => {
    setLoading(true);

    getLikes()
      .then((res) => {
        setTimelines(res.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {!loading ? (
        <Stack
          style={{ marginTop: 10 }}
          spacing="10px"
          sx={{ paddingBottom: "10px" }}>
          {_.map(timelines, (timeline: FeedLikeTimelineDto, index) => (
            <Timeline
              key={index}
              isEmpty={!timeline.likes || _.isEmpty(timeline.likes)}
              createAt={timeline.createAt}>
              <Stack
                spacing="10px"
                sx={{ paddingBottom: "10px" }}>
                {_.map(timeline.likes, (item: LikeActivityDto) => (
                  <LikeItem
                    key={item.id}
                    feedLike={item}
                    onRemoved={(feedId) => {
                      timeline.likes = timeline.likes?.filter(
                        (like) => like.feed?.id !== feedId
                      );
                      setTimelines([...timelines!!, timeline]);
                    }}
                  />
                ))}
              </Stack>
            </Timeline>
          ))}
        </Stack>
      ) : null}
    </>
  );
};

export default LikeList;
