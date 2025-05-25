
import { Skeleton, Stack } from '@mui/material'
import styles from './storySkeleton.module.scss'


const StorySkeletonItem = () => {
  return (
    <div className={styles.storySkeletonItem}>
      <Skeleton
        sx={{ bgcolor: 'var(--SkeletonColor)' }}
        variant="rectangular"
        width="100%"
        animation="wave"
        height="100%" />
    </div>
  )
}

const StorySkeleton = () => {
  return (
    <div className={styles.storySkeleton}>
      <Stack direction="row">
        <StorySkeletonItem />
        <StorySkeletonItem />
        <StorySkeletonItem />
        <StorySkeletonItem />
        <StorySkeletonItem />
        <StorySkeletonItem />
        <StorySkeletonItem />
      </Stack>
    </div>
  )
}

export default StorySkeleton;