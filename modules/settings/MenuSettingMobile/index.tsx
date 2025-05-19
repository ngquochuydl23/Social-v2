import MainLayout from "@layouts/MainLayout";
import { Stack } from "@mui/material";
import _ from "lodash";
import settingRoutes from "../settingRoutes";
import classNames from "classnames";
import Link from "next/link";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import styles from './menuSettingMobile.module.scss';
import { IcRightArrowCommon } from "@assets/icons";


const MenuSettingMobile = () => {
  const router = useRouter();
  const intl = useIntl();
  return (
    <MainLayout headerDropShadow>
      <div className={styles.menuSettings}>
        <h1 className={styles.title}>{intl.formatMessage({ id: "Settings" })}</h1>
        <Stack spacing="10px" sx={{ marginTop: '20px' }}>
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
                  <span className={styles.arrow}><IcRightArrowCommon width="15" height="15" /></span>
                </div>
              </Link>
            )
          })}
        </Stack>
      </div>
    </MainLayout>
  )
}

export default MenuSettingMobile;