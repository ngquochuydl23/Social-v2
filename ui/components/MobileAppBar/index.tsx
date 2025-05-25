import styles from './mobileAppBar.module.scss'
import AppBar from '@mui/material/AppBar';
import { useRouter } from "next/router";
import { IcMobileBackDark } from '@assets/icons';


interface MobileAppBarProps {
  onNavClick?: () => any;
  label?: string;
  dropShadow?: boolean;
  children?: React.ReactElement;
}

const MobileAppBar: React.FC<MobileAppBarProps> = ({
  onNavClick, label, children, dropShadow = false
}) => {
  const router = useRouter();
  const buttonNavClick = () => {
    if (onNavClick) {
      onNavClick();
      return;
    }
    router.back();
  }
  return (
    <AppBar
      sx={{
        zIndex: 9000,
        boxShadow: dropShadow ? 'none' : '0 4px 2px -2px #d3d3d3',
        backgroundColor: 'var(--BgPrimaryColor)',
      }}>
      <div className={styles.mobileAppBar}>
        <div
          className={styles.navButton}
          onClick={buttonNavClick}>
          <IcMobileBackDark
            height={30}
            width={20} />
        </div>
        <div className={styles.navCenter}>
          {children || <p className={styles.label}>{label || ""}</p>}
        </div>
      </div>
    </AppBar>
  )
}

export default MobileAppBar;