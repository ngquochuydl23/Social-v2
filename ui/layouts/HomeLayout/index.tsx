import { ProtectedRoute } from 'components/Authentication'
import styles from './homeLayout.module.scss';
import HomeSideBar from '@components/HomeSideBar';
import { Badge } from '@mui/material';
import { isMobile } from 'react-device-detect';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import IconWithFrame from '@components/IconWithFrame';
import {
  IcChat,
  IcHomeActive,
  IcHomeInActive,
  IcNotification,
  IcNotificationInActive,
  IcNotificationActive,
  IcProfileActive,
  IcProfileInActive,
  IcReelsActive,
  IcReelsInActive
} from '@assets/icons';
import { useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { PATH } from '@constants/path';
import { useIntl } from 'react-intl';
import Link from 'next/link';
import classNames from 'classnames';
import MainLayout from '@layouts/MainLayout';
import { BaseLayoutProps } from '@layouts/BaseLayoutProps';

interface HomeLayoutProps extends BaseLayoutProps {
  rightSideBar?: React.ReactNode;
  showMobileHeader?: boolean;
}

const tabBottoms = [
  { label: "Home", icActive: IcHomeActive, icInActive: IcHomeInActive, path: PATH.home },
  { label: "Reels", icActive: IcReelsActive, icInActive: IcReelsInActive, path: PATH.reels },
  { label: "Notifications", icActive: IcNotificationActive, icInActive: IcNotificationInActive, path: PATH.Notifications },
  { label: "Profile", icActive: IcProfileActive, icInActive: IcProfileInActive, path: PATH.MoreTab },
]

const MobileHomeHeader = () => {
  const NavItem = ({ children, badgeContent }:
    { children: React.ReactElement, badgeContent: number | null }) => {
    return (
      <Badge
        className={styles.badgeItem}
        badgeContent={badgeContent}
        overlap="circular">
        <IconWithFrame className={styles.icFrame}>
          {children}
        </IconWithFrame>
      </Badge>
    )
  }
  return (
    <AppBar
      sx={{
        zIndex: 9000,
        backgroundColor: 'var(--BgPrimaryColor)'
      }}>
      <div className={styles.mobileHeader}>
        <div className={styles.logo}>
          {/* place something here */}
          <Link href={PATH.home}>
            SOCIAL-V2
          </Link>
        </div>
        <NavItem badgeContent={6}>
          <IcNotification width={22} height={22} />
        </NavItem>
        <NavItem badgeContent={12}>
          <IcChat width={22} height={22} />
        </NavItem>
      </div>
    </AppBar>
  )
}

const MobileBottomNavigation = () => {
  const intl = useIntl();
  const router = useRouter();
  const [select, setSelect] =
    useState(tabBottoms.find(x => x.path === router.pathname)?.label);
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
      elevation={3}>
      <BottomNavigation
        sx={{
          [`&.MuiBottomNavigation-root`]: {
            backgroundColor: 'var(--BgPrimaryColor)',
          }
        }}
        showLabels
        value={select}
        onChange={(event, newValue) => setSelect(newValue)}>
        {_.map(tabBottoms, (item: any, index) => {
          return (
            <BottomNavigationAction
              sx={{
                backgroundColor: 'var(--BgPrimaryColor)',
              }}
              onClick={() => router.push(item.path)}
              label={
                <span className={classNames(
                  styles.labelBotNavItem,
                  select === item.label && styles.isActive
                )}>
                  {intl.formatMessage({ id: item.label })}
                </span>
              }
              value={item.label}
              icon={select === item.label
                ? <item.icActive width={24} height={24} />
                : <item.icInActive width={24} height={24} />
              } />)
        })}
      </BottomNavigation>
    </Paper>
  )
}

const HomeLayout: React.FC<HomeLayoutProps> = ({
  children, rightSideBar, showMobileHeader = true
}) => {
  return (
    <ProtectedRoute>
      {isMobile ? (
        <div className={styles.homeMobileLayout}>
          {showMobileHeader && <MobileHomeHeader />}
          <div className={classNames(styles.homeWrap, showMobileHeader && styles.showMobileHeader)}>
            {children}
          </div>
          <MobileBottomNavigation />
        </div>
      ) : (
        <div className={styles.homeLayout}> 
          <MainLayout
            className={styles.container}
            showMobileAppBar={false}>
            <div className={styles.wrapContain}>
              <div className={styles.leftComponentWrap}>
                <HomeSideBar />
              </div>
              <div className={styles.wrapChildren}>
                {children}
              </div>
              <div className={styles.rightComponentWrap}>
                {rightSideBar}
              </div>
            </div>
          </MainLayout>
        </div >
      )}
    </ProtectedRoute >
  )
}

export default HomeLayout; 