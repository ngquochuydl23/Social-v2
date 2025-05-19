import { ProtectedRoute } from 'components/Authentication'
import styles from './menuSideLayout.module.scss';
import HomeSideBar from '@components/HomeSideBar';
import { Badge } from '@mui/material';
import { isMobile } from 'react-device-detect';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import IconWithFrame from '@components/IconWithFrame';
import { useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { PATH } from '@constants/path';
import { useIntl } from 'react-intl';
import Link from 'next/link';
import classNames from 'classnames';
import MainLayout from '@layouts/MainLayout';
import { BaseLayoutProps } from '@layouts/BaseLayoutProps';

interface SideMenuLayoutProps extends BaseLayoutProps {
  rightSideBar?: React.ReactNode;
  leftSideBar?: React.ReactNode;
  childrenClassName?: string;
  leftClassName?: string;
}
const SideMenuLayout: React.FC<SideMenuLayoutProps> = ({
  children,
  rightSideBar,
  leftSideBar,
  childrenClassName,
  maxWidth,
  fullWidth,
  leftClassName
}) => {
  return (
    <ProtectedRoute>
      {isMobile ? (
        <div className={styles.homeMobileLayout}>
          {/* {showMobileHeader && <MobileHomeHeader />}
          <div className={classNames(styles.homeWrap, showMobileHeader && styles.showMobileHeader)}>
            {children}
          </div> */}
        </div>
      ) : (
        <div className={styles.menuSideLayout}>
          <MainLayout
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            className={styles.container}
            showMobileAppBar={false}>
            {leftSideBar &&
              <div className={classNames(styles.leftSide, leftClassName)}>
                {leftSideBar}
              </div>
            }
            <div className={classNames(styles.children, childrenClassName)}>
              {children}
            </div>
            {rightSideBar &&
              <div className={styles.rightSide}>
                {rightSideBar}
              </div>
            }
          </MainLayout>
        </div >
      )}
    </ProtectedRoute>
  )
}

export default SideMenuLayout; 