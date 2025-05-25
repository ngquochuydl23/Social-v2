import DropDownMenu, { BaseDropDownMenuProps } from "../BaseDropDownMenu";
import React, { useEffect, useState } from "react";
import { PATH } from "@constants/path";
import AccountDDItem from "./AccountDDItem";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { useTheme } from "next-themes";
import {
  IcActivities,
  IcDarkMode,
  IcHelp,
  IcLogOut,
  IcProfile,
  IcSetting,
} from "@assets/icons";
import { useRouter } from "next/router";
import { useSession } from "context/SessionHook";
import { updateUiMode } from "services/ClientService";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  zIndex: 10,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "var(--SwitchDarkLight)",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const AccountDropDown = (props: BaseDropDownMenuProps) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const session = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const signOut = () => session.logout();

  return (
    <DropDownMenu {...props}>
      <AccountDDItem text="Profile" href={PATH.MyProfile}>
        <IcProfile width={20} height={20} />
      </AccountDDItem>
      <AccountDDItem href={PATH.YourActivitiy} text="Your Activitiy">
        <IcActivities width={20} height={20} />
      </AccountDDItem>
      <AccountDDItem href={PATH.Settings} text="Settings">
        <IcSetting width={20} height={20} />
      </AccountDDItem>
      <AccountDDItem
        text="Dark Mode"
        rightComponent={
          <IOSSwitch
            checked={theme == "dark"}
            onChange={() => {
              updateUiMode(theme !== "dark")
                .then()
                .catch((err) => console.log(err));
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          />
        }
      >
        <IcDarkMode width={20} height={20} />
      </AccountDDItem>
      <AccountDDItem text="Helps">
        <IcHelp width={20} height={20} />
      </AccountDDItem>
      <AccountDDItem text="Sign Out" onClick={signOut}>
        <IcLogOut width={20} height={20} />
      </AccountDDItem>
    </DropDownMenu>
  );
};

export default AccountDropDown;
