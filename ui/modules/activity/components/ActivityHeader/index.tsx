import { useIntl } from 'react-intl';
import styles from './activityHeader.module.scss';

interface ActivityHeaderProps {
  title: string;
  subtitle: string;
}

const ActivityHeader: React.FC<ActivityHeaderProps> = ({
  title, subtitle
}) => {
  const intl = useIntl();
  return (
    <div>
      <h1 className={styles.title}>
        {intl.formatMessage({ id: title })}
      </h1>
      <p className={styles.subtitle}>{intl.formatMessage({ id: subtitle })}</p>
    </div>
  )
}

export default ActivityHeader;