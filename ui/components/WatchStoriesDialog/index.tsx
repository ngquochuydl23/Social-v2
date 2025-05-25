import { DialogProps } from "@components/Dialogs/BaseDialog";
import { Dialog } from "@mui/material";
import React, { createRef, useEffect, useRef, useState } from "react";
import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
  useDragToScroll,
} from 'react-snaplist-carousel';
import StoryInDayView from "./StoryInDayView";
import { StoryInDayDto } from "services/StoryService/dtos";
import styles from './watchStoriesDialog.module.scss'
import _ from "lodash";
import { useRouter } from "next/router";
import IconWithFrame from "@components/IconWithFrame";
import { IcClose } from "@assets/icons";


interface WatchStoriesDialogProps extends DialogProps {
  storiesInDay?: StoryInDayDto[];
}

const WatchStoriesDialog: React.FC<WatchStoriesDialogProps> = ({ open, onClose, storiesInDay }) => {

  const router = useRouter();
  const snapList = useRef(null);
  const goToSnapItem = useScroll({ ref: snapList });

  const [currentIdx, setCurrentIdx] = useState<number>(0);

  useEffect(() => {
    const creatorId = router.query.creatorId;
    if (open && Boolean(creatorId) && Boolean(storiesInDay)) {
      let index = storiesInDay?.findIndex(x => x.creator?.id == creatorId) || 0;
      setCurrentIdx(index);
    }
  }, [router.query.creatorId, open, storiesInDay])

  useEffect(() => {
    goToSnapItem(currentIdx, { animationEnabled: false });
  }, [currentIdx])

  if (!storiesInDay)
    return null;

  const getMarginOfSnapItem = (idx: number) => {
    if (idx === 0)
      return { left: `calc(50% - (${432}px/2)`, right: '50px' }
    else if (idx === storiesInDay.length - 1)
      return { right: `calc(50% - (${432}px/2)` }
    return { right: '50px' }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }
      }}
      fullScreen
      style={{
        zIndex: 12000,
      }}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}>
      <div className={styles.storyInDays}>
        <SnapList
          className={styles.snapList}
          ref={snapList}
          tabIndex={0}
          role="region"
          direction="horizontal">
          {_.map(storiesInDay, (item: StoryInDayDto, index) => (
            <SnapItem
              margin={getMarginOfSnapItem(index)}
              snapAlign="center">
              <StoryInDayView
                onReview={(creatorId) => {
                  const next = storiesInDay
                    .findIndex(x => x.creator?.id == creatorId);

                  goToSnapItem(next);
                  setCurrentIdx(next);
                  router.push(`?watchStoryDialog=true&creatorId=${creatorId}`, undefined, { shallow: true })
                }}
                focused={index === currentIdx}
                storyInDay={item}
                onEnd={() => {
                  setCurrentIdx(currentIdx + 1);
                  goToSnapItem(currentIdx + 1, { animationEnabled: true });
                }} />
            </SnapItem>
          ))}
        </SnapList>
        <div className={styles.header}>
          <IconWithFrame
            onClick={onClose}
            className={styles.icFrame}>
            <IcClose height={20} width={20} />
          </IconWithFrame>
        </div>
      </div>
    </Dialog>
  )
}

export default WatchStoriesDialog;