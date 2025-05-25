import SideMenuLayout from "@layouts/SideMenuLayout";
import settingRoutes from "../../settingRoutes";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from './settingLayout.module.scss';
import Stack from '@mui/joy/Stack';
import classNames from "classnames";
import _ from "lodash";
import { useIntl } from "react-intl";

const SettingLayout = ({ children }: { children: any }) => {
  const router = useRouter();
  const intl = useIntl();
  const SettingSidebar = () => {
    return (
      <div className={styles.sidebar}>
        <h1 className={styles.pageTitle}>{intl.formatMessage({ id: "Settings" })}</h1>
        <div className={styles.searchBox}>

        </div>
        <Stack spacing="10px">
          {_.map(settingRoutes, (route: any) => {
            const active = route.path === router.pathname;
            return (
              <Link
                href={route.path}
                className={classNames(styles.sideItem, active && styles.active)}>
                <div className={styles.sideItemWrap}>
                  {active
                    ? <route.activeIcon
                      width={24}
                      height={24} />
                    : <route.inactiveIcon
                      width={24}
                      height={24} />}
                  <span className={styles.text}>{intl.formatMessage({ id: route.title })}</span>
                </div>
              </Link>
            )
          })}
        </Stack>
      </div>
    )
  }

  return (
    <SideMenuLayout
      leftSideBar={<SettingSidebar />}>
      {children}
    </SideMenuLayout>
  )
}

export default SettingLayout;