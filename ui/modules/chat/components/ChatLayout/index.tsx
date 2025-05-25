import SideMenuLayout from "@layouts/SideMenuLayout";
import { useRouter } from "next/router";
import styles from './chatLayout.module.scss';
import _ from "lodash";
import { useIntl } from "react-intl";
import RoomList from "../RoomList";

const ChatLayout = ({ children }: { children: any }) => {
  const router = useRouter();
  const intl = useIntl();

  return (
    <SideMenuLayout
      fullWidth
      leftClassName={styles.leftCN}
      childrenClassName={styles.childrenWrap}
      leftSideBar={<RoomList />}>
      {children}
    </SideMenuLayout>
  )
}

export default ChatLayout;