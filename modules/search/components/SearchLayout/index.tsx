import SideMenuLayout from "@layouts/SideMenuLayout";
import _ from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from './settingLayout.module.scss';
import Stack from '@mui/joy/Stack';
import classNames from "classnames";
import settingRoutes from "modules/settings/settingRoutes";

const SearchLayout = ({ children }: { children: any }) => {
  const router = useRouter();

  const SettingSidebar = () => {
    return (
      <div className={styles.sidebar}>
        <Stack spacing="10px" marginTop="20px">
          {_.map(settingRoutes, (route: any) => {
            const active = route.path === router.pathname;
            return (
              <Link
                href={route.path}
                className={classNames(styles.sideItem, active && styles.active)}>
                <div className={styles.sideItemWrap}>
                  {active
                    ? <route.activeIcon
                      width={22}
                      height={22} />
                    : <route.inactiveIcon
                      width={22}
                      height={22} />}
                  <span className={styles.text}>{route.title}</span>
                </div>
              </Link>
            )
          })}
        </Stack>
      </div>
    )
  }

  const SearchingFilter = () => {
    return (
      <div>
        SearchingFilter
      </div>
    )
  }

  return (
    <SideMenuLayout
      leftSideBar={<SettingSidebar />}
      rightSideBar={<SearchingFilter />}>
      {children}
    </SideMenuLayout >
  )
}

export default SearchLayout;