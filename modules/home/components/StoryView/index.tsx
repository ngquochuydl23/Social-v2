import React from 'react'
import _ from "lodash";
import { StoryInDayDto } from "services/StoryService/dtos";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import StoryInDay from "./StoryInDay";
import styles from './storyView.module.scss'
import { IcleftArrow, IcRightArrow } from "@assets/icons";
import ArrowButton from "./StoryArrowButton";
import StorySkeleton from './StorySkeleton';
import { isMobile } from 'react-device-detect';
import classNames from 'classnames';
import ScrollContainer from 'react-indiana-drag-scroll'
import { Stack } from '@mui/system';
import CreateStoryItem from './CreateStoryItem';

const LeftArrowButton = () => {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);
  return (
    <ArrowButton
      disable={isFirstItemVisible}
      className={styles.left}
      onClick={() => scrollPrev()}>
      <IcleftArrow />
    </ArrowButton>
  )
}

const RightArrowButton = () => {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  return (
    <ArrowButton
      disable={isLastItemVisible}
      className={styles.right}
      onClick={() => scrollNext()}>
      <IcRightArrow />
    </ArrowButton>
  )
}

interface StoryViewProps {
  stories?: StoryInDayDto[];
  isLoading: boolean;
}

const StoryView: React.FC<StoryViewProps> = ({
  stories = [], isLoading
}) => {
  return (
    <div className={classNames(
      styles.storyView,
      isMobile && styles.mobileLayout
    )}>
      {isLoading
        ? (<StorySkeleton />)
        : (isMobile
          ? <ScrollContainer
            className={styles.scrollLayout}
            nativeMobileScroll
            hideScrollbars
            horizontal>
            <Stack
              direction="row"
              sx={{
                overflow: 'visible'
              }}>
              <div>
                <CreateStoryItem />
              </div>
              {_.map(stories, (item: StoryInDayDto) =>
                <div>
                  <StoryInDay storyInDay={item} />
                </div>)}
            </Stack>

          </ScrollContainer>

          : <ScrollMenu
            LeftArrow={!isLoading && LeftArrowButton}
            RightArrow={!isLoading && RightArrowButton}
            wrapperClassName={styles.wrapper}
            scrollContainerClassName={styles.container}>
            {_.map([{} as StoryInDayDto, ...stories], (item: StoryInDayDto, index) => {
              if (index === 0) {
                return <CreateStoryItem />
              }
              return <StoryInDay storyInDay={item} />
            })}
          </ScrollMenu>
        )
      }
    </div >
  )
}

export default StoryView;