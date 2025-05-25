import React from "react";
import Header from "@components/Header";
import styles from './mainLayout.module.scss'
import BaseContainer from "@components/BaseContainer";
import { isMobile } from 'react-device-detect';
import MobileAppBar from "@components/MobileAppBar";
import classNames from "classnames";
import { BaseLayoutProps } from '@layouts/BaseLayoutProps';

interface MainLayoutProps extends BaseLayoutProps {
  mobileLabel?: string;
  className?: string;
  showMobileAppBar?: boolean;
  fullWidth?: boolean;
  headerDropShadow?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  showMobileAppBar = true,
  mobileLabel,
  fullWidth = false,
  headerDropShadow,
  maxWidth
}) => {
  return (
    <div className={styles.mainLayout}>
      {isMobile
        ? (showMobileAppBar && <MobileAppBar dropShadow={headerDropShadow} label={mobileLabel} />)
        : (<Header fullWidth={fullWidth} />)
      }
      <BaseContainer
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        className={classNames(
          className,
          isMobile && styles.mainMobileLayout
        )}>
        {children}
      </BaseContainer >
    </div >
  );
};

export default MainLayout;