import { LoadingMore } from '@assets/lotties';
import styles from './listLoadingMore.module.scss'
import Lottie from "lottie-react";

const ListLoadingMore = ({ className }: { className?: string; }) => {
  return (
    <div className={styles.listLoadingMore}>
      <div className={styles.lottieLoading}>
        <Lottie
          animationData={LoadingMore}
          loop={true} />
      </div>
    </div>
  )
}

export default ListLoadingMore;