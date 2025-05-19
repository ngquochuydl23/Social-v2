import { Skeleton } from '@mui/material';
import styles from './likeSkelaton.module.scss';

const LikeSkelaton = () => {
  return (
    <div className={styles.skelaton}>
      <Skeleton
        variant="circular"
        sx={{ bgcolor: 'var(--SkeletonColor)' }}
        width={50}
        height={50} />
      <div className={styles.textLayout}>
        <Skeleton
          variant="text"
          sx={{
            fontSize: '14px',
            bgcolor: 'var(--SkeletonColor)'
          }}
          width={160} />
        <Skeleton
          variant="text"
          sx={{
            fontSize: '12px',
            bgcolor: 'var(--SkeletonColor)'
          }}
          width={80} />
      </div>
    </div>
  )
}

export default LikeSkelaton;