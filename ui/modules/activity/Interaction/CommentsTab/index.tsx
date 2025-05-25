import classNames from "classnames";
import { AvatarWithStory, AvatarWithoutStory } from "@components/Avatar";
import { useSession } from "context/SessionHook";
import style from "./commentsTab.module.scss";
import React, { useEffect, useState } from "react";
import Timeline from "modules/activity/components/Timeline";
import { Checkbox, Stack } from "@mui/material";
import _ from "lodash";
import { IcDeleteInteraction, IcEditInteraction } from "@assets/icons";
import { CommentActivityDto, CommentTimelineDto } from "services/CommentService/dtos";
import { deleteComment, getCommentsInteraction } from "services/CommentService";
import { useTheme } from "next-themes";

export const CommentItem = ({
  feedComment,
  onRemoved,
}: {
  feedComment: CommentActivityDto;
  onRemoved: (id: number) => any;
}) => {
  const { session } = useSession();
  const [selected, setSelected] = useState(false);
  const { theme } = useTheme();

  const handleOnChange = () => {
    setSelected(!selected);
  };

  function handleDeleteComment() {
    deleteComment(feedComment.feed?.id!)
      .then(() => {
        onRemoved(feedComment.feed?.id!);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={style.commentItem}>
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
        url={feedComment.feed?.creator?.avatar!!}
        fullName={session?.user.fullname}
      />
      <div className={style.content}>
        <p className={style.title}>
          {session?.user.fullname}
          <span>commented</span>
          {feedComment.feed?.creator?.fullName}'s post
        </p>

        <p className={style.comment}>
          {feedComment.feed?.commentContent}
        </p>
      </div>
      {selected &&
        <div
          className={style.iconDelete}
          onClick={handleDeleteComment}>
          <IcDeleteInteraction />
        </div>
      }
    </div>
  );
};

const CommentList = () => {
  const [loading, setLoading] = useState(false);
  const [timelines, setTimelines] = useState<CommentTimelineDto[]>();

  useEffect(() => {
    setLoading(true);

    getCommentsInteraction()
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
          sx={{ paddingBottom: "10px" }}
        >
          {_.map(timelines, (timeline: CommentTimelineDto, index) => (
            <Timeline
              key={index}
              isEmpty={_.isEmpty(timeline.comments)}
              createAt={timeline.createAt}>
              <Stack
                spacing="10px"
                sx={{ paddingBottom: "10px" }}>
                {_.map(timeline.comments, (item) => (
                  <CommentItem
                    key={item.id}
                    feedComment={item}
                    onRemoved={(feedId) => {
                      timeline.comments = timeline.comments?.filter(
                        (comment) => comment.feed?.id !== feedId
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

export default CommentList;
