import Drawer from '@mui/material/Drawer';
import HomeSideBarItem from './HomeSideBarItem';
import {
  IcHomeActive,
  IcHomeInActive,
  IcReelsActive,
  IcReelsInActive
} from '@assets/icons';
import styles from './homeSideBar.module.scss';
import { useRouter } from "next/router";
import { PATH } from '@constants/path';
import _ from 'lodash';

const sideBarItems = [
  {
    text: "Home",
    path: PATH.home,
    inactiveIcon: IcHomeInActive,
    activeIcon: IcHomeActive
  },
  {
    text: "Reels",
    path: PATH.reels,
    inactiveIcon: IcReelsInActive,
    activeIcon: IcReelsActive
  }
]

const MainSideBar = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: 'flex',
        flex: 1,
        flexShrink: 0,
        backgroundColor: 'var(--BgPrimaryColor)',
        [`& .MuiDrawer-paper`]: {
          flex: 1,
          position: 'relative',
          display: 'flex',
          boxSizing: 'border-box',
          left: "auto",
          backgroundColor: 'var(--BgPrimaryColor)',
          top: "auto",
          flexGrow: 1,
          borderRight: 0,
          boxShadow: '1px 0 0px 0px var(--SideBarShadow)',
        },
      }}>
      <div className={styles.homeSideBar}>
        {_.map(sideBarItems, (sideBarItem: any, index) => (
          <HomeSideBarItem
            key={index}
            text={sideBarItem.text}
            href={sideBarItem.path}
            active={pathname === sideBarItem.path}
            inactiveIcon={<sideBarItem.inactiveIcon />}
            activeIcon={<sideBarItem.activeIcon />} />
        ))}
      </div>
    </Drawer>
  )
}

export default MainSideBar;