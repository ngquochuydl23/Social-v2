import { useIntl } from 'react-intl';
import styles from './settingHeader.module.scss';

interface SettingHeaderProps {
  title: string;
  subtitle: string;
}

const SettingHeader: React.FC<SettingHeaderProps> = ({
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

export default SettingHeader;