import styles from './settingField.module.scss'
import { useIntl } from 'react-intl';

interface SettingFieldProps {
  children?: React.ReactNode;
  title: string;
  subtitle: string;
  enableRightButton?: boolean;
  buttonType?: "add" | "edit";
  onRightButtonClick?: () => any;
}

const SettingField: React.FC<SettingFieldProps> = ({
  children,
  title,
  subtitle,
  buttonType = "add",
  enableRightButton = false,
  onRightButtonClick,
}) => {
  const intl = useIntl();
  return (
    <div className={styles.settingField}>
      <div>
        <h3 className={styles.title}>
          {intl.formatMessage({ id: title})}
        </h3>
        {enableRightButton ?? (
          <div
            className={styles.addOrEditButton}
            onClick={onRightButtonClick}>
            {intl.formatMessage({ id: buttonType === "add" ? "Add" : "Edit" })}
          </div>
        )}
      </div>
      <span className={styles.subtitle}>
        {intl.formatMessage({ id: subtitle })}
      </span>
      <div className={styles.children}>
        {children}
      </div>
    </div>
  )
}

export default SettingField; 