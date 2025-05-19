import styles from "./notificationView.module.scss";
import { useIntl } from "react-intl";
import EmptyNotifications from "./EmptyNotifications";
import classNames from "classnames";

interface NotificationViewProps {
  inDropDown: boolean;
}

const NotificationView: React.FC<NotificationViewProps> = ({ inDropDown }) => {
  const intl = useIntl();
  return (
    <div
      className={classNames(
        styles.notificationView,
        inDropDown && styles.inDropDown
      )}
    >
      <h3 className={styles.notificationTitle}>
        {intl.formatMessage({ id: "Notifications" })}
      </h3>
      {/* <NotificationDDItem /> */}
      <EmptyNotifications />
    </div>
  );
};

export default NotificationView;
