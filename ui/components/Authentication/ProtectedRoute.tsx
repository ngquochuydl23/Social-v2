import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PATH } from "@constants/path";
import { useSession } from "context/SessionHook";
import { getFcmToken, onReceiveMessage } from "@components/setupFirebase/messaging";
import NotiToast from "@components/NotiToast";
import { getAccessToken } from "services/https";
import { getCurrentSession } from "services/SessionService";
import { PERMISSION_GRANTED } from "@constants/permissions";
import localforage from "localforage";
import { setUpNofication } from "services/DeviceService";
import { Dialog } from "@mui/material";
import WatchStoriesDialog from "@components/WatchStoriesDialog";
import FindFriendsDialog from "@components/FindFriendsDialog";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { session, setSession, clearSession } = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const setupNoti = async () => {
      const permission = await Notification.requestPermission()
      if (!permission || permission !== PERMISSION_GRANTED) {
        return;
      }
      const fcmTokenInLocal = await localforage.getItem('fcm_token')
      if (fcmTokenInLocal === null) {

        const fcm_token = await getFcmToken()
        if (!fcm_token)
          return;
        setUpNofication({ fcmToken: fcm_token })
          .then((res) => { console.log(res.result) })
          .catch((err) => { console.log(err) })
      }
    }

    setupNoti()
      .catch((err) => console.log("[FCM TOKEN]: " + err))

    if (!getAccessToken()) {
      router.push(`${PATH.Login}?redirect=${encodeURIComponent(router.asPath)}`);
    }
    onReceiveMessage(function (payload) {
      setOpen(true);
    })
  }, []);

  useEffect(() => {
    getCurrentSession()
      .then((res) => {
        setSession(res.result)
      })
      .catch((err) => {
        clearSession();
        router.push(PATH.Login)
      })
  }, []);

  return (
    <>
      {session && children}
      <FindFriendsDialog
        open={Boolean(router.query.findFriends) && router.query.findFriends === "true"}
        onClose={() => { router.push(`/`, undefined, { shallow: true }) }}
      />

      <NotiToast.RequestFollow
        open={open}
        onClose={() => setOpen(false)} />
    </>
  );
}
export default ProtectedRoute;

