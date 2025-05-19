import { PATH } from "@constants/path";
import MenuSettingMobile from "modules/settings/MenuSettingMobile";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isMobile } from "react-device-detect"

const Settings = () => {
  const router = useRouter();
  const { pathname } = useRouter();

  useEffect(() => {
    if (!isMobile) {
      router.push(PATH.ManageAccount);
    }
  }, [pathname])

  if (!isMobile)
    return null;
  return <MenuSettingMobile />
}

export default Settings