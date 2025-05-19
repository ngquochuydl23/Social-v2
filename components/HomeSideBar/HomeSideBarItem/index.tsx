import classNames from 'classnames';
import styles from './homeSideBarItem.module.scss'
import { useIntl } from 'react-intl';
import Link from 'next/link';

interface HomeSideBarItemProps {
  activeIcon?: React.ReactElement;
  inactiveIcon?: React.ReactElement;
  text?: string;
  isGroup?: boolean;
  active?: boolean;
  href?: string;
}

const HomeSideBarItem: React.FC<HomeSideBarItemProps> = ({
  activeIcon, inactiveIcon, text, active = false, isGroup, href
}) => {
  const intl = useIntl();
  const SideBarIcon = () => {
    if (Boolean(activeIcon) && Boolean(inactiveIcon))
      return active ? activeIcon : inactiveIcon
    return null;
  }

  return (
    <Link href={href!} className={styles.containItem}>
      <div className={classNames(styles.sideBarItem, active && (styles.isActive))}>
        <div className={styles.icon}>
          {SideBarIcon()}
        </div>
        <p className={styles.sideBarText}>
          {intl.formatMessage({ id: text })}
        </p>
      </div>
    </Link>
  )
}

export default HomeSideBarItem;