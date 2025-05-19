import FollowRequest from '@components/FollowRequest';
import MainFooter from '@components/MainFooter';
import Drawer from '@mui/material/Drawer';
import { Stack } from '@mui/system';
import _ from 'lodash';
import styles from './rightSideBar.module.scss'


const data = {
  requests: new Array<any>(2).fill({
    id: 1,
    username: "12.18_xox",
    fullName: "",
    avatar: "https://iili.io/HYit42I.md.jpg"
  })
}

const RightSideBar = () => {
  const { requests } = data;

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: 'flex',
        flex: 1,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          position: 'relative',
          boxSizing: 'border-box',
          left: "auto",
          display: 'flex',
          flex: 1,
          top: "auto",
          backgroundColor: 'var(--BgPrimaryColor)',
          borderRight: 0,
          boxShadow: '-1px 0px 0px 0px var(--SideBarShadow)',
        },
      }}>
      <div className={styles.rightSideBar}>
        {requests &&
          <div className={styles.requests}>
            <div className={styles.requestTitle}>
              <span>Requests</span>
            </div>
            <Stack spacing={0}>
              {_.map(requests, (item: any) => {
                return <FollowRequest key={item.id} {...item} />;
              })}
            </Stack>
          </div>}
        <MainFooter />
      </div>
    </Drawer>
  )
}

export default RightSideBar;