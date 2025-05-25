import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import styles from './reelController.module.scss'

const ReelController = () => {
  return (
    <div className={classNames(
      styles.reelController,
      isMobile && styles.isMobile
    )}>
      <div>

      </div>
    </div>
  )
}

export default ReelController;