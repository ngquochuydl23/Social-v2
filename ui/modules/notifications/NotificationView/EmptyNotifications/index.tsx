import styles from './emptyNotifications.module.scss'
import { useIntl } from 'react-intl';

const EmptyNotifications = () => {
  const intl = useIntl();
  return (
    <div className={styles.emptyNotifications}>
      <p className={styles.title}>
        {intl.formatMessage({ id: "All activities" })}
      </p>
      <p className={styles.subtitle}>
        {intl.formatMessage({ id: "All activities about your account will appear here" })}
      </p>
    </div>
  )
}

export default EmptyNotifications;