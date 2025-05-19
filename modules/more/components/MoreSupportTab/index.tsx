import React, { useEffect, useState } from "react";
import AccountDDItem from "@components/DropDown/AccountDropDown/AccountDDItem";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { useTheme } from "next-themes";
import {
  IcDarkMode,
  IcHelp,
  IcLogOut,
  IcProfile,
  IcSetting,
} from "@assets/icons";
import { styled } from "@mui/material/styles";
import { useSession } from "context/SessionHook";
import { updateUiMode } from "services/ClientService";
import { PATH } from "@constants/path";
import { useRouter } from "next/router";
import styles from "./moreSupportTab.module.scss";

type Props = {};

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

const MoreSupportTab = (props: Props) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const session = useSession();

  const signOut = () => session.logout();
  return (
    <div className={styles.moreSupportTab}>
      <div className={styles.container}>
        <AccountDDItem
          text="Dark Mode"
          overrideMObilestyle={true}
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
          <IcDarkMode width={24} height={24} />
        </AccountDDItem>
        <div className={styles.line}></div>
        <AccountDDItem href={PATH.Settings} text="Settings">
          <IcSetting width={24} height={24} />
        </AccountDDItem>
        <div className={styles.line}></div>
        <AccountDDItem text="Helps">
          <IcHelp width={24} height={24} />
        </AccountDDItem>
        <div className={styles.line}></div>
        <AccountDDItem
          text="Sign Out"
          onClick={signOut}
          overrideMObilestyle={true}
        >
          <IcLogOut width={20} height={20} />
        </AccountDDItem>
      </div>
    </div>
  );
};

export default MoreSupportTab;
